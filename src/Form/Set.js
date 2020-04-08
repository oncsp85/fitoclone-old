import React from 'react';
import './Set.css';

const Set = ({ set, required, updateExercise, deleteSet }) => {
  let output = [<div key={set.set_id}>Set #{set.set_id}</div>];

  // For each required field of the exercise, make a label/input pair
  for (let field of required) {
    // For fields with units, e.g. of the form "{ value: v, unit: u }"
    if (typeof(field) === "object") {
      output.push(
        <label key={field.name + "label"}>{field.name}</label>, 
        <input 
          key={field.name}
          type="number" 
          value={set[field.name].value}
          onChange={ (e) => { 
            const newWeight = { 
              [field.name]: { 
                value: e.target.value, 
                unit: field.unit 
              } 
            };
            updateExercise({...set, ...newWeight});
          }}
        /> 
      );
    // For "plain" fields e.g. time that don't have a unit
    } else {
      output.push(
        <label key={field + "label"}>{field}</label>, 
        <input key={field} type="number" 
          value={set[field]}
          onChange={ (e) => { 
            const newWeight = { [field]: e.target.value };
            updateExercise({...set, ...newWeight});
          }}
        />
      );
    }
  }

  return (
    <div className="set">
      { output }
      <button type="button" onClick={() => deleteSet(set.set_id)}>
        Delete Set
      </button>
    </div>
  );
}

export default Set;