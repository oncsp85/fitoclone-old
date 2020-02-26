import React from 'react'
import './WorkoutList.css';

class WorkoutList extends React.Component {
  constructor() {
    super();
    this.state = {workouts: []};
  }

  componentDidMount() {
    fetch("http://localhost:3001/")
      .then(response => response.json())
      .then(workouts => {
        this.setState({workouts: workouts})
      })
      .catch(err => {
        console.log("Something's gone wrong");
        console.log(err);
      });
  }

  formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-GB", {
      weekday: "long", day: "numeric", month: "short", year:"numeric"
    });
  }

  formatTime(seconds) {
    const time = new Date(0,0,0,0,0, seconds);
    return time.toLocaleTimeString("en-GB", {
      hour12: false
    });
  }

  renderCardioSet(set) {
    const { time, distance, speed, avhr, weight, resistance, other } = set;
    const properties = [
      <span key="time">
        {this.formatTime(time)}
      </span>
    ];
    if (distance)
      properties.push(
        <span key="distance">
          {" | "}
          {distance.value} {distance.unit}
        </span>
      );
      if (set.speed)
      properties.push(
        <span key="speed">
          {" | "}
          {speed.value} {speed.unit}
        </span>
      );
      if (avhr)
      properties.push(
        <span key="avhr">
          {" | "}
          {avhr} {"BPM"}
        </span>
      );
      if (weight)
      properties.push(
        <span key="weight">
          {" | "}
          {weight.value} {weight.unit}
        </span>
      );
      if (set.resistance)
      properties.push(
        <span key="resistance">
          {" | "}
          {resistance.value} {resistance.unit}
        </span>
      );
      if (other)
      properties.push(
        <span key="other">
          {" | "}
          {other}
        </span>
      );

    return (
      <li key={set.set_id}>
        {properties}
      </li>
    );
  }

  renderWeightsSet(set) {
    return (
      <li key={set.set_id}>
        <span>
          {set.weight.value} {set.weight.unit}
        </span>
        {" x "}
        <span>
          {set.reps}
          {" reps"}
        </span>
      </li>
    );
  }

  renderBodyweightSet(set) {
    return (
      <li key={set.set_id}>
        <span>
          {set.reps}
          {" reps"}
        </span>
      </li>
    );
  }

  renderExercise(exercise) {
    const setList = exercise.sets
      .sort((a, b) => a.set_id - b.set_id)
      .map(set => {
      if (exercise.type === "weights")
        return this.renderWeightsSet(set);
      else if (exercise.type === "bodyweight")
        return this.renderBodyweightSet(set);
      else
        return this.renderCardioSet(set);
    });
    return (
      <div className="exercise" key={exercise.exercise_id}>
        <h3 className="exercise-name">{exercise.name}</h3>
        {setList}
      </div>
    );
  }

  renderWorkout(workout) {
    return (
      <div className="workout" key={workout.date + workout.workout_id}>
        <h2 className="date">
          {this.formatDate(workout.date)}
          {
            workout.exercises
              .sort((a, b) => a.exercise_id - b.exercise_id)
              .map(exercise => this.renderExercise(exercise))
          }
        </h2>
      </div>
    );
  }

  render() {
    return(
      <div className="workout-list">
        {this.state.workouts.map(workout => this.renderWorkout(workout))}
      </div>
    );
  }
  
}


// <div className='workout-list'>
    //   <div className='workout'>
    //     <h2 className='date'>Tuesday 14th January 2020</h2>
    //     <div className='exercise'>
    //       <h3>OHP</h3>
    //       <li><span className='weight'>35kg</span> x <span className='reps'>5</span></li>
    //       <li><span className='weight'>35kg</span> x <span className='reps'>5</span></li>
    //       <li><span className='weight'>35kg</span> x <span className='reps'>5</span></li>
    //       <li><span className='weight'>35kg</span> x <span className='reps'>5</span></li>
    //     </div>
    //     <div className='exercise'>
    //       <h3>Paused Squat</h3>
    //       <li><span className='weight'>45kg</span> x <span className='reps'>7</span></li>
    //       <li><span className='weight'>45kg</span> x <span className='reps'>7</span></li>
    //       <li><span className='weight'>45kg</span> x <span className='reps'>7</span></li>
    //     </div>
    //   </div>
    //   <div className='workout'>
    //     <h2 className='date'>Monday 13th January 2020</h2>
    //     <div className='exercise'>
    //       <h3>Deadlift</h3>
    //       <li><span className='weight'>90kg</span> x <span className='reps'>5</span></li>
    //       <li><span className='weight'>90kg</span> x <span className='reps'>5</span></li>
    //       <li><span className='weight'>90kg</span> x <span className='reps'>5</span></li>
    //       <li><span className='weight'>90kg</span> x <span className='reps'>5</span></li>
    //     </div>
    //     <div className='exercise'>
    //       <h3>Paused Bench</h3>
    //       <li><span className='weight'>40kg</span> x <span className='reps'>7</span></li>
    //       <li><span className='weight'>40kg</span> x <span className='reps'>7</span></li>
    //       <li><span className='weight'>40kg</span> x <span className='reps'>7</span></li>
    //     </div>
    //   </div>
    // </div>


export default WorkoutList;