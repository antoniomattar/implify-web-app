import { NextResponse, NextRequest } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const db = await pool.getConnection();
    // test if employees table exists if not create it and add data
    var query = `CREATE TABLE IF NOT EXISTS employees (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(255) NOT NULL,
        address VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`;
    await db.execute(query);
    db.release();
    query = "select * from employees";
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
    const query = "insert into employees (name, email, phone, address) values (?, ?, ?, ?)";
    const [result] = await db.execute(query, [
      employee.name,
      employee.email,
      employee.phone,
      employee.address,
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

