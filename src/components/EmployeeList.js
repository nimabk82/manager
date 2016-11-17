import React, { Component } from 'react';
import _ from 'lodash';
import { ListView } from 'react-native';
import  {connect} from 'react-redux';
import  {employeesFetch} from '../actions';
import  ListItem from './ListItem';

class EmployeeList extends Component {
    componentWillMount(){
        this.props.employeesFetch();

        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps){
        // nextProps are the next set of props that this component
        // will be rendered with
        // this.props is still the old set of props

        this.createDataSource(nextProps);
    }

    createDataSource({ employees }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(employees);
    }

    renderRow(employee){
        return <ListItem employee={employee} />
    }

  render() {
    return (

        <ListView
            enableEmptySections
            dataSource={this.dataSource}
            renderRow={this.renderRow}
        />
    );
  }
}

//to understand this part watch https://www.udemy.com/the-complete-react-native-and-redux-course/learn/v4/t/lecture/5870570
const mapStateToProps = state => {
    //this part by because the return value is an object and we need an array by using lodash we map the object to an array
  const employees = _.map(state.employees, (val ,uid) => {
      return {...val , uid};
      }
  );
    return {employees};
};

export default connect(mapStateToProps,{employeesFetch}) (EmployeeList);
