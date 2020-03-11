import React from 'react';
import WorkoutSelector from '../WorkoutSelector/WorkoutSelector';
import WorkoutList from '../WorkoutList/WorkoutList';
import './WorkoutView.css';

class WorkoutView extends React.Component {
  constructor() {
    super();
    const today = new Date();
    this.state = {
      currentDate: today,
      lastClickedYear: today.getFullYear(),
      workouts: [],
      
      // eventually this information will come from the database
      oldestWorkout: new Date(2012, 6, 0)
    };
  }

  componentDidMount() {
    this.fetchWorkouts();
  }
  
  fetchWorkouts() {
    const month = this.state.currentDate.getMonth() + 1;
    const year = this.state.currentDate.getFullYear();
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

  // Change the currentDate to the just-clicked month and the last-clicked 
  // year, and fetch the workouts from this new date.
  changeCurrentMonth = (month) => {
    const newDate = new Date(this.state.lastClickedYear, month, 0);
    this.setState({ currentDate: newDate }, () => this.fetchWorkouts());
  };

  // Change lastClickedYear so that WorkoutSelector knows which months to show
  changeCurrentYear = (year) => {
    this.setState({ lastClickedYear: year });
  }
  
  render() {
    return(
      <div className='workout-view'>
        <WorkoutList 
          workouts={this.state.workouts}
          currentDate={this.state.currentDate}
        />
        <WorkoutSelector
          lastClickedYear = {this.state.lastClickedYear}
          oldestDate = {this.state.oldestWorkout}
          changeMonth={this.changeCurrentMonth}
          changeYear={this.changeCurrentYear}
        />
      </div>
    );
  }
}

export default WorkoutView;