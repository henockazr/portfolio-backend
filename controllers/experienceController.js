import pool from '../db.js'

export const getExperience = async (_req, res) => {
    try {
        const result = await pool.query("SELECT id, job_title, company, description, start_date, end_date FROM experiences");

        if (result.rows.length === 0) {
            return res.status(404).json({message: "Experiences is Empty"})
        }

        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getExperienceId = async (req, res) => {
    try {
        const {id} = req.params;
        const result = await pool.query("SELECT id, job_title, company, description, start_date, end_date FROM experiences WHERE id = $1",
            [id]
        )

        if (result.rows.length === 0) {
            return res.status(404).json({message: `Experience with id = ${id} Didn't Exist`})
        }

        res.status(200).json(result.rows[0])
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const createExperience = async (req, res) => {
    try {
        const {title, company, description, startDate, endDate} = req.body;
        const result = await pool.query("INSERT INTO experiences (job_title, company, description, start_date, end_date) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [title, company, description, startDate, endDate]
        )

        if (result.rows.length === 0) {
            return res.status(404).json({message: "Failed to Create Experience"})
        }

        res.status(201).json({
            message: "Experience Created Successfully",
            data: result.rows[0]
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const updateExperience = async (req, res) => {
    try {
        const {id} = req.params;
        const {title, company, description, startDate, endDate} = req.body;
        const result = await pool.query("UPDATE experiences SET job_title = $1, company = $2, description = $3, start_date = $4, end_date = $5 WHERE id = $6 RETURNING *",
            [title, company, description, startDate, endDate, id]
        )

        if (result.rows.length === 0) {
            return res.status(404).json({message: `Experience with id = ${id} Didn't Exist`})
        }

        res.status(200).json({
            message: `Experience with id = ${id} Updated Successfully`,
            data: result.rows[0]
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const deleteExperience = async (req, res) => {
    try {
        const {id} = req.params;
        const result = await pool.query("DELETE FROM experiences WHERE id = $1 RETURNING *",
            [id]
        )

        if (result.rows.length === 0) {
            return res.status(404).json({message: `Experience with id = ${id} Didn't Exist`})
        }

        res.status(200).json({
            message: `Experience with id = ${id} Deleted Successfully`,
            data: result.rows[0]
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}