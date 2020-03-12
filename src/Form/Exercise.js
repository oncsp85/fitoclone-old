import React from 'react';
import WeightSet from './WeightSet';
import CardioSet from './CardioSet';
import BodyweightSet from './BodyweightSet';

const Exercise  = ({exercise, updateWorkout}) => {

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
          updateExercise={updateSingleSet}/>
      );
    });
  } else if (exercise.type === "cardio") {
    setList = exercise.sets.map(set => {
      return ( 
        <CardioSet
          key={set.set_id} 
          set={set} 
          updateExercise={updateSingleSet}/>
      );
    });
  } else {
    setList = exercise.sets.map(set => {
      return ( 
        <BodyweightSet 
          key={set.set_id} 
          set={set} 
          updateExercise={updateSingleSet}/>
      );
    });
  }

  return(
    <div>
      <label>Exercise Name</label>
      <input 
        type="text" 
        onBlur={ (e) => updateWorkout({...exercise, name: e.target.value}) } 
      />
      <button type="button" onClick= { addNewSet }>
        Add New Set
      </button>
      { setList }
    </div>
  );
}

export default Exercise;