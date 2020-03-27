import React from 'react';

const CardioSet = ({set, updateExercise, deleteSet}) => {

  const changeTime = (value, unit) => {
    let newTime;
    if (unit === "hours")
      newTime = Number(value) * 3600 + set.time;
    else if (unit === "mins") 
      newTime = Number(value) * 60 + set.time;
    else 
      newTime = Number(value) + set.time;   
    
    updateExercise({ ...set, time: newTime }); 
  }

  return (
    <>
      <div>Set #{set.set_id}</div>
      <div>
        <label>Time</label>
        <input type="number"
          value="0"
          placeholder="hh" 
          onChange={ (e) => changeTime(e.target.value, "hours") }
        />:
        <input type="number"
          value="0"
          placeholder="mm" 
          max="59"
          onChange={ (e) => changeTime(e.target.value, "mins") }
        />:
        <input type="number"
          value="0"
          placeholder="ss" 
          max="59"
          onChange={ (e) => changeTime(e.target.value, "secs") }
        />
        <label>Distance</label>
        <input type="number" 
          value={set.reps}
          onChange={ (e) => {
              const newDistance = { 
                distance: { value: e.target.value, unit: "mi" } 
              };
              updateExercise({...set, ...newDistance});
            }
          }
        />
        <button type="button" onClick={() => deleteSet(set.set_id)}
        >Delete Set</button>
      </div>
    </>
  );
}

export default CardioSet;