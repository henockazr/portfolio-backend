import pool from '../db.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        const checkUser = await pool.query("SELECT name, email FROM users WHERE email = $1",
            [email]
        )

        if (checkUser.rows.length === 1) {
            return res.status(404).json({message: `User with Email = ${email} Already Exists`})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const result = await pool.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING name, email",
            [name, email, hashedPassword]
        )

        res.status(201).json({
            message: "User Successfully Registered",
            data: result.rows[0]
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const checkUser = await pool.query("SELECT id, name, email, password FROM users WHERE email = $1",
            [email]
        )

        if (checkUser.rows.length === 0) {
            return res.status(404).json({message: "Incorrect Email/Password"})
        }

        const checkPassword = await bcrypt.compare(password, checkUser.rows[0].password);

        if (!checkPassword) {
            return res.status(404).json({message: "Incorrect Email/Password"})
        }

        const token = jwt.sign(
            {
                id: checkUser.rows[0].id,
                email: checkUser.rows[0].email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        )

        res.status(200).json({
            message: "Logged in Successfully",
            token: token
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}