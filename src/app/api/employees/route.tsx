import { NextResponse, NextRequest } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const db = await pool.getConnection();
    const query = "select * from employees";
    const [rows] = await db.execute(query);
    db.release();

    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json(
      {
        error: error,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {

  const employee = await request.json();

  try {
    const db = await pool.getConnection();
    const query =
      "insert into employees (fname , lname , company , address , city , county , color) values (?, ?, ?, ?, ?, ?, ?)";
    const [result] = await db.execute(query, [
      employee.fname,
      employee.lname,
      employee.company,
      employee.address,
      employee.city,
      employee.county,
      employee.color,
    ]);
    db.release();

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        error: error,
      },
      { status: 500 }
    );
  }
}
