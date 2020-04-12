import React from 'react';
import './App.css';
import Jobs from './Jobs';

/*
App component will hold App state
Use state
And call hooks for componentDidMount() and state

*/

// Test mock props to send to Jobs component
const mockJobs = [
  {title: 'SWE 1', company: 'Google', year: '2020'},
  {title: 'SWE 1', company: 'Facebook', year: '2020'},
  {title: 'SWE 1', company: 'Apple', year: '2020'}



]

function App() {
  return (
    <div className="App">
      <Jobs jobs={mockJobs} />
    </div>
  );
}

export default App;
