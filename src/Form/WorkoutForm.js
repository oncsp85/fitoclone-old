import React, { useState } from 'react';
import ExercisePicker from './ExercisePicker';
import Workout from './Workout';
import './WorkoutForm.css';

const WorkoutForm = (props) => {

  // If a workout has been passed in, use that workout, else make a new one
  const [ workout, updateWorkout ] = useState(
    props.workout ? props.workout : { exercises: [] }
  );

  // Add a new blank exercise
  const addExercise = (exercise) => {
    // Add exercise to exercises array
    const exercises = [...workout.exercises, 
      {
        exercise_id: workout.exercises.length + 1,
        name: exercise.name,
        type: exercise.type,
        sets: [],
        // Temporarily store field list in the object, to be removed later
        required: exercise.required,
        optional: exercise.optional
      }
    ];
    // Merge exercises array with workout and update state
    updateWorkout({...workout, ...{ exercises: exercises }});
  }

  // Deletes an exercise
  const deleteExercise = (exerciseID) => {
    const exercises = [...workout.exercises];
    // Shift each exercise above the deleted one down by 1 and update the IDs
    for (let i = exerciseID ; i < exercises.length ; i++) {
      exercises[i-1] = exercises[i];
      exercises[i-1].exercise_id--;
    }
    // Merge exercises array (ignoring last item) with workout and update state
    updateWorkout({...workout, ...{ exercises: exercises.slice(0, -1) }});
  }

  // Deletes a set from a given exercise
  const deleteExerciseSet = (exerciseID, setID) => {
    const sets = workout.exercises[exerciseID-1].sets;
    // Shift each set above the deleted one down by 1 and update the IDs
    for (let i = setID ; i < sets.length ; i++) {
      sets[i-1] = sets[i];
      sets[i-1].set_id--;
    }
    const exercises = [...workout.exercises];
    exercises[exerciseID-1].sets = sets.slice(0, -1);
    updateWorkout({...workout, ...{ exercises: exercises }});
  }

  // Called by child component when the exercise has changed, updates the state
  const updateSingleExercise = (newExercise) => {
    const exercises = [...workout.exercises];
    exercises[newExercise.exercise_id - 1] = newExercise;
    // Merge exercises array with workout and update state
    updateWorkout({...workout, ...{ exercises: exercises }});
  }

  return (
    <>
      <div className='form'>
        <ExercisePicker addExercise={addExercise}/>
        <Workout 
          workout={workout}
          updateSingleExercise={updateSingleExercise}
          deleteExercise={deleteExercise}
          deleteExerciseSet={deleteExerciseSet}
          changeRoute={props.changeRoute}
        />
      </div>
    </>
  );
}

export default WorkoutForm;