import React from 'react';
import {View} from 'react-native';

const CardSection = (props) => {
  return (
      //define an array for style. component first check first style in array and if there another style implement the second one. this specifically for inline style
    <View style={[styles.containerStyle , props.style]} >
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    borderBottomWidth: 1,
    backgroundColor :'#fff',
    borderColor: '#ddd',
    justifyContent: 'flex-start',
    flexDirection:'row',
    position:'relative',
    padding:5,
  }
};

export { CardSection };
