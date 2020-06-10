/*
Backend fetch of space jobs

*/

var fetch = require('node-fetch');
const redis = require("redis");
const client = redis.createClient();

const { promisify } = require("util");
const setAsync = promisify(client.set).bind(client);


// Add a query string for each page until you get to the end

const baseURL = 'https://newspaceventures.com/jobs/space_jobs_db.json'

async function fetchSpace() {

	console.log('fetching space jobs');

	// variable to track resultCount and onPage (i.e. what page we are on)
	// let resultCount = 1, onPage = 1;

	// array to hold jobs
	let allJobs = [];

	try {
		const res = await fetch(baseURL); //create a template literal
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
			//allJobs.push(...jobs); // Putting JSON into an array, spread operator
			allJobs = jobs;
			resultCount = jobs.length;
			console.log('got', resultCount, 'jobs');
			//onPage++;
		}
	} catch(err) {
		console.log('Error being called')
		console.log(err)
	}

	console.log	('got', allJobs.length, 'jobs total');


	// filter algorithm
	// const jrJobs = allJobs.filter(job => {
	// 	const jobTitle = job.title.toLowerCase(); // reduce variation and LC the whole title
	// 	//let isJunior = true; // default case

	// 	// algo logic
	// 	// we could also search through the job description to look for: YoE, other filters
	// 	if(
	// 		jobTitle.includes('senior') ||
	// 		jobTitle.includes('manager') ||
	// 		jobTitle.includes('sr.') ||
	// 		jobTitle.includes('architect')
	// 	) {
	// 		return false;
	// 	}

	// 	return true;
	// })

	// test how many get filtered out
	console.log('filtered down to', allJobs.length);

	// set in redis
  	const success = await setAsync('space', JSON.stringify(allJobs));

	console.log({success});
	
}

module.exports = fetchSpace;