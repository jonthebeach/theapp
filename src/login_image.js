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
import {Container, Header, Title, Content, Icon, Button} from 'native-base';
import {isNumber} from 'lodash';
import {goBack, getValoHost, getValoTenant, getContributorID, createValoAssets, postToStream} from './utils';
import Routes from './routes';

import smileFaceImgOn from '../img/smile_face_on.png';
import smileFaceImgOff from '../img/smile_face.png';
import sadFaceImgOn from '../img/sad_face_on.png';
import sadFaceImgOff from '../img/sad_face.png';

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = { pressHappyStatus: false, pressSadStatus: false };
  }

  async componentDidMount(){
      const _goBack = () => goBack(this.props.navigator);
      BackAndroid.removeEventListener('hardwareBackPress', _goBack);
      BackAndroid.addEventListener('hardwareBackPress', _goBack);
      const host = await getValoHost();
      console.debug(host);
      const tenant = await getValoTenant();
      console.debug(tenant);
      await createValoAssets(host, tenant);
      console.log('created all');
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

  _getPosition(){
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            speed: position && position.coords && isNumber(position.coords.speed) ? position.coords.speed : 0,
            heading: position && position.coords && isNumber(position.coords.heading) ? position.coords.heading : 0,
            accuracy: position && position.coords && isNumber(position.coords.accuracy) ? position.coords.accuracy : 0,
            longitude: position && position.coords && isNumber(position.coords.longitude) ? position.coords.longitude : 0,
            latitude: position && position.coords && isNumber(position.coords.latitude) ? position.coords.latitude : 0,
            altitude: position && position.coords && isNumber(position.coords.altitude) ? position.coords.altitude : 0
          })
        },
        (error) => reject(error),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      );
    });
  }

  async _publishHappy(){
    console.log('happy');
    const id = await getContributorID();
    const host = await getValoHost();
    const tenant = await getValoTenant();
    const position = await this._getPosition();
    const data = {contributor:id, position, status: "happy", timestamp: new Date().toISOString()};
    console.log(data);
    await postToStream(data, host, tenant);
  }

  async _publishSad(){
    console.log('sad');
    const id = await getContributorID();
    const host = await getValoHost();
    const tenant = await getValoTenant();
    const position = await this._getPosition();
    const data = {contributor:id, position, status: "sad", timestamp: new Date().toISOString()};
    await postToStream(data, host, tenant);
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
      <Container style={styles.root}>
          <Header style={styles.header}>
          <Button
            transparent
            onPress={this._openAbout.bind(this)}>
            <Icon name='ios-camera' style={{color:'rgba(255, 255, 255, 0.4)'}}/>
          </Button>
            <Title style={styles.headerTitle}>/* J on the beach */</Title>
            <Button
              transparent
              onPress={this._openSettings.bind(this)}>
              <Icon name='ios-settings' style={{fontSize: 27, marginBottom: 5, color:'rgba(255, 255, 255, 0.4)'}}/>
            </Button>
          </Header>
          <Content>
      <ScrollView  style={styles.root}>
      <View style={styles.header}>
      </View>
      <View style={styles.container}>
        <Text style={styles.welcome}>
          <Text style={styles.title}> Enjoying the event ?</Text>
        </Text>
        <View style={styles.textWrap}>
          <Text style={styles.instructions}>/* Active camera and smile or touch the happy faced icon below */</Text>
        </View>
        <TouchableHighlight
          activeOpacity={0.8}
          underlayColor='transparent'
          onHideUnderlay={this._onHideUnderlayHappy.bind(this)}
          onShowUnderlay={this._onShowUnderlayHappy.bind(this)}
          onPress={this._publishHappy.bind(this)}>
          <Image source={ this.state.pressHappyStatus ? smileFaceImgOn : smileFaceImgOff} style={styles.buttonImage}/>
        </TouchableHighlight>
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
          <Image source={ this.state.pressSadStatus ? sadFaceImgOn : sadFaceImgOff} style={styles.buttonImage}/>
        </TouchableHighlight>
        <View style={styles.textWrap}>
        <TouchableHighlight
          activeOpacity={0.7}
          underlayColor='transparent'
          onPress={this._openMap.bind(this)}>
          <Text style={styles.map}>Try our live map & visualize it realtime !</Text>
          </TouchableHighlight>
        </View>
      </View>
      </ScrollView>
      </Content>
  </Container>
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
  },
  header: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 10
  },
  headerTitle:{
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.5)'
  }
});
