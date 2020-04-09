import React, { useState } from 'react';
import Set from './Set';

const Exercise  = (props) => {
  const {exercise, updateWorkout, deleteExercise, deleteExerciseSet} = props;

  const [ isOptional, toggleOptional ] = useState(false);
  const [ fieldList, updateFields ] = useState(exercise.required);

  // Adds a new blank set (will have a different format depending on its type)
  const addNewSet = () => {
    let newSet = { set_id: exercise.sets.length + 1 };
    fieldList.forEach(field => {
      if (field.name === field.unit)
        newSet[field.name] = 0;
      else
        newSet[field.name] = { value: 0, unit: field.unit };
    });
    const sets = [...exercise.sets, newSet];

    updateWorkout({...exercise, sets: sets});
  }

  // Include/exclude the optional fields from the field list
  const toggleFields = () => {
    if (isOptional) {
      toggleOptional(false);
      exercise.sets.forEach(set => {
        exercise.optional.forEach(field => delete set[field.name]);
      });
      updateFields(exercise.required);
    } else {
      toggleOptional(true);
      exercise.sets.forEach(set => {
        exercise.optional.forEach(field => {
          if (field.name === field.unit)
          set[field.name] = 0;
        else
          set[field.name] = { value: 0, unit: field.unit };
        });
      });
      updateFields([...exercise.required, ...exercise.optional]);
    }
  };

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
        fieldList={fieldList}
        updateExercise={updateSingleSet}
        deleteSet={deleteSet}
      />
    );
  });

  return(
    <div className="set">
      <label>{ exercise.name }</label>
      <button type="button" onClick= { addNewSet }>
        Add New Set
      </button>
      { 
        exercise.sets.length > 0 ? 
        <button type="button" onClick={toggleFields}>
          { isOptional ? "Hide Advanced" : "Show Advanced" }
        </button> : null 
      }
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