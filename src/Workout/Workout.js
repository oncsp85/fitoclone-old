import React from 'react'
import './Workout.css';

const Workout = ({workout}) => {
  return (
    <div className="workout">
      <h2 className="date">
        {formatDate(workout.date)}
        {
          workout.exercises
            .sort((a, b) => a.exercise_id - b.exercise_id)
            .map(exercise => renderExercise(exercise))
        }
      </h2>
    </div>
  );
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-GB", {
    weekday: "long", day: "numeric", month: "short", year:"numeric"
  });
}

const formatTime = (seconds) => {
  const time = new Date(0,0,0,0,0, seconds);
  return time.toLocaleTimeString("en-GB", {
    hour12: false
  });
}

const renderCardioSet = (set) => {
  const { time, distance, speed, avhr, weight, resistance, other } = set;
  // Initial property; cardio exercises always have a time.
  const properties = [
    <span key="time">
      {formatTime(time)}
    </span>
  ];
  // All of the following properties are optional
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

const renderWeightsSet = (set) => {
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

const renderBodyweightSet = (set) => {
  return (
    <li key={set.set_id}>
      <span>
        {set.reps}
        {" reps"}
      </span>
    </li>
  );
}

const renderExercise = (exercise) => {
  const setList = exercise.sets
    .sort((a, b) => a.set_id - b.set_id)
    .map(set => {
    if (exercise.type === "weights")
      return renderWeightsSet(set);
    else if (exercise.type === "bodyweight")
      return renderBodyweightSet(set);
    else
      return renderCardioSet(set);
  });
  return (
    <div className="exercise" key={exercise.exercise_id}>
      <h3 className="exercise-name">{exercise.name}</h3>
      {setList}
    </div>
  );
}

export default Workout;