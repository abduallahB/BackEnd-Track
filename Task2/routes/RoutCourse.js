const express = require('express')
const CourseController = require('../controllers/ContCourse')

// Router initialisation
const router = express.Router()

// CRUD
// Create 
router.post('/createCourse', CourseController.createCourse)

// Read 
router.get('/getCourse/:id', CourseController.getCourse)

// Update 
router.patch('/updateCourse/:id', CourseController.updateCourse)

// Delete 
router.delete('/deleteCourse/:id', CourseController.deleteCourse)

module.exports = router