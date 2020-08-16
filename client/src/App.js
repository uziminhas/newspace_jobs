import React from 'react';
import './App.css';
import Jobs from './Jobs';
import TalentMatcher from './TalentMatcher';
import MapIndex from './MapIndex';
import { BrowserRouter, Route } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";



var fetch = require('node-fetch');



/*
App component will hold App state
Use state
And call hooks for componentDidMount() and state

*/

const JOB_API_URL = 'http://localhost:3001/jobs';

// Test mock props to send to Jobs component
// const mockJobs = [
//   {title: 'SWE 1', company: 'Google', year: '2020'},
//   {title: 'SWE 1', company: 'Facebook', year: '2020'},
//   {title: 'SWE 1', company: 'Apple', year: '2020'}

// ]

// const darkTheme = createMuiTheme({
// 	palette: {
//     	type: 'dark',
//     	background: {
//     		default: '#000'//palletType === 'dark' ? '#000' : '#fff' 
//     	}
//   	}
// });

// Call the URL programmatically
async function fetchJobs(updateCb) {

	const res = await fetch(JOB_API_URL); //ERROR HERE
	let json = await res.json();
	updateCb(json); // setting the value of jobList to this json
}


function App() {

	// Use state hook to store jobs
	// Second variable that we destructure from the useState hook is a function
	// in which we can pass an argument that is the new value of our state for jobList
	const [jobList, updateJobs] = React.useState([]); // initializes to an empty list

	// Takes an anonymous function and a second argument that is the hooks we want to watch
	React.useEffect(() => {
		fetchJobs(updateJobs); // callback to update these jobs
	}, [])

  return (
	<BrowserRouter>
    	<Route
    		exact path="/"
    		component={(props) => <Jobs {...props} jobs={jobList} />}
    	/>
    	<Route
    		exact path="/talent-matcher"
    		component={TalentMatcher}
    	/>
    	<Route
    		exact path="/map"
    		component={MapIndex}
    	/>
	</BrowserRouter>
  );
}

export default App;
