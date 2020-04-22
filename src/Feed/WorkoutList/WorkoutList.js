import React from 'react'
import './WorkoutList.css';
import Workout from "../Workout/Workout"

const WorkoutList = ({workouts, currentDate, editWorkout}) => {
  const output = [
    <h1 key={"dateheader"}> 
      { 
        currentDate.toLocaleDateString("en-GB", 
          {month: "long", year: "numeric"})
      }
    </h1>
  ];

  if (workouts.length === 0)
    output.push(
      <span key="no-workouts">
        No workouts found for this month.
      </span>
    );
  else {
    workouts.map(workout => {
      output.push(
        <Workout 
          workout={workout}
          key={workout.date + workout.workout_id}
          editWorkout={editWorkout}
        />
      );
      return null;
    });
  }
  return <div className="workout-list">{output}</div>;
}

export default WorkoutList;