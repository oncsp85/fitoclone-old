import React from 'react';
import WeightSets from './WeightSets';

class Exercise extends React.Component {

  addNewSet = () => {
    const exercise = this.props.exercise;
    const sets = [
        ...exercise.sets, 
        {
          set_id: exercise.sets.length + 1,
          weight: { value: 0, unit: "kg" },
          reps: 0
        }  
      ];
    this.props.updateWorkout({...exercise, sets: sets});
  }

  updateSingleSet = (newSet) => {
    const exercise = this.props.exercise;
    const sets = [...exercise.sets];
    sets[newSet.set_id - 1] = newSet;
    this.props.updateWorkout({...exercise, sets: sets});
  }
  
  changeName = (e) => {
    const exercise = {...this.props.exercise};
    exercise.name = e.target.value;
    this.props.updateWorkout(exercise);
  }

  render() {
    return(
      <div>
        <label>Exercise Name</label>
        <input type="text" onBlur={ this.changeName } />
        <button type="button" onClick= { this.addNewSet }>
          Add New Set
        </button>
        {
          this.props.exercise.sets.map(set => {
            return (
              <WeightSets 
                key={set.set_id} 
                set={set}
                updateExercise={this.updateSingleSet}
              />
            )
          })
        }
      </div>
    );
  }
}

export default Exercise;