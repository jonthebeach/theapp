/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Talks extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>
          Your Talks
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
  instructions: {
    textAlign: 'center',
    marginBottom: 5,
    color: 'rgba(255, 255, 255, .4)'
  }
});
