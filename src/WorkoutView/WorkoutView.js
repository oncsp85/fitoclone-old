import React from 'react';
import WorkoutSelector from '../WorkoutSelector/WorkoutSelector';
import WorkoutList from '../WorkoutList/WorkoutList';
import './WorkoutView.css';

class WorkoutView extends React.Component {
  render() {
    return(
      <div className='workout-view'>
        <WorkoutList />
        <WorkoutSelector />
      </div>
    );
  }
}

export default WorkoutView;