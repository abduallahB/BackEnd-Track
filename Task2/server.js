const express = require('express')
const mongoose = require('mongoose')
const CourseRoutes = require('./routes/RoutCourse')

const app = express()
app.use(express.json())

app.use('/api/tasks', CourseRoutes)



// MAKE A CONNECTION LINK WITH MONGODB
mongoose.connect(

    'mongodb+srv://root:root@cluster0.g41mc.mongodb.net/courses',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    },
).then(() => {
  app.listen(3000, () => { console.log('API running with : http://localhost:3000') })
}).catch((err) => {
  console.log(err)
})

