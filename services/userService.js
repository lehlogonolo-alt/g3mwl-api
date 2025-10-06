const { poolPromise } = require('../config/db');
const bcrypt = require('bcrypt');

async function createUser(email, password) {
    const hashed = await bcrypt.hash(password, 10);
    const pool = await poolPromise;

    try {
        await pool.request()
            .input('Email', email)
            .input('Password', hashed)
            .query(`
                INSERT INTO dbo.Users (Email, Password)
                VALUES (@Email, @Password)
            `);

        return { email };
    } catch (err) {
        // SQL Server error code 2627 = unique constraint violation
        if (err.number === 2627 || err.message.includes('UNIQUE')) {
            throw new Error('Email already exists');
        }
        throw err; // re-throw other errors
    }
}

async function findUserByEmail(email) {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('Email', email)
        .query(`SELECT * FROM dbo.Users WHERE Email = @Email`);

    return result.recordset[0] || null;
}

module.exports = { createUser, findUserByEmail };



