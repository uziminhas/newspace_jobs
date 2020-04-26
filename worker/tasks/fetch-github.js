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
	let resultCount = 1, onPage = 1;

	// array to hold jobs
	const allJobs = [];

	// fetch all pages
	while(resultCount > 0) {
		// run this subroutine for every page that is not empty 
		try {
			const res = await fetch(`${baseURL}?page=${onPage}`); //create a template literal
			/*
			const res = await fetch(`${baseURL}?page=${onPage}`, {
				method: 'POST',
				headers: { 'Content-Type':'application/json' } 
			});
			*/
			//console.log('current page', `${baseURL}?page=${onPage}`);
			if(res.headers.get('content-type').includes('json')) {
				const jobs = await res.json(); //Json from the response
				//const jobs = await res.text(); //Json from the response
				//console.log(jobs);
				allJobs.push(...jobs); // Putting JSON into an array, spread operator
				resultCount = jobs.length;
				console.log('got', resultCount, 'jobs');
				onPage++;
			}
		} catch(err) {
			console.log('Error being called')
			console.log(err)
		}
	}

	console.log	('got', allJobs.length, 'jobs total');


	// filter algorithm
	const jrJobs = allJobs.filter(job => {
		const jobTitle = job.title.toLowerCase(); // reduce variation and LC the whole title
		//let isJunior = true; // default case

		// algo logic
		// we could also search through the job description
		if(
			jobTitle.includes('senior') ||
			jobTitle.includes('manager') ||
			jobTitle.includes('sr.') ||
			jobTitle.includes('architect')
		) {
			return false;
		}

		return true;
	})

	// test how many get filtered out
	console.log('filtered down to', jrJobs.length);

	// set in redis
  	const success = await setAsync('github', JSON.stringify(jrJobs));

	console.log({success});
	
}

module.exports = fetchGitHub;