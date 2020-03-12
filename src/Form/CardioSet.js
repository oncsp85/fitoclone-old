import React from 'react';

const CardioSet = ({set, updateExercise}) => {

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
          defaultValue="0"
          placeholder="hh" 
          onBlur={ (e) => changeTime(e.target.value, "hours") }
        />:
        <input type="number"
          defaultValue="0"
          placeholder="mm" 
          max="59"
          onBlur={ (e) => changeTime(e.target.value, "mins") }
        />:
        <input type="number"
          defaultValue="0"
          placeholder="ss" 
          max="59"
          onBlur={ (e) => changeTime(e.target.value, "secs") }
        />
        <label>Distance</label>
        <input type="number" 
          defaultValue={set.reps}
          onBlur={ (e) => {
              const newDistance = { 
                distance: { value: e.target.value, unit: "mi" } 
              };
              updateExercise({...set, ...newDistance});
            }
          }
        />
        <button type="button" onClick={() => console.log(set)}
        >Delete Set</button>
      </div>
    </>
  );
}

export default CardioSet;