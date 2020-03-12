import React from 'react';

const BodyweightSet = ({set, updateExercise}) => {

  return (
    <>
      <div>Set #{set.set_id}</div>
      <div>
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

export default BodyweightSet;