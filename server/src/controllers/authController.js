import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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
//login as a carer already registered

export const login = async (req, res) => {

    try {

        const { email, password } = req.body;


        // find user by email

        const user = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );


        // check if user exists

        if (user.rows.length === 0) {

            return res.status(400).json({
                message: "User not found"
            });

        }


        const foundUser = user.rows[0];


        // compare entered password with stored hash

        const passwordMatch = await bcrypt.compare(
            password,
            foundUser.password_hash
        );


        if (!passwordMatch) {

            return res.status(400).json({
                message: "Incorrect password"
            });

        }

        const token = jwt.sign(
            {
                id: foundUser.id,
                email: foundUser.email
            },
        "secretkey",
        {
            expiresIn: "1h"
        }
    );



        res.json({

            message: "Login successful",

            token: token,
            
            user: {
                id: foundUser.id,
                name: foundUser.name,
                email: foundUser.email
            }

        });


    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });

    }

};