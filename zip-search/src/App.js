import React, { Component } from 'react';
import './App.css';


function City( {data} ) {
  return (<div className="City">
    <div className="City-name">{ data.City }, { data.State }</div>
    <br></br>
    <ul>
      <li>State: { data.State }</li>
      <li>Location: ({ data.Lat },{ data.Long })</li>
      <li>Population (estimated): { data.EstimatedPopulation }</li>
      <li>Total Wages: { data.TotalWages }</li>
    </ul>
    </div>);
}

function ZipSearchField(props) {
  return (
    <div>
      <b>Zip Code:</b>
      <input type="text" onChange={ props.changeHandler }/>
    </div>
    );
}


class App extends Component {

  state = {
    zipCode: '',
    cities: [],
  }

  zipChanged = (event) => {
    
    console.log(event.target.value);
    this.setState({ zipCode: event.target.value })

  if(event.target.value.length === 5) {
    fetch(`http://ctp-zip-api.herokuapp.com/zip/${event.target.value}`)
     .then((res) => res.json())
     .then((data) => {
       console.log(data)
       this.setState({ cities: data })
     }) 
     .catch(err => {
       console.log(`No results`)
       this.setState({ cities: [] })
     })
    } else {
      this.setState({ cities: [] })
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <div className="Result">
        <ZipSearchField zipCode={this.state.zipCode} changeHandler={this.zipChanged}/>
        <div>
          { this.state.cities.length === 0 ? <p>No Results</p> : null }
          { this.state.cities.map((city) => <City data={city}/>)}
        </div>
        </div>
      </div>
    );
  }
}

export default App;
