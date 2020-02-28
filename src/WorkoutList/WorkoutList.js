import React from 'react'
import './WorkoutList.css';
import Workout from "../Workout/Workout"

const WorkoutList = ({workouts}) => {
  if (workouts.length === 0) {
    return (
      <div className="workout-list">
        No workouts found for this date.
      </div>
    );
  }
  return(
    <div className="workout-list">
        { 
          workouts.map(workout => {
            return (
              <Workout 
                workout={workout}
                key={workout.date + workout.workout_id}
              />
            );
          })
        }
    </div>
  );
}

export default WorkoutList;