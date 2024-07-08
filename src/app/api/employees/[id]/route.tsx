import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";


export async function GET(
    request:  NextRequest,
    { params }: { params: { id: string } }
) {
    const id = params.id // user id
    
    try {
        const db = await pool.getConnection()        
        
        const query = 'select * from employees where id = ?'
        const [rows] = await db.execute(query,[id])
        db.release()
        
        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json({
            error: error
        }, { status: 500 })
    }
}