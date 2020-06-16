import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { Feather, Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux';
class App extends React.Component {
  render() {
    return (
      <View style={{ width: 24, height: 24, margin: 5 }}>
        <Ionicons
          name={this.props.name}
          size={this.props.size}
          color={this.props.color}
        />
        {this.props.item.length > 0 ? (
          <View
            style={{
              position: 'absolute',
              right: -6,
              top: -2,
              backgroundColor: '#539a86',
              borderRadius: 15,
              width: 15,
              height: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
              {this.props.item.length}
            </Text>
          </View>
        ) : null}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    item: state.item,
    counter: state.counter,
  };
}

export default connect(mapStateToProps)(App);
