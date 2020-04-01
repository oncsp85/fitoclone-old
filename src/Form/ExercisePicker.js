import React from 'react';

const ExercisePicker = ({ addExercise }) => {
  
  // Field-list for allowed exercises. Incomplete - just for testing. 
  // Eventually I'll need to flesh this out and put it in the DB
  const exercises = [
    { name: "Squat", type: "weights", required: ["weight", "reps"], optional: ["rpe"]},
    { name: "Bench", type: "weights", required: ["weight", "reps"], optional: ["rpe"]},
    { name: "Row", type: "weights", required: ["weight", "reps"], optional: ["rpe"]},
    { name: "OHP", type: "weights", required: ["weight", "reps"], optional: ["rpe"]},
    { name: "DL", type: "weights", required: ["weight", "reps"], optional: ["rpe"]},
    { name: "Running", type: "cardio", required: ["time", "distance"], optional: ["avhr", "pace"]},
    { name: "Cycling", type: "cardio", required: ["time", "distance"], optional: ["avhr", "pace"]},
    { name: "Running (stationary)", type: "cardio", required: ["time"], optional: ["distance", "avhr", "pace"]},
    { name: "Cycling (stationary)", type: "cardio", required: ["time"], optional: ["distance", "avhr", "pace"]},
    { name: "Chin-ups", type: "bodyweight", required: ["reps"], optional: ["weight"]},
    { name: "Push-ups", type: "bodyweight", required: ["reps"], optional: ["weight"]}
  ];

  return (
    <ul>
      {
        exercises.map(exercise => {
          return (
            <li key={exercise.name} onClick={ () => addExercise(exercise) } >
              { exercise.name }
            </li>
          );
        })
      }
    </ul>
  );
}

export default ExercisePicker;