import React from 'react';

const BodyweightSet = ({set, updateExercise, deleteSet}) => {

  return (
    <>
      <div>Set #{set.set_id}</div>
      <div>
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

export default BodyweightSet;