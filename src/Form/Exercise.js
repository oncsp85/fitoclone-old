import React from 'react';
import WeightSets from './WeightSets';

const Exercise  = ({exercise, updateWorkout}) => {

  const addNewSet = () => {
    const sets = [
        ...exercise.sets, 
        {
          set_id: exercise.sets.length + 1,
          weight: { value: 0, unit: "kg" },
          reps: 0
        }  
      ];
    updateWorkout({...exercise, sets: sets});
  }

  const updateSingleSet = (newSet) => {
    const sets = [...exercise.sets];
    sets[newSet.set_id - 1] = newSet;
    updateWorkout({...exercise, sets: sets});
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
      {
        exercise.sets.map(set => {
          return (
            <WeightSets 
              key={set.set_id} 
              set={set}
              updateExercise={updateSingleSet}
            />
          )
        })
      }
    </div>
  );
}

export default Exercise;