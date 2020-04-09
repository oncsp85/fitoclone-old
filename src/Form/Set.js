import React from 'react';
import './Set.css';

const Set = ({ set, fieldList, updateExercise, deleteSet }) => {
  let output = [<div key={set.set_id}>Set #{set.set_id}</div>];

  // For each required field of the exercise, make a input/label pair
  for (let field of fieldList) {
    output.push( 
      <input 
        key={field.name}
        type="number" 
        value={ field.name === field.unit ? 
          set[field.name] : set[field.name].value }
        
        onChange={ (e) => { 
          let newField;
          if (field.name === field.unit) {
            newField = {
              [field.name]: e.target.value
            };
          } else {
            newField = { 
              [field.name]: { 
                value: e.target.value, 
                unit: field.unit 
              }
            }
          }
          updateExercise({...set, ...newField});
        }}
      />, 
      <label key={field.name + "unitlabel"}>{field.unit}</label> 
    );
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