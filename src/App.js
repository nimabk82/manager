import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore ,applyMiddleware} from 'redux';
import reducers from './reducers';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import Router from './Router';


class App extends Component {
    componentWillMount(){
        const config = {
            apiKey: "AIzaSyArj2iReGP5ljFhVASUoOYwdHU4p5ubVo4",
            authDomain: "manager-861b1.firebaseapp.com",
            databaseURL: "https://manager-861b1.firebaseio.com",
            storageBucket: "manager-861b1.appspot.com",
            messagingSenderId: "427539924120"

        };
        firebase.initializeApp(config);

    }

    render() {
        const store = createStore(reducers, {} , applyMiddleware(ReduxThunk));

        return (
            <Provider store={store}>
                <Router/>
            </Provider>
        );
    }
}

export default  App;