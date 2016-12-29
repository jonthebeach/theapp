/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';
import Routes from './routes';

export default class Login extends Component {

  _onPressButton(){
    this.props.navigator.replace({id:Routes.talks.id});
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this._onPressButton.bind(this)}>
          <Image source={require('../img/play.png')} style={styles.start}/>
        </TouchableHighlight>
        <Text style={styles.welcome}>
          <Text>Welcome to</Text>
          <Text style={styles.title}> J on the beach</Text>
        </Text>
        <Text style={styles.instructions}>
          <Text>To get started, register as a contributor</Text>
        </Text>
        <Text style={styles.instructions}>
          <Text>Shake or press button above to start</Text>
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(36, 37, 38, 1)',
    color: 'rgba(255, 255, 255, .4)'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'rgba(255, 255, 255, .4)',
    fontWeight: "bold"
  },
  title: {
    color: 'rgba(255, 255, 255, .5)'
  },
  instructions: {
    textAlign: 'center',
    marginBottom: 5,
    color: 'rgba(255, 255, 255, .4)'
  },
  start: {
    width: 100,
    height: 100,
    marginBottom: 15,
  }
});
