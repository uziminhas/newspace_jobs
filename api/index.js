const express = require('express')
const axios = require('axios');
const fetch = require('node-fetch');
const app = express()
const port = 3001

const redis = require("redis"); // Create new instance of Redis client
const client = redis.createClient();

const { promisify } = require("util");
const getAsync = promisify(client.get).bind(client);

var cors = require('cors');

//app.use(cors());

app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	next();
})

app.use('/api/subscribe', (req, res, next) => {
	console.log("POST request received");
	next();
})

// Converted to an asynch function
app.get('/jobs', async (req, res) => {

	//const jobs = await getAsync('github'); // Keyword for getter function
	const jobs = await getAsync('space'); // Keyword for getter function

	//console.log(JSON.parse(jobs).length); // We originally stringified. Parse and get length to return list length
	console.log(jobs); // See if we get the original stringified object list

	// Set a header that allows requests from the URL that is the origin
	res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from

	return res.send(jobs)
})

// Accepting a post at this URL, listening...
// CHECK POST FUNCTION, NO RESPONSE OCCURING
app.post('/api/subscribe', async (req, res) => {

	console.log("POST request received 2");

	try {

		const { firstName, lastName, email, role } = req.body;
		const data = {
			email_address: email,
			status: 'subscribed',
			merge_fields: {
				FNAME: firstName,
				LNAME: lastName,
				OCCUPATION: role
			}
		};
		const postData = JSON.stringify(data);
		res.status(200); // <------- this is not a response


	} catch (error) {
		res.status(500);
	}

	res.json(); // This is the actual response

	// const { firstName, lastName, email, role } = req.body;

	//res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from

	// Create subscribers
	// const data = {
	// 	email_address: email,
	// 	status: 'subscribed',
	// 	merge_fields: {
	// 		FNAME: firstName,
	// 		LNAME: lastName,
	// 		OCCUPATION: role
	// 	}
	// };

	// const postData = JSON.stringify(data);

	// console.log(data);
	// console.log(postData);

	/* JS is asynchronous
	Make app.post async, make an async function
	Add await to fetch/axios
	Use postman to see if this body + endpoint for mailchimp works
	Second issue is express function isn't waiting
	*/

	/*
	await axios.post('https://us10.api.mailchimp.com/3.0/lists/71eccdc438', {
	  headers: {
	    Authorization: `auth d38a401344ee09e31b4903bfe`
	  },
	  body: postData
	})
	  .then(res.statusCode === 200 ?
	    console.log("Submitted") :
	    console.log("Rejected"))
	  .catch(err => console.log(err))
	*/
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
