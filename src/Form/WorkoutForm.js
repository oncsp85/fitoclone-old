import React, { useState } from 'react';
import ExercisePicker from './ExercisePicker';
import Workout from './Workout';
import './WorkoutForm.css';

const WorkoutForm = ({ changeRoute }) => {

  const [ exercises, updateExercises ] = useState([]);

  // Add a new blank exercise
  const addExercise = (exercise) => {
    updateExercises([
      ...exercises, {
        exercise_id: exercises.length + 1,
        name: exercise.name,
        type: exercise.type,
        sets: [],
        // Temporarily store field list in the object, to be removed later
        required: exercise.required,
        optional: exercise.optional
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

  return (
    <>
      <div className='form'>
        <ExercisePicker addExercise={addExercise}/>
        <Workout 
          exercises={exercises}
          updateSingleExercise={updateSingleExercise}
          deleteExercise={deleteExercise}
          deleteExerciseSet={deleteExerciseSet}
          changeRoute={changeRoute}
        />
      </div>
    </>
  );
}

export default WorkoutForm;