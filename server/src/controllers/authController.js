import bcrypt from "bcrypt";
import pool from "../db/connection.js";

export const register = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await pool.query(
            `
            INSERT INTO users (name, email, password_hash)
            VALUES ($1, $2, $3)
            RETURNING *
            `,
            [name, email, hashedPassword]
        );

        res.status(201).json({
            message: "Carer registered successfully",
            user: newUser.rows[0]
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            message: "Server error"
        });

    }

};