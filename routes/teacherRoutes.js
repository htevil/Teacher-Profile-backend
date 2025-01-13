// routes/teacherRoutes.js
const express = require('express');
const Teacher = require('../models/Teacher');
const router = express.Router();

// GET all teachers
router.get('/', (req, res) => {
  Teacher.getAll((err, teachers) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(teachers);
  });
});

// GET a teacher by ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  Teacher.getById(id, (err, teacher) => {
    if (err) return res.status(500).json({ message: err.message });
    if (!teacher) return res.status(404).json({ message: 'Teacher not found' });
    res.json(teacher);
  });
});

module.exports = router;