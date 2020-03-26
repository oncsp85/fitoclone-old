import React, { useState } from 'react';
import Navbar from './Navbar/Navbar';
import WorkoutView from './Feed/WorkoutView/WorkoutView';
import WorkoutForm from './Form/Workout';
import './App.css';

function App() {

  const [ route, changeRoute ] = useState("create");
  let display;

  if (route === "create")
    display = <WorkoutForm changeRoute={changeRoute} />
  else
    display = <WorkoutView />

  return (
    <div className="App">
      <Navbar />
      { display }
    </div>
  );
}

export default App;