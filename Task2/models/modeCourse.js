const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({
  CourseTitle: {
    type: String,
    required: true
  },
  Description: {
    type: String,
    required: true
  }
  
})

module.exports = mongoose.model('Course', CourseSchema)