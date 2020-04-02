import React, { useState } from 'react';
import Exercise from './Exercise';

const Workout = ({ exercises, updateSingleExercise, deleteExercise, deleteExerciseSet, changeRoute }) => {

  const today = new Date().toISOString().substring(0, 10);
  // set the min value for the date picker to be 1 month ago
  let minDate = new Date();
  minDate.setMonth(minDate.getMonth() - 1);
  minDate = minDate.toISOString().substring(0, 10);
  const [ date, changeDate ] = useState(today);

  const submitWorkout = async () => {
    // Count the number of workouts on the same day to get the workoutID
    const workoutDate = new Date(date);
    const url = "http://localhost:3001/workouts?" +
    `day=${workoutDate.getDate()}` + 
    `&month=${workoutDate.getMonth()+1}` +
    `&year=${workoutDate.getFullYear()}`;
    console.log(url);
    const numberOfWorkouts = await fetch(url)
      .then(response => response.json())
      .then(workouts => {
        console.log(workouts);
        return workouts.length
      });

    // Remove the field lists from the exercise object
    const exercisesCopy = [ ...exercises ];
    exercisesCopy.forEach(exercise => {
      delete exercise.required;
      delete exercise.optional;
    });

    // Make a new workout object from the exercises array in state
    const workout = {
      workout_id: numberOfWorkouts + 1,
      date: date,
      exercises: exercisesCopy
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
      { 
        exercises.map(exercise => {
          return (
            <Exercise 
              key={ exercise.exercise_id } 
              exercise={ exercise }
              updateWorkout={ updateSingleExercise }
              deleteExercise={ deleteExercise }
              deleteExerciseSet={ deleteExerciseSet }
            />
          );
        }) 
      }
      <br />
      <button type="button"
        onClick={ submitWorkout }
      >Submit Workout</button>
    </form>
  );
}

export default Workout;