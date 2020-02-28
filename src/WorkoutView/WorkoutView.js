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
      workouts: [],
      
      // eventually this information will come from the database
      oldestYear: 2012,  
      newestYear: 2020,
    };
  }

  componentDidMount() {
    this.fetchWorkouts();
  }
  
  fetchWorkouts() {
    const month = this.state.currentMonth;
    const year = this.state.currentYear;
    fetch(`http://localhost:3001/workouts?month=${month}&year=${year}`)
      .then(response => response.json())
      .then(workouts => {
        this.setState({workouts: workouts})
      })
      .catch(err => {
        console.log("Something's gone wrong");
        console.log(err);
      });
  }

  changeCurrentMonth = (month) => {
    this.setState({ currentMonth: month }, () => this.fetchWorkouts());
  };

  changeCurrentYear = (year) => {
    this.setState({ currentYear: year });
  }
  
  render() {
    return(
      <div className='workout-view'>
        <WorkoutList workouts={this.state.workouts} />
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