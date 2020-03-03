import React from 'react'
import './WorkoutSelector.css';

const WorkoutSelector = (
    { oldestDate, lastClickedYear, changeMonth, changeYear }) => {
  const newestYear = new Date().getFullYear();
  const oldestYear = oldestDate.getFullYear();
  const oldestMonth = oldestDate.getMonth();
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'];
  let dateList = [];

  // Make a <ul> for every year from newestYear down to oldestYear
  for (let year = newestYear ; year >= oldestYear ; year--) {
    dateList.push(
      <ul key={ year.toString() } onClick={ () => changeYear(year) }> 
        { year } 
      </ul>
    );

    // When we hit the lastClickedYear, make an <li> child for every month
    if (year === lastClickedYear) {
      
      // Make sure we don't add any months in the future
      const today = new Date();
      const currentMonth = 
        year === today.getFullYear() ? today.getMonth() + 1 : 12;
      const endMonth = 
        year === oldestYear ? oldestMonth + 1: 1;

      for (let month = currentMonth ; month >= endMonth ; month--) {
        dateList.push(
          <li key={ year.toString() + month.toString() }
            onClick={ () => changeMonth(month) } > 
            {months[month-1]} 
          </li>
        );
      }
    }
  }

return <div className='workout-selector'>{dateList}</div>
};

export default WorkoutSelector;