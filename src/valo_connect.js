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
import jonthebeachImg from '../img/logo.png';
import {goBack} from './utils';
import Routes from './routes';

export default class ValoConnect extends Component {

  constructor(props) {
    super(props);
    this.state = { valoHost: 'valo.io', valoTenant: 'jonthebeach' };
  }

  componentDidMount(){
  }

  _back(){
    return goBack(this.props.navigator);
  }

  render() {
    return (
      <Container style={styles.root}>
          <Header style={styles.header}>
            <Button onPress={this._back.bind(this)} transparent>
                <IconBase name='ios-arrow-dropleft' />
            </Button>
            <Title style={styles.headerTitle}>Valo Settings</Title>
            <Button transparent>
                <IconBase name='ios-checkmark-circle-outline' />
            </Button>
          </Header>
          <Content>
            <ScrollView  style={styles.root}>
              <View style={styles.container}>
                <Image source={jonthebeachImg} style={styles.buttonImage}/>
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
