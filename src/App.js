import React from 'react';
import Navbar from './Navbar/Navbar';
import WorkoutView from './WorkoutView/WorkoutView';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <WorkoutView />
    </div>
  );
}

export default App;
