// teacherHandlers.js

const Teachers = require('../models/teachers');

const getAllTeachers = async (req, res) => {
  try {
    const allTeachers = await Teachers.getAllTeachers();
    if (!allTeachers) {
      return res.status(404).json({ message: 'No teachers found' });
    }
    return res.status(200).json(allTeachers);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const addTeacher = async (req, res) => {
  try {
    const { name, dob, address, sex, maritalStatus, yearsofWork, courses, description } = req.body;
    const newTeacher = await Teachers.addTeacher({ name, dob, address, sex, maritalStatus, yearsofWork, courses, description });
    return res.status(201).json(newTeacher);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteTeacher = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const isDeleted = await Teachers.deleteTeacher(teacherId);
    if (isDeleted) {
      return res.status(200).json({ message: 'Teacher deleted successfully' });
    }
    return res.status(404).json({ message: 'Teacher not found' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateTeacher = async (req, res) => {
  try {
    const { teacherId } = req.params;
    const { name, dob, address, sex, maritalStatus, yearsofWork, courses, description } = req.body;
    const updatedTeacher = await Teachers.updateTeacher(teacherId, { name, dob, address, sex, maritalStatus, yearsofWork, courses, description });
    if (updatedTeacher) {
      return res.status(200).json(updatedTeacher);
    }
    return res.status(404).json({ message: 'Teacher not found' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllTeachers,
  addTeacher,
  deleteTeacher,
  updateTeacher,
};
