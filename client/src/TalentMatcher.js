import React from 'react';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Switch from "@material-ui/core/Switch";
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import { Link as RouterLink } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useTheme } from '@material-ui/core/styles';



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
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
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    minWidth: 220,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  selectField: {
    height: 45,

  }
}));

const LinkBehavior = React.forwardRef((props, ref) => (
  <RouterLink ref={ref} to="/" {...props} />
));

const roles = [
  'Undergraduate student',
  'Master\'s student',
  'PhD student',
  'Employee in space sector',
  'Employee in non-space industry',
  'Other',
];

export default function SignUp() {
  const darkTheme = useTheme();

  const classes = useStyles();

  const [state, setState] = React.useState({
      firstName: '',
      lastName:'',
      email: '',
      role: '',
      lastNameError: false,
      roleError: false,
      emailError: false,
      selected: null,
  });

  const handleFirstNameChange = (event) => {
    const value = event.target.value;
    setState({
      ...state,
      [event.target.name]: value,
      firstNameError: false
    });
  };

  const handleLastNameChange = (event) => {
    const value = event.target.value;
    setState({
      ...state,
      [event.target.name]: value,
      lastNameError: false
    });
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setState({
      ...state,
      [event.target.name]: value,
      emailError: false
    });
  };

  const handleRoleChange = (event) => {
    const value = event.target.value;
    setState({
      ...state,
      [event.target.name]: value,
      roleError: false,
    });
  };

  const handleSubmit = (event) => {
    var existsFirstNameError = !state.firstName ? true : false;
    var existsLastNameError = !state.lastName ? true : false;
    var existsEmailError = !state.email ? true : false;
    var existsRoleError = !state.role ? true : false;

    // Ensure you set State to current state values
    setState({ 
      firstName: state.firstName,
      lastName: state.lastName,
      email: state.email,
      role: state.role,
      firstNameError: existsFirstNameError,
      lastNameError: existsLastNameError,
      emailError: existsEmailError, 
      roleError: existsRoleError 
    });

    console.log("Submitting...");

    if(existsFirstNameError 
      || existsLastNameError 
      || existsEmailError 
      || existsRoleError
      ) {
      event.preventDefault();
      return false;
    }

    event.preventDefault();

    console.log("Submitting to API");

    const subscriber = {
      firstName: state.firstName,
      lastName: state.lastName,
      email: state.email,
      role: state.role
    };

    console.log(subscriber);

    // Sending a POST to this URL
    axios
      .post('http://localhost:3001/api/subscribe', subscriber)
      .then(() => console.log('New subscription created'))
      .catch(err => {
        console.error(err);
      });

    // Clear form inputs and state after submit
    setState({ 
      firstName: '',
      lastName: '',
      email: '',
      role: '',
      firstNameError: '',
      lastNameError: '',
      emailError: '', 
      roleError: '' 
    });

  
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <React.Fragment>
        <CssBaseline />
        <AppBar position="sticky" color="default" elevation={0} className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
              NewSpace Ventures
            </Typography>
            
            {/*<FormControlLabel className={classes.link}
              control={<Switch checked={darkState} onChange={handleThemeChange}/>}
              label="ENABLE SPACE MODE"
            />*/}
            <nav>
              <Link variant="button" color="textPrimary" component={LinkBehavior} className={classes.link}>
                RETURN HOME
              </Link>
              <Link variant="button" color="textPrimary" href="/talent-matcher" className={classes.link}>
                SUBMIT AN OPPORTUNITY
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
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Subscribe to learn more about the launch of our talent matching service
            </Typography>
            <form onSubmit={handleSubmit}/*action="/api/subscribe" method="POST"*/ className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    onChange={handleFirstNameChange}
                    error={state.firstNameError}
                    value={state.firstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                    onChange={handleLastNameChange}
                    error={state.lastNameError}
                    value={state.lastName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={handleEmailChange}
                    error={state.emailError}
                    value={state.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl variant="outlined" fullWidth error={state.roleError}>
                    <InputLabel id="demo-simple-select-outlined-label">I am an</InputLabel>
                    <Select
                      required
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={state.role}
                      onChange={handleRoleChange}
                      label="I am an"
                      inputProps={{
                        name: 'role',
                        id: 'role-native-simple',
                      }}
                    >

                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {roles.map((role) => (
                        <MenuItem key={role} value={role}>
                          {role}
                        </MenuItem>
                      ))}
                    </Select>
                    {state.roleError && <FormHelperText>Please select an occupation</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Subscribe
              </Button>
              <Grid container justify="flex-end">
                {/*<Grid item>
                  <Link href="#" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>*/}
              </Grid>
            </form>
          </div>
          <Box mt={5}>
            {/*<Copyright />*/}
          </Box>
        </Container>
      </React.Fragment>
    </ThemeProvider>
  );
}