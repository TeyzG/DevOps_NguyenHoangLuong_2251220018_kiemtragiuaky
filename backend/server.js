const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Kết nối Database
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: 'user',
    password: 'password',
    database: 'devops_db'
});

// 1. Endpoint /about
app.get('/about', (req, res) => {
    res.json({
        ho_ten: "Nguyễn Hoàng Lương",
        mssv: "2251220018",
        lop: "Kỹ thuật Phần mềm"
    });
});

// 2. Endpoint /health
app.get('/health', (req, res) => {
    res.status(200).json({ status: "Health đang hoạt động" });
});

// 3. API GET: Lấy danh sách task từ DB
app.get('/tasks', (req, res) => {
    db.query('SELECT * FROM tasks', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// 4. API POST: Thêm task mới
app.post('/tasks', (req, res) => {
    const { title } = req.body;
    db.query('INSERT INTO tasks (title) VALUES (?)', [title], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ id: result.insertId, title });
    });
});

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));