import React from 'react';
import Exercise from './Exercise';

class Workout extends React.Component {
  constructor(props) {
    super(props);

    this.today = new Date().toISOString().substring(0, 10);
    // set the min value for the date picker to be 1 month ago
    const minDate = new Date();
    minDate.setMonth(minDate.getMonth() - 1);
    this.minDate = minDate.toISOString().substring(0, 10);

    this.state = { exercises: [], date: this.today };
  }

  addNewExercise = () => {
    const exercises = this.state.exercises;
    this.setState({
      exercises: [
        ...exercises, {
          exercise_id: exercises.length + 1,
          name: "",
          type: "weights",
          sets: []
        }
      ]
    });
  }

  updateSingleExercise = (newExercise) => {
    const exercises = this.state.exercises;
    const updatedExercises = [...exercises];
    updatedExercises[newExercise.exercise_id - 1] = newExercise;
    this.setState({exercises: updatedExercises});
  }

  render() {
    const { date, minDate, today, exercises } = this.state;
    return(
      <form>
        <label>Workout Date</label>
        <input type="date" 
          value={ date }
          min = { minDate }
          max={ today }
          onChange={ (e) => this.setState({date: e.target.value}) }
        />
        <button type="button" onClick={ this.addNewExercise } >
          Add New Exercise
        </button>
        { 
          exercises.map(exercise => {
            return (
              <Exercise 
                key={ exercise.exercise_id } 
                exercise={ exercise }
                updateWorkout={ this.updateSingleExercise }
              />
            );
          }) 
        }
        <br />
        <button type="button"
          onClick={() => console.log(exercises)}
        >Submit Workout</button>
      </form>
    );
  }
}

export default Workout;