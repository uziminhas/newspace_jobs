/*
Backend fetch of Githubs API

*/

var fetch = require('node-fetch');
const redis = require("redis");
const client = redis.createClient();

const { promisify } = require("util");
//const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);


// Add a query string for each page until you get to the end

const baseURL = 'https://jobs.github.com/positions.json'

async function fetchGitHub() {

	console.log('fetching github');

	// variable to track resultCount and onPage (i.e. what page we are on)
	let resultCount = 1, onPage = 0;

	// array to hold jobs
	const allJobs = [];

	while(resultCount > 0) {
		// run this subroutine for every page that is not empty 
		const res = await fetch(`${baseURL}?page=${onPage}`); //create a template literal
		const jobs = await res.json(); //Json from the response
		allJobs.push(...jobs); // Putting JSON into an array, spread operator
		resultCount = jobs.length;
		console.log('got', resultCount, 'jobs');
		onPage++;

	}
  
	console.log	('got', allJobs.length, 'jobs total');
	const success = await setAsync('github', JSON.stringify(allJobs));

	console.log({success});
	
}

module.exports = fetchGitHub;