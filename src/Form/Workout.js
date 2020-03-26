import React, { useState } from 'react';
import Exercise from './Exercise';

const Workout = ({ changeRoute }) => {

  const today = new Date().toISOString().substring(0, 10);
  // set the min value for the date picker to be 1 month ago
  let minDate = new Date();
  minDate.setMonth(minDate.getMonth() - 1);
  minDate = minDate.toISOString().substring(0, 10);

  const [ exercises, updateExercises ] = useState([]);
  const [ date, changeDate ] = useState(today);

  // Add a new blank exercise
  const addNewExercise = (type) => {
    updateExercises([
      ...exercises, {
        exercise_id: exercises.length + 1,
        name: "",
        type: type,
        sets: []
      }
    ]);
  }

  // Called by child component when the exercise has changed, updates the state
  const updateSingleExercise = (newExercise) => {
    const exercisesCopy = [...exercises];
    exercisesCopy[newExercise.exercise_id - 1] = newExercise;
    updateExercises(exercisesCopy);
  }

  const submitExercise = async () => {
    // Count the number of workouts on the same day to get the workoutID
    // PLACEHOLDER, FOR NOW DEFAULT TO 1
    const workoutID = 1;

    // Make a new workout object from the exercises array in state
    const workout = {
      workout_id: workoutID,
      date: date,
      exercises: exercises
    };

    // Pass workout to API, wait for a response, then redirect to workout view
    await fetch("http://localhost:3001/workouts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(workout)
    }).then(() => changeRoute("show"));
  }

  return(
    <form>
      <label>Workout Date</label>
      <input type="date" 
        value={ date }
        min = { minDate }
        max={ today }
        onChange={ (e) => changeDate(e.target.value) }
      />
      <button type="button" onClick={ () => addNewExercise("weights") } >
        Add New Weight-lifting Exercise
      </button>
      <button type="button" onClick={ () => addNewExercise("cardio") } >
        Add New Cardio Exercise
      </button>
      <button type="button" onClick={ () => addNewExercise("bodyweight") } >
        Add New Bodyweight Exercise
      </button>
      { 
        exercises.map(exercise => {
          return (
            <Exercise 
              key={ exercise.exercise_id } 
              exercise={ exercise }
              updateWorkout={ updateSingleExercise }
            />
          );
        }) 
      }
      <br />
      <button type="button"
        onClick={ submitExercise }
      >Submit Workout</button>
    </form>
  );
}

export default Workout;