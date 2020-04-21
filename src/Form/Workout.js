import React, { useState } from 'react';
import Exercise from './Exercise';

const Workout = ({ workout, updateSingleExercise, deleteExercise, 
    deleteExerciseSet, changeRoute }) => {

  const today = new Date().toISOString().substring(0, 10);
  // set the min value for the date picker to be 1 month ago
  let minDate = new Date();
  minDate.setMonth(minDate.getMonth() - 1);
  minDate = minDate.toISOString().substring(0, 10);
  const [ date, changeDate ] = useState(
    workout.date ? workout.date : today
  );

  const submitWorkout = async () => {
    // Count the number of workouts on the same day to get the workoutID
    const workoutDate = new Date(date);
    const url = "http://localhost:3001/workouts?" +
    `day=${workoutDate.getDate()}` + 
    `&month=${workoutDate.getMonth()+1}` +
    `&year=${workoutDate.getFullYear()}`;
    const numberOfWorkouts = await fetch(url)
      .then(response => response.json())
      .then(workouts => workouts.length);

    const exercises = [ ...workout.exercises ];
    
    exercises.forEach(exercise => {
      // If exercise has hours/mins/secs, convert to a single time property
      if ("hours" in exercise.sets[0]) {
        exercise.sets.forEach(set => {
          const time = Number(set["hours"]) * 3600 
            + Number(set["mins"]) * 60 + Number(set["secs"]);
          set["time"] = time;
          delete set.hours;
          delete set.mins;
          delete set.secs;
        });
      }
    
      // Remove the field lists from the exercise object
      delete exercise.required;
      delete exercise.optional;
    });

    // Make a new workout object from the exercises array in state
    const output = {
      ...workout,
      ...{
        workout_id: numberOfWorkouts + 1,
        date: date,
        exercises: exercises
      }
    };

    // Pass workout to API, wait for a response, then redirect to workout view
    await fetch("http://localhost:3001/workouts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(output)
    }).then(() => changeRoute("show"));
  }

  // FOR TESTING WITHOUT CONNECTING TO DB, REMOVE LATER
  const submitWorkout2 = () => {
    const exercises = [ ...workout.exercises ];
    
    exercises.forEach(exercise => {
      // If exercise has hours/mins/secs, convert to a single time property
      if ("hours" in exercise.sets[0]) {
        exercise.sets.forEach(set => {
          const time = Number(set["hours"]) * 3600 
            + Number(set["mins"]) * 60 + Number(set["secs"]);
          set["time"] = time;
          delete set.hours;
          delete set.mins;
          delete set.secs;
        });
      }
    
      // Remove the field lists from the exercise object
      delete exercise.required;
      delete exercise.optional;
    });
    
    const output = {
      ...workout,
      ...{
        workout_id: 1,
        date: date,
        exercises: workout.exercises
      }
    };

    console.log(output);
  }

  return(
    <div className="form-workout">
      <h1>Create New Workout</h1>
      <form>
        <label>Workout Date</label>
        <input type="date" 
          value={ date }
          min = { minDate }
          max={ today }
          onChange={ (e) => changeDate(e.target.value) }
        />
        { 
          workout.exercises.map(exercise => {
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
          onClick={ submitWorkout2 }  // CHANGE BACK TO submitWorkout WHEN DONE TESTING
        >Submit Workout</button>
      </form>
    </div>
  );
}

export default Workout;