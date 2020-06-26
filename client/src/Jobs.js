import React from 'react';
import Typography from '@material-ui/core/Typography';
import Job from './Job';
import JobModal from './JobModal';

import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import { sizing } from '@material-ui/system';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
// import { FlapDisplay, Presets } from 'react-split-flap-effect'







/*
Jobs component will hold component tree
Render styling

*/


const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  job: {
  	width: "80%",
  	margin: "0 auto",
  	display: "flex",
  	justifyContent: "space-between",
  	margin: "20px 0",
  	padding: "20px 10px",
  	alignItems: "center"
  }
}));

export default function Jobs({jobs}) {


	// Handle dark and light themes
	const [darkState, setDarkState] = React.useState(false);
  	const palletType = darkState ? "dark" : "light";
  	const darkTheme = createMuiTheme({
  		palette: {
  	    	type: palletType,
  	  }
  	});
  	const handleThemeChange = () => {
  		setDarkState(!darkState);
  	};

  	const classes = useStyles();



	// Declares new state variable for 'filter' and sets to empty string
	const [filter, setFilter] = React.useState("");

	// Handle filtering
	// Check for null filter
	var lowercasedFilter = filter;
	if(lowercasedFilter != null) {
		lowercasedFilter = filter.toLowerCase();
	}

	// Filter jobs JSON
	// Return every value from key-value pair that matches filter
	const filteredJobs = jobs.filter(item => {
		return Object.keys(item).some(key => {
			if(item[key] != null) {
				return item[key].toLowerCase().includes(lowercasedFilter);
			}
		});
	});

	console.log("Jobs on page are", filteredJobs);

	// Handle modal
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

	// Handle pagination
	const numJobs = filteredJobs.length;
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

	// Handle scenario where 0 jobs are found and there are 0 pages of results
	var currentPage = activeStep + 1;
	if(numPages == 0) {
		currentPage = 0;
	}

	// Log out what a single job looks like
	console.log('job is', jobs[0]);

	console.log('filter is', filter);

	console.log('active step is ', activeStep);



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
		<ThemeProvider theme={darkTheme}>
		    <CssBaseline />


				<div className="jobs">
					<JobModal open={open} job={selectedJob} handleClose={handleClose}/>
					<Typography variant="h3" component="h1">
						Commercial Space Jobs - v2
					</Typography>

					{/*<FlapDisplay
					      chars={Presets.ALPHANUM + ',!'}
					      length={13}
					      value={'Hello, World!'}
					/>
					*/}

					<div className="blank">
					</div>

					<Switch checked={darkState} onChange={handleThemeChange} />


					<TextField
					    id="outlined-basic"
					    placeholder="Search by job title, company, location, etc."
					    value={filter}
					    onChange={(event) => {
					    	setFilter(event.target.value);
					    	setActiveStep(0);
					    }}			    
					    variant="outlined"
					    fullWidth="true"
					    InputProps={{
						    startAdornment: (
						        <InputAdornment position="start">
						     	    <SearchIcon />
						        </InputAdornment>
					  	    ),
						}}
					/>
			
					{/*
					<div>
						<input type="text" value={filter} placeholder="Search by job title, location, etc." onChange={(event) => {
							setFilter(event.target.value);
							setActiveStep(0);
						}} />
					</div>
					*/}

					<Typography variant="h6" component="h2">
						Found {numJobs} jobs
					</Typography>

					<div className="blank">
					</div>

					{numJobs > 10 && (
						<MobileStepper
					      variant="progress"
					      steps={numPages}
					      position="static"
					      activeStep={activeStep}
					      nextButton={
					        <Button size="small" onClick={handleNext} disabled={activeStep + 1 >= numPages}>
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
					)}



					{
						filteredJobsOnPage.map(
							(job, i) => <Job className={classes.job} key={i} job={job} onClick={() => {
								console.log('clicked')
								handleClickOpen();
								selectJob(job)
							}} />
						)
					}
					<div>
						Page {currentPage} of {numPages}
					</div>


					<MobileStepper
				      variant="progress"
				      steps={numPages}
				      position="static"
				      activeStep={activeStep}
				      nextButton={
				        <Button size="small" onClick={handleNext} disabled={activeStep + 1 >= numPages}>
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

		</ThemeProvider>

	)





}