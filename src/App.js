import React, { useState } from 'react';
import Navbar from './Navbar/Navbar';
import WorkoutView from './Feed/WorkoutView/WorkoutView';
import WorkoutForm from './Form/WorkoutForm';
import fieldList from './Form/FieldList';
import './App.css';

function App() {

  const [ route, changeRoute ] = useState("create");
  const [ workout, changeWorkout ] = useState(null);

  const editWorkout = w => {
      const exercises = [...w.exercises];
      exercises.forEach(exercise => {
        // We need to add back the "required" and "optional" fieldlists
        const template = fieldList.find(f => f.name === exercise.name);
        exercise.required = template.required;
        exercise.optional = template.optional;

        // Convert "time" properties back to separate hour/min/sec properties
        if (exercise.type==="cardio") {
          exercise.sets.forEach(set => {
            let time = set.time;
            set.hours = Math.floor(time / 3600);
            time %= 3600;
            set.mins = Math.floor(time / 60);
            set.secs = time % 60;
            delete set.time;
          })
        }
      });
      changeWorkout({...w, ...{exercises: exercises}});
      changeRoute("edit");
  }
  
  let display;
  if (route === "create")
    display = <WorkoutForm changeRoute={changeRoute} />
  else if (route === "edit")
    display = <WorkoutForm changeRoute={changeRoute} workout={workout} />
  else
    display = <WorkoutView editWorkout={editWorkout}/>

  return (
    <div className="App">
      <Navbar changeRoute={changeRoute} />
      { display }
    </div>
  );
}

export default App;