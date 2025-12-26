import pool from '../db.js'

export const getProject = async (_req, res) => {
    try {
        const result = await pool.query("SELECT id, project_title, subtitle, description, tech_stack, category FROM projects");

        if (result.rows.length === 0) {
            return res.status(404).json({message: "Projects is Empty"})
        }

        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getProjectId = async (req, res) => {
    try {
        const {id} = req.params;
        const result = await pool.query("SELECT id, project_title, subtitle, description, tech_stack, category FROM projects WHERE id = $1",
            [id]
        )

        if (result.rows.length === 0) {
            return res.status(404).json({message: `Project with id = ${id} Didn't Exists`})
        }

        res.status(200).json(result.rows[0])
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const createProject = async (req, res) => {
    try {
        const {title, subtitle, description, tech_stack, category} = req.body;
        const result = await pool.query("INSERT INTO projects (project_title, subtitle, description, tech_stack, category) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [title, subtitle, description, tech_stack, category]
        )

        if (result.rows.length === 0) {
            return res.status(404).json({message: "Failed to Create Project"})
        }

        res.status(201).json({
            message: "Project Created Successfully",
            data: result.rows[0]
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const updateProject = async (req, res) => {
    try {
        const {id} = req.params;
        const {title, subtitle, description, tech_stack, category} = req.body;
        const result = await pool.query("UPDATE projects SET project_title = $1, subtitle = $2, description = $3, tech_stack = $4, category = $5 WHERE id = $6 RETURNING *",
            [title, subtitle, description, tech_stack, category, id]
        )

        if (result.rows.length === 0) {
            return res.status(404).json({message: `Project with id = ${id} Didn't Exist`})
        }

        res.status(200).json({
            message: `Project with id = ${id} Updated Successfully`,
            data: result.rows[0]
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const deleteProject = async (req, res) => {
    try {
        const {id} = req.params;
        const result = await pool.query("DELETE FROM projects WHERE id = $1 RETURNING *",
            [id]
        )

        if (result.rows.length === 0) {
            return res.status(404).json({message: `Project with id = ${id} Didn't Exist`})
        }

        res.status(200).json({
            message: `Project with id = ${id} Deleted Successfully`,
            data: result.rows[0]
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}