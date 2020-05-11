/*
We will put our function here to fetch jobs
*/
var CronJob = require('cron').CronJob;


//const fetchGitHub = require('./tasks/fetch-github.js');
const fetchSpace = require('./tasks/fetch-space.js');


// Fetch github jobs
//new CronJob('* * * * *', fetchGitHub, null, true, 'America/Los_Angeles');
new CronJob('* * * * *', fetchSpace, null, true, 'America/Los_Angeles');


/*
var job = new CronJob('* * * * * *', function() {
  console.log('You will see this message every second');
}, null, true, 'America/Los_Angeles');
job.start();
*/