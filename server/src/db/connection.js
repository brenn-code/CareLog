import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "carelog",
    password: "Gritty@26",
    port: 5432,
});

export default pool;