import React, { useState } from 'react';
import Exercise from './Exercise';

const Workout = () => {

  const today = new Date().toISOString().substring(0, 10);
  // set the min value for the date picker to be 1 month ago
  let minDate = new Date();
  minDate.setMonth(minDate.getMonth() - 1);
  minDate = minDate.toISOString().substring(0, 10);

  const [ exercises, updateExercises ] = useState([]);
  const [ date, changeDate ] = useState(today);

  const addNewExercise = () => {
    updateExercises([
      ...exercises, {
        exercise_id: exercises.length + 1,
        name: "",
        type: "weights",
        sets: []
      }
    ]);
  }

  const updateSingleExercise = (newExercise) => {
    const exercisesCopy = [...exercises];
    exercisesCopy[newExercise.exercise_id - 1] = newExercise;
    updateExercises(exercisesCopy);
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
      <button type="button" onClick={ addNewExercise } >
        Add New Exercise
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
        onClick={() => console.log(exercises)}
      >Submit Workout</button>
    </form>
  );
}

export default Workout;