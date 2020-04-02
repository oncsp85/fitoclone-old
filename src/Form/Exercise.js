import React from 'react';
import Set from './Set';

const Exercise  = (props) => {
  const {exercise, updateWorkout, deleteExercise, deleteExerciseSet} = props;

  // Adds a new blank set (will have a different format depending on its type)
  const addNewSet = () => {
    let newSet = { set_id: exercise.sets.length + 1 };
    for (let requiredField of exercise.required) {
      if (typeof requiredField === "object") {
        newSet[requiredField.name] = { value: 0, unit: requiredField.unit };
      } else {
        newSet[requiredField] = 0;
      }
    }
    const sets = [...exercise.sets, newSet];

    updateWorkout({...exercise, sets: sets});
  }

  // Deletes a set
  const deleteSet = (id) => {
    deleteExerciseSet(exercise.exercise_id, id);
  }

  // Called by child element when the set has changed, updates Workout's state
  const updateSingleSet = (newSet) => {
    const sets = [...exercise.sets];
    sets[newSet.set_id - 1] = newSet;
    updateWorkout({...exercise, sets: sets});
  }

  // Make a new Set component for every set in the exercise
  let setList;
  setList = exercise.sets.map(set => {
    return ( 
      <Set 
        key={set.set_id} 
        set={set} 
        required={exercise.required}
        updateExercise={updateSingleSet}
        deleteSet={deleteSet}
      />
    );
  });

  return(
    <div>
      <label>{ exercise.name }</label>
      <button type="button" onClick= { addNewSet }>
        Add New Set
      </button>
      <button 
        type="button" 
        onClick= { () => deleteExercise(exercise.exercise_id) }
      >
        Delete Exercise
      </button>
      <div>{ setList }</div>
    </div>
  );
}

export default Exercise;