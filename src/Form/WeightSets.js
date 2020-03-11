import React from 'react';

class WeightSets extends React.Component {

  changeSet = (newSet) => {
    this.props.updateExercise(newSet);
  }

  render() {
    const set = this.props.set;
    return (
      <>
        <div>Set #{set.set_id}</div>
        <div>
          <label>Weight</label>
          <input type="number" 
            defaultValue={set.weight.value} 
            onBlur={ (e) => { 
                const newWeight = {
                  weight: { value: e.target.value, unit: set.weight.unit }
                };
                this.changeSet({...set, ...newWeight});
              }
            }
          />
          <label>Reps</label>
          <input type="number" 
            defaultValue={set.reps}
            onBlur={ (e) => {
                const newReps = { reps: e.target.value };
                this.changeSet({...set, ...newReps});
              }
            }
          />
          <button type="button" onClick={() => console.log(set)}
          >Delete Set</button>
        </div>
      </>
    )
  }
}

export default WeightSets;