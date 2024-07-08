import mysql from "mysql2/promise";

const port = process.env.DB_PORT || "3306";
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_SCHEMA,
  port: parseInt(port),
  waitForConnections: true,
});

export default pool;
