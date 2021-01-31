const express = require('express')
const mongoose = require('mongoose')
const tasksRoutes = require('./routes/tasks')

const app = express()
app.use(express.json())

app.use('/api/tasks', tasksRoutes)



// MAKE A CONNECTION LINK WITH MONGODB
mongoose.connect(
    'mongodb+srv://root:root@cluster0.g41mc.mongodb.net/tasks',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    },
).then(() => {
  app.listen(3000, () => { console.log('API running at: http://localhost:3000') })
}).catch((err) => {
  console.log(err)
});

