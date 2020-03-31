import React, { useState } from 'react';
import ExercisePicker from './ExercisePicker';
import Workout from './Workout';
import './WorkoutForm.css';

const WorkoutForm = () => {

  const [ exercises, updateExercises ] = useState([]);

  // Add a new blank exercise
  const addExercise = (exercise) => {
    updateExercises([
      ...exercises, {
        exercise_id: exercises.length + 1,
        name: exercise.name,
        type: exercise.type,
        sets: []
      }
    ]);
  }

  // Deletes an exercise
  const deleteExercise = (exerciseID) => {
    const temp = [...exercises];
    for (let i = exerciseID ; i < temp.length ; i++) {
      temp[i-1] = temp[i];
      temp[i-1].exercise_id--;
    }
    updateExercises(temp.slice(0, -1));
  }

  // Deletes a set from a given exercise
  const deleteExerciseSet = (exerciseID, setID) => {
    const temp = [...exercises];
    const sets = exercises[exerciseID-1].sets;
    for (let i = setID ; i < sets.length ; i++) {
      sets[i-1] = sets[i];
      sets[i-1].set_id--;
    }
    temp[exerciseID-1].sets = sets.slice(0, -1);
    updateExercises(temp);
  }

  // Called by child component when the exercise has changed, updates the state
  const updateSingleExercise = (newExercise) => {
    const exercisesCopy = [...exercises];
    exercisesCopy[newExercise.exercise_id - 1] = newExercise;
    updateExercises(exercisesCopy);
  }

  // Field-list for allowed exercises. Incomplete - just for testing. 
  // Eventually I'll need to flesh this out and put it in the DB
  const exerciseList = [
    { name: "Squat", type: "weights", required: ["weight", "reps"], optional: ["rpe"]},
    { name: "Bench", type: "weights", required: ["weight", "reps"], optional: ["rpe"]},
    { name: "Row", type: "weights", required: ["weight", "reps"], optional: ["rpe"]},
    { name: "OHP", type: "weights", required: ["weight", "reps"], optional: ["rpe"]},
    { name: "DL", type: "weights", required: ["weight", "reps"], optional: ["rpe"]},
    { name: "Running", type: "cardio", required: ["time", "distance"], optional: ["avhr", "pace"]},
    { name: "Cycling", type: "cardio", required: ["time", "distance"], optional: ["avhr", "pace"]},
    { name: "Running (stationary)", type: "cardio", required: ["time"], optional: ["distance", "avhr", "pace"]},
    { name: "Cycling (stationary)", type: "cardio", required: ["time"], optional: ["distance", "avhr", "pace"]},
    { name: "Chin-ups", type: "bodyweight", required: ["reps"], optional: ["weight"]},
    { name: "Push-ups", type: "bodyweight", required: ["reps"], optional: ["weight"]}
  ];

  return (
    <div className='workout-form'>
      <ExercisePicker exercises={exerciseList} addExercise={addExercise}/>
      <Workout 
        exercises={exercises}
        updateSingleExercise={updateSingleExercise}
        deleteExercise={deleteExercise}
        deleteExerciseSet={deleteExerciseSet}
      />
      {/* For testing only */}
      <button type="button"
        onClick={ () => console.log(exercises) }
      >Print to Console</button>
      </div>
  );
}

export default WorkoutForm;