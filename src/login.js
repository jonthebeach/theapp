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
  TouchableHighlight,
  BackAndroid
} from 'react-native';
import Routes from './routes';

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = { pressHappyStatus: false, pressSadStatus: false };
  }

  componentDidMount(){
      BackAndroid.addEventListener('hardwareBackPress', () => {
        const routes = this.props.navigator.getCurrentRoutes();
        if(routes.length && routes[0].id === Routes.settings.id ){
          this.props.navigator.replace({id:Routes.home.id});
          return true;
        }
        return false;
      });
  }

  _openSettings(){
    this.props.navigator.replace({id:Routes.settings.id});
  }

  _publishHappy(){
    console.log('happy')
  }

  _publishSad(){
    console.log('sad')
  }

  _onHideUnderlayHappy(){
    this.setState({ pressHappyStatus: false });
  }

  _onShowUnderlayHappy(){
    this.setState({ pressHappyStatus: true });
  }

  _onHideUnderlaySad(){
    this.setState({ pressSadStatus: false });
  }

  _onShowUnderlaySad(){
    this.setState({ pressSadStatus: true });
  }

  render() {
    return (
      <View style={styles.root}>
      <View style={styles.container}>
        <TouchableHighlight
          style={styles.settings}
          activeOpacity={0.4}
          underlayColor='transparent'
          onPress={this._openSettings.bind(this)}>
          <Image source={ require('../img/settings.png')} style={styles.settingsImage}/>
        </TouchableHighlight>
        <Image source={require('../img/logo.png')} style={styles.logoImage}/>
        <Text style={styles.welcome}>
          <Text style={styles.title}> Enjoying the event ?</Text>
        </Text>
        <Text style={styles.instructions}>
          <Text>Shake your phone, active camera and smile up or touch the happy icon face below.</Text>
        </Text>
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor='transparent'
          onHideUnderlay={this._onHideUnderlayHappy.bind(this)}
          onShowUnderlay={this._onShowUnderlayHappy.bind(this)}
          onPress={this._publishHappy.bind(this)}>
          <Image source={ this.state.pressHappyStatus ? require('../img/smile_face_on.png') : require('../img/smile_face.png')} style={styles.buttonImage}/>
        </TouchableHighlight>
        <Text style={styles.welcome}>
          <Text style={styles.title}> Feeling unhappy ?</Text>
        </Text>
        <Text style={styles.instructions}>
          <Text>Make a sad face on your camera or touch the sad icon face below.</Text>
        </Text>
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor='transparent'
          onHideUnderlay={this._onHideUnderlaySad.bind(this)}
          onShowUnderlay={this._onShowUnderlaySad.bind(this)}
          onPress={this._publishSad.bind(this)}>
          <Image source={ this.state.pressSadStatus ? require('../img/sad_face_on.png') : require('../img/sad_face.png')} style={styles.buttonImage}/>
        </TouchableHighlight>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'rgba(36, 37, 38, 1)'
  },
  container: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(36, 37, 38, 1)',
    marginTop: 5
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
  logoImage: {
    width: 100,
    height: 100,
    marginTop: -20,
    marginBottom: 25
  },
  buttonImage: {
    width: 70,
    height: 70,
    marginBottom: 15,
    marginTop: 15
  },
  settingsImage: {
    width: 22,
    height: 22
  },
  settingsContainer: {
  },
  settings: {
    alignSelf: 'flex-end',
    marginRight: 15,
    marginTop: 10
  }
});
