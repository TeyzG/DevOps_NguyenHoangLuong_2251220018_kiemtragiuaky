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

app.get('/about', (req, res) => {
    res.json({
        ho_ten: "Nguyễn Hoàng Lương",
        mssv: "2251220018",
        lop: "Kỹ thuật Phần mềm"
    });
});

app.get('/health', (req, res) => {
    res.status(200).json({ status: "Health đang hoạt động" });
});

app.get('/tasks', (req, res) => {
    db.query('SELECT * FROM tasks', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

app.post('/tasks', (req, res) => {
    const { title } = req.body;
    db.query('INSERT INTO tasks (title) VALUES (?)', [title], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ id: result.insertId, title });
    });
});
app.get('/', (req, res) => {
    res.send("Backend đang chạy! Hãy thử /about hoặc /health");
});
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));