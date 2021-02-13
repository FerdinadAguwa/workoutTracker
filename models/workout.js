const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        trim: true,
        required: "Date is Required"
    },

    exercises: [
        {
            type: {
                type: String,
                trim: true,
                required: "String is Required"
            },
            name:{
                type: String,
                trim: true,
                required: "String is Required"
            },
            duration :{
                type: Number,
                trim: true,
                required: "Number is Required"
            },
            weight: {
                type: Number,
                trim: true,
                required: "String is Required"
            },
            reps: {
                type: Number,
                trim: true,
                required: "String is Required"
            },
            sets: {
                type: Number,
                trim: true,
                required: "String is Required"
            }, 
            distance: {
                type: Number,
                trim: true,
                required: "String is Required"
            }
        }
    ]
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;