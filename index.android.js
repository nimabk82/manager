import React from 'react';
import {AppRegistry , UIManager } from 'react-native';
import App from './src/App';

//add this line only to run animation on android
UIManager.setLayoutAnimationEnabledExperimental(true);
AppRegistry.registerComponent('manager', () => App);
