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
  ScrollView ,
  Image,
  TouchableHighlight,
  BackAndroid
} from 'react-native';
import { Icon, Button } from 'native-base';

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

  _openAbout(){
    this.props.navigator.replace({id:Routes.about.id});
  }

  _openMap(){
    this.props.navigator.replace({id:Routes.about.id});
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
      <ScrollView  style={styles.root}>
      <View style={styles.header}>
        <Button
          transparent
          style={styles.logo}
          onPress={this._openAbout.bind(this)}>
          <Icon name='ios-camera' style={{color:'rgba(255, 255, 255, 0.4)'}}/>
        </Button>
        <Button
          transparent
          style={styles.settings}
          onPress={this._openSettings.bind(this)}>
          <Icon name='ios-settings' style={{color:'rgba(255, 255, 255, 0.4)'}}/>
        </Button>
        {/*
          <TouchableHighlight
            style={styles.logo}
            activeOpacity={0.4}
            underlayColor='transparent'
            onPress={this._openAbout.bind(this)}>
            <Image source={ require('../img/logo.png')} style={styles.logoImage}/>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.settings}
            activeOpacity={0.4}
            underlayColor='transparent'
            onPress={this._openSettings.bind(this)}>
            <Image source={ require('../img/settings.png')} style={styles.settingsImage}/>
          </TouchableHighlight>
          */}
      </View>
      <View style={styles.container}>
        <Text style={styles.welcome}>
          <Text style={styles.title}> Enjoying the event ?</Text>
        </Text>
        <View style={styles.textWrap}>
          <Text style={styles.instructions}>/* Active camera and smile or touch the happy faced icon below */</Text>
        </View>
        <Button
          transparent
          style={{backgroundColor: 'red', alignSelf: 'center'}}
          onPress={this._publishHappy.bind(this)}>
          <Icon name='ios-happy-outline' style={{backgroundColor: 'green', height: 80, marginTop:-100, padding:0, fontSize: 100, color:'rgba(255, 255, 255, 0.4)'}}/>
        </Button>
        <Text style={styles.welcome}>
          <Text style={styles.title}> Feeling unhappy ?</Text>
        </Text>
        <View style={styles.textWrap}>
          <Text style={styles.instructions}>/* Make a sad face on your camera or touch the faced sad icon below */</Text>
        </View>
        <TouchableHighlight
          activeOpacity={0.8}
          underlayColor='transparent'
          onHideUnderlay={this._onHideUnderlaySad.bind(this)}
          onShowUnderlay={this._onShowUnderlaySad.bind(this)}
          onPress={this._publishSad.bind(this)}>
          <Image source={ this.state.pressSadStatus ? require('../img/sad_face_on.png') : require('../img/sad_face.png')} style={styles.buttonImage}/>
        </TouchableHighlight>
        <View style={styles.textWrap}>
        <TouchableHighlight
          activeOpacity={0.7}
          underlayColor='transparent'
          onPress={this._openMap.bind(this)}>
          <Text style={styles.map}>Try our live map to visualize it realtime !</Text>
          </TouchableHighlight>
        </View>
        {/*<TouchableHighlight
          style={styles.about}
          activeOpacity={0.4}
          underlayColor='transparent'
          onPress={this._openAbout.bind(this)}>
          <View>
          <Image source={ require('../img/logo.png')} style={styles.logoImage}/>
          <Text>About</Text>
          </View>
        </TouchableHighlight>
        */}
      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'rgba(36, 37, 38, 1)'
  },
  header: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(36, 37, 38, 1)',
    marginTop: 5,
    marginBottom: 5
  },
  container: {
    flex: 0,
    flexDirection: 'column',
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
    color: 'rgba(255, 255, 255, .2)',
  },
  textWrap: {
    paddingRight: 35,
    paddingLeft: 35
  },
  logoImage: {
    width: 20,
    height: 20
  },
  logo: {
    alignSelf: 'flex-start',
    marginLeft: 25
  },
  buttonImage: {
    width: 70,
    height: 70,
    marginBottom: 15,
    marginTop: 15
  },
  settingsImage: {
    width: 25,
    height: 25
  },
  settings: {
    alignSelf: 'flex-end',
    marginRight: 25
  },
  map: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    textAlign: 'center',
    color: 'rgba(255, 255, 255, .4)',
    padding: 20,
    borderRadius: 10
  },
  about: {
    marginTop: 15,
    opacity: 0.5
  }
});
