const CourseSchema = require('../models/modeCourse')



const createCourse = (req, res) => {
  const task = new CourseSchema({
    CourseTitle: req.body.CourseTitle,
    Description: req.body.Description

  })

  task.save().then(() => {
    console.log('Course Created') // print in console
    res.status(200).json({message: 'Course Created'}) // send json to requester
  }).catch((err) => {
    res.status(500).json({message: err})
  })
}



const getCourse = (req, res) => {
  CourseSchema.find({_id: req.params.id}, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).json({message: err})
    } else {
      res.status(200).json(results)
    }
  })
}




const updateCourse = async (req, res) => {
  const courseUpdate = await CourseSchema.findOneAndUpdate({_id: req.params.id}, {
    $set: {
      CourseTitle: req.body.CourseTitle,
      Description: req.body.Description
    },
  }, {new: true})

  if (courseUpdate) {
    res.status(200).json({message: 'Successfully updated'})
  } else {
    res.status(500).json({message: 'Could not update'})
  }
}




const deleteCourse = async (req, res) => {
  const courseDelete = await CourseSchema.findByIdAndDelete({_id: req.params.id})
  if (courseDelete) {
    res.status(200).json({message: 'Successfully deleted'})
  } else {
    res.status(500).json({message: 'Could not delete'})
  }
}




module.exports = {createCourse, getCourse, updateCourse, deleteCourse}