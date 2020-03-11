import React from 'react';

const WeightSets = ({set, updateExercise}) => {

  return (
    <>
      <div>Set #{set.set_id}</div>
      <div>
        <label>Weight</label>
        <input type="number" 
          defaultValue={set.weight.value} 
          onBlur={ (e) => { 
              const newWeight = {
                weight: { value: e.target.value, unit: set.weight.unit }
              };
              updateExercise({...set, ...newWeight});
            }
          }
        />
        <label>Reps</label>
        <input type="number" 
          defaultValue={set.reps}
          onBlur={ (e) => {
              const newReps = { reps: e.target.value };
              updateExercise({...set, ...newReps});
            }
          }
        />
        <button type="button" onClick={() => console.log(set)}
        >Delete Set</button>
      </div>
    </>
  );
}

export default WeightSets;