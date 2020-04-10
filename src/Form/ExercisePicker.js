import React from 'react';

const ExercisePicker = ({ addExercise }) => {
  
  // Field-list for allowed exercises. Incomplete - just for testing. 
  // Eventually I'll need to flesh this out and put it in the DB
  const exercises = [
    { name: "Squat", type: "weights", required: [{name: "weight", unit: "kg"}, {name: "reps", unit: "reps"}], optional: [{name: "rpe", unit: "rpe"}]},
    { name: "Bench", type: "weights", required: [{name: "weight", unit: "kg"}, {name: "reps", unit: "reps"}], optional: [{name: "rpe", unit: "rpe"}]},
    { name: "Row", type: "weights", required: [{name: "weight", unit: "kg"}, {name: "reps", unit: "reps"}], optional: [{name: "rpe", unit: "rpe"}]},
    { name: "OHP", type: "weights", required: [{name: "weight", unit: "kg"}, {name: "reps", unit: "reps"}], optional: [{name: "rpe", unit: "rpe"}]},
    { name: "DL", type: "weights", required: [{name: "weight", unit: "kg"}, {name: "reps", unit: "reps"}], optional: [{name: "rpe", unit: "rpe"}]},
    { name: "Running", type: "cardio", required: [{name: "hours", unit: "hours"}, {name: "mins", unit: "mins"}, {name: "secs", unit: "secs"}, {name: "distance", unit: "mi"}], optional: [{name: "avhr", unit: "bpm"}, {name: "pace", unit:"min/mile"}]},
    { name: "Cycling", type: "cardio", required: [{name: "hours", unit: "hours"}, {name: "mins", unit: "mins"}, {name: "secs", unit: "secs"}, {name: "distance", unit: "mi"}], optional: [{name: "avhr", unit: "bpm"}, {name: "speed", unit:"mph"}]},
    { name: "Running (stationary)", type: "cardio", required: [{name: "hours", unit: "hours"}, {name: "mins", unit: "mins"}, {name: "secs", unit: "secs"}], optional: [{name: "distance", unit: "mi"}, {name: "avhr", unit: "bpm"}, {name: "pace", unit:"min/mile"}]},
    { name: "Cycling (stationary)", type: "cardio", required: [{name: "hours", unit: "hours"}, {name: "mins", unit: "mins"}, {name: "secs", unit: "secs"}], optional: [{name: "distance", unit: "mi"}, {name: "avhr", unit: "bpm"}, {name: "speed", unit:"mph"}]},
    { name: "Chin-ups", type: "bodyweight", required: [{name: "reps", reps: "reps"}], optional: [{name: "weight", unit: "kg"}]},
    { name: "Push-ups", type: "bodyweight", required: [{name: "reps", reps: "reps"}], optional: [{name: "weight", unit: "kg"}]}
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