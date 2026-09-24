const express = require("express");
const router = express.Router();

let students = require("../data/students");

// GET /students
router.get("/", (req, res) => {
    res.status(200).json(students);
});


// GET /students/:id
router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const student = students.find(student => student.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.status(200).json(student);
});


// POST /students
router.post("/", (req, res) => {
    const { name, age, course, email } = req.body;

    if (!name || !age || !course || !email) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const newStudent = {
        id: students.length > 0
            ? students[students.length - 1].id + 1
            : 1,
        name: name,
        age: age,
        course: course,
        email: email
    };

    students.push(newStudent);

    res.status(201).json({
        message: "Student created successfully",
        student: newStudent
    });
});


// PUT /students/:id
router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const studentIndex = students.findIndex(
        student => student.id === id
    );

    if (studentIndex === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const { name, age, course, email } = req.body;

    if (!name || !age || !course || !email) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    students[studentIndex] = {
        id: id,
        name: name,
        age: age,
        course: course,
        email: email
    };

    res.status(200).json({
        message: "Student updated successfully",
        student: students[studentIndex]
    });
});


// DELETE /students/:id
router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const studentIndex = students.findIndex(
        student => student.id === id
    );

    if (studentIndex === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const deletedStudent = students.splice(studentIndex, 1);

    res.status(200).json({
        message: "Student deleted successfully",
        student: deletedStudent[0]
    });
});


module.exports = router;
