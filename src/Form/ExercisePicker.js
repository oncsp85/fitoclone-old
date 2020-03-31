import React from 'react';

const ExercisePicker = ({exercises, addExercise}) => {
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