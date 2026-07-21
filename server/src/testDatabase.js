import pool from "./db/connection.js";

const testConnection = async () => {
    try {
        const result = await pool.query("SELECT NOW()");
        console.log(result.rows);
    } catch (error) {
        console.log(error);
    }
};

testConnection();