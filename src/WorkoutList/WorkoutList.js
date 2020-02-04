import React from 'react'
import './WorkoutList.css';

const WorkoutList = () => {
  return (
    <div className='workout-list'>
      <div className='workout'>
        <h2 className='date'>Tuesday 14th January 2020</h2>
        <div className='exercise'>
          <h3>OHP</h3>
          <li><span className='weight'>35kg</span> x <span className='reps'>5</span></li>
          <li><span className='weight'>35kg</span> x <span className='reps'>5</span></li>
          <li><span className='weight'>35kg</span> x <span className='reps'>5</span></li>
          <li><span className='weight'>35kg</span> x <span className='reps'>5</span></li>
        </div>
        <div className='exercise'>
          <h3>Paused Squat</h3>
          <li><span className='weight'>45kg</span> x <span className='reps'>7</span></li>
          <li><span className='weight'>45kg</span> x <span className='reps'>7</span></li>
          <li><span className='weight'>45kg</span> x <span className='reps'>7</span></li>
        </div>
      </div>
      <div className='workout'>
        <h2 className='date'>Monday 13th January 2020</h2>
        <div className='exercise'>
          <h3>Deadlift</h3>
          <li><span className='weight'>90kg</span> x <span className='reps'>5</span></li>
          <li><span className='weight'>90kg</span> x <span className='reps'>5</span></li>
          <li><span className='weight'>90kg</span> x <span className='reps'>5</span></li>
          <li><span className='weight'>90kg</span> x <span className='reps'>5</span></li>
        </div>
        <div className='exercise'>
          <h3>Paused Bench</h3>
          <li><span className='weight'>40kg</span> x <span className='reps'>7</span></li>
          <li><span className='weight'>40kg</span> x <span className='reps'>7</span></li>
          <li><span className='weight'>40kg</span> x <span className='reps'>7</span></li>
        </div>
      </div>
    </div>
  );
};

export default WorkoutList;