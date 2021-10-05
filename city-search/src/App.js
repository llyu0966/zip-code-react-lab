import React, { Component } from 'react';
import './App.css';


function Zip( {data} ) {
  return (
    <div> <li> {data} </li></div>
    );
}

function CitySearchField(props) {
  return (
    <div>
      <b>City Name:</b>
      <input type="text" onChange={ props.changeHandler }/>
    </div>
    );
}


class App extends Component {

  state = {
    city: '',
    zipCodes: [],
  }

  cityChanged = (event) => {
    
    console.log(event.target.value.toUpperCase());
    this.setState({ city: event.target.value.toUpperCase() })
 
    fetch(`http://ctp-zip-api.herokuapp.com/city/${event.target.value.toUpperCase()}`)
     .then((res) => res.json())
     .then((data) => {
       console.log(data)
       this.setState({ zipCodes: data })
     }) 
     .catch(err => {
       console.log(`No results`)
       this.setState({ zipCodes: [] })
     })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>City Search</h2>
        </div>
        <CitySearchField city={this.state.city} changeHandler={this.cityChanged}/>
        <div>
          { this.state.zipCodes.length === 0 ? <p>No Results</p> : null }
          { this.state.zipCodes.map((zipCode) => <Zip data={zipCode}/>)}
        </div>
      </div>
    );
  }
}

export default App;