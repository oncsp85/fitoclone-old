import React from 'react'
import './WorkoutList.css';
import Workout from "../Workout/Workout"

const WorkoutList = ({workouts}) => {
  return(
    <div className="workout-list">
        { workouts.map(workout => <Workout workout={workout} />) }
    </div>
  );
}

export default WorkoutList;