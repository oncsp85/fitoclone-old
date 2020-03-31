import React from 'react';
import WeightSet from './WeightSet';
import CardioSet from './CardioSet';
import BodyweightSet from './BodyweightSet';

const Exercise  = (props) => {
  const {exercise, updateWorkout, deleteExercise, deleteExerciseSet} = props;

  // Adds a new blank set (will have a different format depending on its type)
  const addNewSet = () => {
    let newSet = { set_id: exercise.sets.length + 1 };
    if (exercise.type === "cardio")
      newSet.time = 0;
    else {
      newSet.reps = 0;
      if (exercise.type === "weights") {
        newSet = {
          ...newSet,
          weight: { value: 0, unit: "kg" },
        }
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

  // Determine which "Set" component we need
  let setList;
  if (exercise.type === "weights") {
    setList = exercise.sets.map(set => {
      return ( 
        <WeightSet 
          key={set.set_id} 
          set={set} 
          updateExercise={updateSingleSet}
          deleteSet={deleteSet}
        />
      );
    });
  } else if (exercise.type === "cardio") {
    setList = exercise.sets.map(set => {
      return ( 
        <CardioSet
          key={set.set_id} 
          set={set} 
          updateExercise={updateSingleSet}
          deleteSet={deleteSet}
        />
      );
    });
  } else {
    setList = exercise.sets.map(set => {
      return ( 
        <BodyweightSet 
          key={set.set_id} 
          set={set} 
          updateExercise={updateSingleSet}
          deleteSet={deleteSet}
        />
      );
    });
  }

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