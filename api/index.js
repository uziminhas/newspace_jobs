const express = require('express')
const app = express()
const port = 3001

const redis = require("redis"); // Create new instance of Redis client
const client = redis.createClient();

const { promisify } = require("util");
const getAsync = promisify(client.get).bind(client);

// Converted to an asynch function
app.get('/jobs', async (req, res) => {

	//const jobs = await getAsync('github'); // Keyword for getter function
	const jobs = await getAsync('space'); // Keyword for getter function

	//console.log(JSON.parse(jobs).length); // We originally stringified. Parse and get length to return list length
	console.log(jobs); // See if we get the original stringified object list

	// Set a header that allows requests from the URL that is the origin
	res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from

	return res.send(jobs)
})

app.pst('api/subscribe', (req, res) => {
	var data = req.body;
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
