import React from 'react';
import Typography from '@material-ui/core/Typography';
import Job from './Job';
import JobModal from './JobModal';

import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

/*
Jobs component will hold component tree
Render styling

*/


export default function Jobs({jobs}) {

	const [filter, setFilter] = React.useState("");

	// Handle filtering
	// jobs is our JSON array
	var lowercasedFilter = filter;
	if(lowercasedFilter != null) {
		lowercasedFilter = filter.toLowerCase();
	}
	// const lowercasedFilter = filter.toLowerCase();
	const filteredData = jobs.filter(item => {
		return Object.keys(item).some(key => {
			if(item[key] != null) {
				// console.log("Item key is " + item[key])
				// console.log("lower filter is" + lowercasedFilter)
				// console.log(item[key].toLowerCase().includes(lowercasedFilter))
				return item[key].toLowerCase().includes(lowercasedFilter)
			}}
		);
	});

	const filteredJobs = jobs.filter(item => {
		return Object.keys(item).some(key => {
			if(item[key] != null) {
				// console.log("Item key is " + item[key])
				// console.log("lower filter is" + lowercasedFilter)
				// console.log(item[key].toLowerCase().includes(lowercasedFilter))
				return item[key].toLowerCase().includes(lowercasedFilter)
			}}
		);
	});

	console.log("Filtered data is ", filteredData);
	console.log("Jobs on page are", filteredJobs);

	// modal
	const [open, setOpen] = React.useState(false);
	// Sets selected job to whatever job we click
	// Selected job will be passed into JobModal
	const [selectedJob, selectJob] = React.useState({}); // starting out it will be an empty object, default state


	const handleClickOpen = () => {
	   setOpen(true);
	};
	const handleClose = () => {
	   setOpen(false);
	};

	// pagination
	const numJobs = jobs.length;
	const numPages = Math.ceil(numJobs / 50);

	// This is a view state, so it goes in Jobs.js, NOT the App file
	// useState declares a new state variable called 'activeStep'
	const [activeStep, setActiveStep] = React.useState(0);
	// const jobsOnPage = jobs.slice(activeStep * 50, (activeStep * 50 + 50))
	const filteredJobsOnPage = filteredJobs.slice(activeStep * 50, (activeStep * 50 + 50))


	// step == 0, show 0-49
	// step == 1, show 50-99

	const handleNext = () => {
	    setActiveStep((prevActiveStep) => prevActiveStep + 1);
	    window.scrollTo({
	      top: 0,
	      left: 0,
	      behavior: 'smooth'
	    });	
	};

	const handleBack = () => {
	    setActiveStep((prevActiveStep) => prevActiveStep - 1);
		window.scrollTo({
	      top: 0,
	      left: 0,
	      behavior: 'smooth'
	    });
	};

	// Log out what a single job looks like
	console.log('job is', jobs[0]);

	console.log('filter is', filter);


	// Create filter for job searching
	// const handleChange = event => {
	// 	console.log("Event " + event.target.value)
	// 	this.setState({ filter: event.target.value });
	// };

	// const checkIncludesFilter = (item) => {
	// 	for(var key in item) {
	// 		if(key == null) {
	// 			return false;
	// 		}
	// 		else {
	// 			return item[key].toLowerCase().includes(lowercasedFilter)				
	// 		}
	// 	}
	// };

	


	// const filteredData = jobs.filter(item => {
	// 	return Object.keys(item).some(checkIncludesFilter(item));
	// });



	// On click, we want to push that job into the modal state

	return (

		<div className="jobs">
			<JobModal open={open} job={selectedJob} handleClose={handleClose}/>
			<Typography variant="h3" component="h1">
				Commercial space jobs
			</Typography>
			<div>
				<input value={filter} onChange={event => setFilter(event.target.value)} />
			</div>
			<Typography variant="h6" component="h2">
				Found {numJobs} jobs
			</Typography>
			{
				filteredJobsOnPage.map(
					(job, i) => <Job key={i} job={job} onClick={() => {
						console.log('clicked')
						handleClickOpen();
						selectJob(job)
					}} />
				)
			}
			<div>
				Page {activeStep + 1} of {numPages}
			</div>


			<MobileStepper
		      variant="progress"
		      steps={numPages}
		      position="static"
		      activeStep={activeStep}
		      nextButton={
		        <Button size="small" onClick={handleNext} disabled={activeStep === 5}>
		          Next
		          <KeyboardArrowRight />
		        </Button>
		      }
		      backButton={
		        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
		          <KeyboardArrowLeft />
		          Back
		        </Button>
		      }
		    />




		</div>

	)





}