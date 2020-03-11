import React from 'react';
import Navbar from './Navbar/Navbar';
// import WorkoutView from './Feed/WorkoutView/WorkoutView';
import WorkoutForm from './Form/Workout';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <WorkoutForm />
      {/* <WorkoutView /> */}
    </div>
  );
}

export default App;