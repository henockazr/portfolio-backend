import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({connectionString: process.env.DATABASE_URL})

pool.connect((error) => {
    if (error) {
        console.error(error)
    } else {
        console.log("Server connected successfully");
    }
})

export default pool;