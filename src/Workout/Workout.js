import React from 'react'
import './Workout.css';

// Helper function to format dates, e.g. "2020-02-01" -> "Saturday, 1 Feb 2020"
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-GB", {
    weekday: "long", day: "numeric", month: "short", year:"numeric"
  });
}

// Helper function to convert time in seconds to "HH:MM:SS" format.
const formatTime = (time) => {
  const hours = Math.floor(time / 3600);
  time %= 3600;
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return (
    String(hours).padStart(2, "0") + ":" + 
    String(minutes).padStart(2, "0") + ":" + 
    String(seconds).padStart(2, "0")
  );
}

const Workout = ({workout}) => {
  return (
    <div className="workout">
      <h2 className="date">
        { formatDate(workout.date) }
      </h2>
      {
        // Sort exercises by exercise_id, and render each one
        workout.exercises
          .sort((a, b) => a.exercise_id - b.exercise_id)
          .map(exercise => renderExercise(exercise))
      }
      {
        // If there is a workout comment, display it
        workout.workout_comments ? 
          <div className="workout-comments"> 
            { workout.workout_comments } 
          </div> : 
          "" 
      }
    </div>
  );
}

const renderCardioSet = (set) => {
  const { time, distance, speed, avhr, weight, resistance, other } = set;
  // Initial property; cardio exercises always have a time.
  const properties = [
    <span key="time">
      { formatTime(Number(time)) }
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
  // Determine what type of exercise this is
  let renderFunc;
  if (exercise.type === "weights")
    renderFunc = renderWeightsSet;
  else if (exercise.type === "bodyweight")
    renderFunc = renderBodyweightSet;
  else
    renderFunc = renderCardioSet;

  // Sort sets by set_id, then for each one call the relevant render method
  const setList = exercise.sets
    .sort((a, b) => a.set_id - b.set_id)
    .map(set => renderFunc(set));
  
  return (
    <div className="exercise" key={exercise.exercise_id}>
      <h3 className="exercise-name">{exercise.name}</h3>
      { setList }
      {
        // If there is a comment for the exercise, display it
        exercise.exercise_comment ? 
          <div className="exercise-comment">
            { exercise.exercise_comment }
          </div> : 
          "" 
      }
    </div>
  );
}

export default Workout;