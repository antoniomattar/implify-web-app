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
  const employee = (await request.json()) as Employee;

  try {
    const db = await pool.getConnection();
    // check all non-null fields and update them
    let query = "update employees set ";
    let fields = [];
    let values = [];

    // Iterate over employee object properties
    for (const [key, value] of Object.entries(employee)) {
      if (value) {
        // Check if the property value is truthy
        fields.push(`${key} = ?`); // Use the property key to generate the field placeholder
        values.push(value); // Add the property value to the values array
      }
    }

    query += fields.join(", ") + " where id = ?";
    values.push(id);
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
