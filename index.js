/**
 * dList
 * Application to shop list.
 * 
 * @format
 */
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import App from './App';

// Start boot
const runApp = () => App;

AppRegistry.registerComponent(appName, runApp);
