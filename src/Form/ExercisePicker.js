import React from 'react';
import fieldList from './FieldList';

const ExercisePicker = ({ addExercise }) => {
  
  return (
    <div className="picker">
      <ul>
        {
          fieldList.map(exercise => {
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