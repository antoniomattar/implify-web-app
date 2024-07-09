import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { Employee } from "@/lib/Employee";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id; // user id

  try {
    const db = await pool.getConnection();

    const query = "select * from employees where id = ?";
    const [rows] = await db.execute(query, [id]);
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

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id; // user id
  const employee = await request.json() as Employee;

  try {
    const db = await pool.getConnection();
    // check all non-null fields and update them
    let query = "update employees set ";
    let fields = [];
    let values = [];
    if (employee.fname) {
      fields.push("fname = ?");
      values.push(employee.fname);
    }
    if (employee.lname) {
      fields.push("lname = ?");
      values.push(employee.lname);
    }
    if (employee.address) {
      fields.push("address = ?");
      values.push(employee.address);
    }
    if (employee.city) {
      fields.push("city = ?");
      values.push(employee.city);
    }
    if (employee.company) {
      fields.push("company = ?");
      values.push(employee.company);
    }

    query += fields.join(", ") + " where id = ?";
    values.push(id);
    console.log(query, values);
    const [rows] = await db.execute(query, values);
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id; // user id

  try {
    const db = await pool.getConnection();
    const query = "delete from employees where id = ?";
    const [rows] = await db.execute(query, [id]);
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
