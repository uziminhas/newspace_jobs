/*
Backend fetch of Githubs API

*/

var fetch = require('node-fetch');

// Add a query string for each page until you get to the end

const baseURL = 'https://jobs.github.com/positions.json'

async function fetchGitHub() {

	// variable to track resultCount and onPage (i.e. what page we are on)
	let resultCount = 1, onPage = 0;

	// array to hold jobs
	const 

	while(resultCount > 0) {
		// run this subroutine for every page that is not empty 
		const res = await fetch('${baseURL}?page=${onPage}'); //create a template literal
		const jobs = await res.json();
		console.log({jobs});
		console.log(jobs.length);	
	}
	
}


module.exports = fetchGitHub();