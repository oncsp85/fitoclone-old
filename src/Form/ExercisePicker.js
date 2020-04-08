import React from 'react';

const ExercisePicker = ({ addExercise }) => {
  
  // Field-list for allowed exercises. Incomplete - just for testing. 
  // Eventually I'll need to flesh this out and put it in the DB
  const exercises = [
    { name: "Squat", type: "weights", required: [{name: "weight", unit: "kg"}, "reps"], optional: ["rpe"]},
    { name: "Bench", type: "weights", required: [{name: "weight", unit: "kg"}, "reps"], optional: ["rpe"]},
    { name: "Row", type: "weights", required: [{name: "weight", unit: "kg"}, "reps"], optional: ["rpe"]},
    { name: "OHP", type: "weights", required: [{name: "weight", unit: "kg"}, "reps"], optional: ["rpe"]},
    { name: "DL", type: "weights", required: [{name: "weight", unit: "kg"}, "reps"], optional: ["rpe"]},
    { name: "Running", type: "cardio", required: ["time", {name: "distance", unit: "mi"}], optional: ["avhr", "pace"]},
    { name: "Cycling", type: "cardio", required: ["time", {name: "distance", unit: "mi"}], optional: ["avhr", "pace"]},
    { name: "Running (stationary)", type: "cardio", required: ["time"], optional: [{name: "distance", unit: "mi"}, "avhr", "pace"]},
    { name: "Cycling (stationary)", type: "cardio", required: ["time"], optional: [{name: "distance", unit: "mi"}, "avhr", "pace"]},
    { name: "Chin-ups", type: "bodyweight", required: ["reps"], optional: [{name: "weight", unit: "kg"}]},
    { name: "Push-ups", type: "bodyweight", required: ["reps"], optional: [{name: "weight", unit: "kg"}]}
  ];

  return (
    <div className="picker">
      <ul>
        {
          exercises.map(exercise => {
            return (
              <li 
                key={exercise.name} 
                className="picker-exercise"
                onClick={ () => addExercise(exercise) } 
              >
                { exercise.name }
              </li>
            );
          })
        }
      </ul>
    </div>
  );
}

export default ExercisePicker;