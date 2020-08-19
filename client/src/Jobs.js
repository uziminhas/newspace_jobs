import React from 'react';
import { useContext } from 'react';
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
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import MoreIcon from '@material-ui/icons/MoreVert';
import Navbar from 'react-bootstrap/Navbar'
import ContainerBS from 'react-bootstrap/Container';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';
import ElevateAppBar from './ElevateAppBar';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useTheme } from '@material-ui/core/styles';
import { ThemeContext} from './ThemeProvider';




// import { FlapDisplay, Presets } from 'react-split-flap-effect'


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
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    minHeight: 256,
    alignItems: 'flex-start',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    alignSelf: 'flex-end',
  },
  heroContent: {
    padding: theme.spacing(20, 0, 6),
  },
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
}));

const GoToTalentMatcher = React.forwardRef((props, ref) => (
  <RouterLink ref={ref} to="/talent-matcher" {...props} />
));

const GoToMap = React.forwardRef((props, ref) => (
  <RouterLink ref={ref} to="/map" {...props} />
));

var darkState = false;

export default function Jobs({jobs}) {

	const setThemeName = useContext(ThemeContext);

	// var thisTheme = useTheme();

	// const [newState, setNewState] = React.useState(false);
 //  	// const palletType = darkState ? "dark" : "light";
 //  	const darkTheme = createMuiTheme({
 //  		palette: {
 //  	    	type: "light",
 //  	    	background: {
 //  	    		default: '#fff' 
 //  	    	}
 //  	  	}
 //  	});


	//Handle dark and light themes
	//const [darkState, setDarkState] = React.useState(false);
	//var darkState = false;

  	// const palletType = darkState ? "dark" : "light";
  	// const darkTheme = createMuiTheme({
  	// 	palette: {
  	//     	type: palletType,
  	//     	background: {
  	//     		default: palletType === 'dark' ? '#000' : '#fff' 
  	//     	}
  	//   	}
  	// });
  	// const handleThemeChange = () => {
  	// 	setDarkState(!darkState);
  	// };

  	const handleThemeChange = () => {
  		darkState = !darkState;
  		//setDarkState(!darkState);
  		darkState === true ? setThemeName("darkTheme") : setThemeName("lightTheme");
  		// setThemeName("darkTheme");
  	};

  	const checkTheme = () => {
  		darkState = setThemeName === "lightTheme" ? true : false;
  	}

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

	return (
		<ThemeProvider>
		    <CssBaseline />


		    {/* Hero unit */}
		    <Container maxWidth="md" component="main" className={classes.heroContent}>
		      <Typography component="h1" variant="h2" color="textPrimary" gutterBottom>
		        Find global opportunities within the commercial space economy
		      </Typography>
		      <Typography variant="h5" align="center" color="textSecondary" component="p">
		        Quickly search from 1000s of jobs in the NewSpace industry - apply for our private beta to be matched with roles at innovative space start-ups and scale-ups.
		      </Typography>
		    </Container>

		    {/*<ElevateAppBar>
		    </ElevateAppBar>*/}

		    <AppBar position="sticky" color="default" elevation={0} className={classes.appBar}>
		      <Toolbar className={classes.toolbar}>
		        <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
		          
		        </Typography>
		        
		        <FormControlLabel className={classes.link}
		        	control={<Switch checked={darkState} onChange={handleThemeChange}/>}
		        	label="ENABLE SPACE MODE"
		        />
		        <nav>
		          <Link variant="button" color="textPrimary" component={GoToTalentMatcher} className={classes.link}>
		            SIGN UP FOR TALENT MATCHING
		          </Link>
		          <Link variant="button" color="textPrimary" component={GoToMap} className={classes.link}>
		            GO TO WORLD MAP
		          </Link>
		          <Link variant="button" color="textPrimary" href="#" className={classes.link}>
		            ABOUT US
		          </Link>
		        </nav>
		        <Button href="#" color="primary" variant="outlined" className={classes.link}>
		          LEARN MORE
		        </Button>
		      </Toolbar>
		    </AppBar>


				<div className="jobs">
					{/*<JobModal open={open} job={selectedJob} handleClose={handleClose}/>*/}

					{/*<Typography variant="h3" component="h1">
						Commercial Space Jobs - v2
					</Typography>*/}

					{/*<FlapDisplay
					      chars={Presets.ALPHANUM + ',!'}
					      length={13}
					      value={'Hello, World!'}
					/>
					*/}

					<div className="blank">
					</div>

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
							(job, i) => <Job key={i} job={job} onClick={() => {
								console.log('clicked')
								window.open(job.url)
								{/*handleClickOpen();
								selectJob(job)*/}
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