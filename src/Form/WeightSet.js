import React from 'react';

const WeightSet = ({set, updateExercise, deleteSet}) => {
  return (
    <>
      <div>Set #{set.set_id}</div>
      <div>
        <label>Weight</label>
        <input type="number" 
          value={set.weight.value} 
          onChange={ (e) => { 
              const newWeight = {
                weight: { value: e.target.value, unit: set.weight.unit }
              };
              updateExercise({...set, ...newWeight});
            }
          }
        />
        <label>Reps</label>
        <input type="number" 
          value={set.reps}
          onChange={ (e) => {
              const newReps = { reps: e.target.value };
              updateExercise({...set, ...newReps});
            }
          }
        />
        <button type="button" onClick={() => deleteSet(set.set_id)}
        >Delete Set</button>
      </div>
    </>
  );
}

export default WeightSet;