import * as React from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Feather, Ionicons, AntDesign } from '@expo/vector-icons';
import { connect } from 'react-redux';
import Constants from 'expo-constants';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.btnAdd}
        underlayColor="#ff6200"
        onPress={this.props.onAdd}>
        <AntDesign
          name="plus"
          size={20}
          color="#fff"
          style={{
            justifyContent: 'center',
            alignSelf: 'center',
            alignItems: 'center',
          }}
        />
      </TouchableOpacity>
    );
  }
}

function mapStateToProps(state) {
  return {
    counter: state.counter,
    item: state.item,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onAdd: () => dispatch({ type: 'ADD' }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

const styles = StyleSheet.create({
  btnAdd: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: '#539a86',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    zIndex: 99,
  },
});
