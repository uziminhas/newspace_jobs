import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';
import Navbar from 'react-bootstrap/Navbar'
import ContainerBS from 'react-bootstrap/Container';
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { BrowserRouter } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import TalentMatcher from './TalentMatcher';
import Switch from "@material-ui/core/Switch";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";




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
}));

function ElevationScroll(props) {



  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const LinkBehavior = React.forwardRef((props, ref) => (
  <RouterLink ref={ref} to="/talent-matcher" {...props} />
));

export default function ElevateAppBar(props) {

  // Handle dark and light themes
  const [darkState, setDarkState] = React.useState(false);
    const palletType = darkState ? "dark" : "light";
    const darkTheme = createMuiTheme({
      palette: {
          type: palletType,
          background: {
            default: palletType === 'dark' ? '#000' : '#fff' 
          }
        }
    });
    const handleThemeChange = () => {
      setDarkState(!darkState);
    };

  const classes = useStyles();


  return (
  <ThemeProvider theme={darkTheme}>
     <React.Fragment>
        <AppBar position="sticky" color="default" elevation={0} className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
              NewSpace Ventures
            </Typography>
            <Switch checked={darkState} onChange={handleThemeChange} />
            <nav>
              <Link variant="button" color="textPrimary" component={LinkBehavior} className={classes.link}>
                SIGN UP FOR TALENT MATCHING
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
      </React.Fragment>
  </ThemeProvider>
  );
}
