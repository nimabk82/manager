import {EMPLOYEE_UPDATE, EMPLOYEE_CREATE,EMPLOYEES_FETCH_SUCCESS,EMPLOYEE_SAVE_SUCCESS,EMPLOYEE_DELETED} from './types';
import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';

export const employeeUpdate = ({prop, value}) => {
    return {
        type: EMPLOYEE_UPDATE,
        payload: {prop, value}
    };
};


export const employeeCreate = ({name, phone, shift}) => {
    const {currentUser} = firebase.auth();

    return (dispatch) => {
        /* here we need replace current user id with uid, so we replace single quote with backticks ``, you can see the real line in below
         firebase.database().ref('/users/userId/employees') */
        firebase.database().ref(`/users/${currentUser.uid}/employees`)
            .push({name, phone, shift})
            .then(() => {
                dispatch({type: EMPLOYEE_CREATE});
                Actions.employeeList({type: 'reset'});
            });
    };
};

export const employeesFetch = () => {
    const {currentUser} = firebase.auth();

    //here snapshot is not the actual data it is an object that describe the data and let us to access to employee data by snapshot.val()
    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/employees`)
            .on('value', snapshot => {
                dispatch({type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val()});
            });
    };
};

export const employeeSave = ({ name, phone, shift, uid }) => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
            .set({ name, phone, shift })
            .then(() => {
                dispatch({type: EMPLOYEE_SAVE_SUCCESS})
                Actions.employeeList({ type: 'reset' });
            });
    };
};

export const employeeDelete = ({ uid }) => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
            .remove()
            .then(() => {
                dispatch({type: EMPLOYEE_DELETED})
                Actions.employeeList({ type: 'reset' });
            });
    };
};