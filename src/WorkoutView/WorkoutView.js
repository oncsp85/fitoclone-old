import React from 'react';
import WorkoutSelector from '../WorkoutSelector/WorkoutSelector';
import WorkoutList from '../WorkoutList/WorkoutList';
import './WorkoutView.css';

class WorkoutView extends React.Component {
  constructor() {
    super();
    const today = new Date();
    this.state = {
      currentMonth: today.getMonth(),
      currentYear: today.getFullYear(),
      
      // eventually this information will come from the database
      oldestYear: 2012,  
      newestYear: 2020,
    };
  }

  changeCurrentMonth = (month) => {
    this.setState({ currentMonth: month });
  };

  changeCurrentYear = (year) => {
    this.setState({ currentYear: year });
  }
  
  render() {
    return(
      <div className='workout-view'>
        <WorkoutList />
        <WorkoutSelector
          state={this.state}
          changeMonth={this.changeCurrentMonth}
          changeYear={this.changeCurrentYear}
        />
      </div>
    );
  }
}

export default WorkoutView;