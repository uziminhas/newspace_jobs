import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import ThemeProvider from './ThemeProvider';


// const darkTheme = createMuiTheme({
// 	palette: {
//     	type: 'dark',
//     	background: {
//     		default: '#000'//palletType === 'dark' ? '#000' : '#fff' 
//     	}
//   	}
// });

ReactDOM.render(
  <React.StrictMode>
  	<ThemeProvider>
    	<App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
