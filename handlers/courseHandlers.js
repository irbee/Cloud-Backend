const CoursesModel = require('../models/courses');


const getAllCourses = async (req, res) => {
  try {
    const allCourses = await CoursesModel.getAllCourses(); // Add await here
  
    if (!allCourses || allCourses.length === 0) {
      return res.status(404).json({
        status: 'fail',
        message: 'No courses found or course database is empty',
      });
    }

    // If the courses were successfully retrieved
    return res.status(200).json({
      status: 'success',
      data: {
        courses: allCourses,
      },
    });
  } catch (error) {
    console.error('Error retrieving courses:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve courses. An internal server error occurred.',
    });
  }
};


const createCourse = async (req, res) => {
  try {
    const { courseName, instructorId, schedule, description } = req.body;

    if (!courseName || !instructorId || !schedule || !description) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please provide all necessary course details',
      });
    }

    const newCourse = await CoursesModel.createCourse({
      courseName,
      instructorId,
      schedule,
      description,
    });

    return res.status(201).json({
      status: 'success',
      message: 'Course created successfully',
      data: {
        course: newCourse, // Include the newly created course in the response
      },
    });
  } catch (error) {
    console.error('Error creating course:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Failed to create course',
    });
  }
};

// Delete a course
const deleteCourse = (req, res) => {
    try {
      const { courseId } = req.params;
  
      const deletedCourse = CoursesModel.deleteCourse(courseId);
  
      if (!deletedCourse) {
        return res.status(404).json({
          status: 'fail',
          message: 'Course not found or could not be deleted',
        });
      }
  
      return res.status(200).json({
        status: 'success',
        message: 'Course deleted successfully',
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Failed to delete course',
      });
    }
  };

// Update a course
const updateCourse = (req, res) => {
    try {
      const { courseId } = req.params;
      const { courseName, instructorId, schedule, description } = req.body;
  
      const updatedCourse = CoursesModel.updateCourse(courseId, {
        courseName,
        instructorId,
        schedule,
        description,
      });
  
      if (!updatedCourse) {
        return res.status(404).json({
          status: 'fail',
          message: 'Course not found or could not be updated',
        });
      }
  
      return res.status(200).json({
        status: 'success',
        message: 'Course updated successfully',
        data: {
          course: updatedCourse,
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        message: 'Failed to update course',
      });
    }
  };

module.exports = {
  getAllCourses,
  createCourse,
  deleteCourse,
  updateCourse,
};
