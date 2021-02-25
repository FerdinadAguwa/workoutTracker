const express = require("express");
const mongoose = require("mongoose");
const mongojs = require("mongojs");
const path = require("path");
const PORT = process.env.PORT || 3000;
const db = require("./models");

const app = express();
  
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false
});

// routes
// app.use(require("./routes/api.js"));

// set up for each api page 

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
  });
  app.get("/stats", function(req, res) {
    res.sendFile(path.join(__dirname, "public/stats.html"));
  });
  app.get("/exercise", function(req, res) {
    res.sendFile(path.join(__dirname, "public/exercise.html"));
  });

// set up for the individual calls 

// call to find all the workouts and pull the last one
app.get("/api/workouts", function (req, res){
  db.Workout.find({}).then(function (data){
    console.log("workout", data)
    res.json(data)
  })
});

app.get("/api/workouts", (req, res)=>{
  console.log(req.body)
  db.Workout.aggregate([{
    $addFields: {
      totalDuration: {
        $sum: "$exercises.duration"
      }
    }
  }]).then(function (data) {
  
    res.json(data)
  })
});

// call to create the database in mongoose
app.post("/api/workouts", function (req, res){
  db.Workout.create({}).then(function (data){
    console.log(data)
    res.json(data)
  })
  .catch(function (error){
    res.json(error)
  })
});
// call for the new workouts
app.put("/api/workouts/:id", function (req, res){
  console.log(req.body);
  console.log(req.params.id);
  db.Workout.updateOne(
    {
      _id: mongojs.ObjectId(req.params.id)
    },
    { 
    $push: {
      exercises: req.body
    } 
  }).then(function (data){
    res.json(data)
  })
});

// call for the workout chart
app.get("/api/workouts/range", function (req, res){
  db.Workout.find({}).then(function (data){
    res.json(data)
  })
});



app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
