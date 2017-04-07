/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Title, Content, List, ListItem, Badge, Footer, FooterTab, Thumbnail, Text, Button, Icon } from 'native-base';

export default class Talks extends Component {
  render() {
    return (
      <Container>
        <Header style={{backgroundColor: 'rgba(36, 37, 38, 1)'}}>
          <Button transparent>
              <Icon name='ios-menu' />
          </Button>
          <Title>Welcome</Title>
          <Button transparent>
              <Icon name='ios-settings' />
          </Button>
        </Header>
        <Content>
           <List>
               <ListItem>
                   <Thumbnail source={require('../img/play.png')} />
                   <Text>Talk1: Kumar Pratik</Text>
                   <Text note>Doing what you like will always keep you happy . .</Text>
               </ListItem>
               <ListItem>
                   <Thumbnail source={require('../img/play.png')} />
                   <Text>Talk2: John Sanket</Text>
                   <Text note>Life is one time offer! Use it well</Text>
               </ListItem>
               <ListItem>
                   <Thumbnail source={require('../img/play.png')} />
                   <Text>Talk3: Elliot Sanket</Text>
                   <Text note>Life is one time offer! Use it well</Text>
               </ListItem>
               <ListItem>
                   <Thumbnail source={require('../img/play.png')} />
                   <Text>Talk4: Anne Kneth</Text>
                   <Text note>Life is one time offer! Use it well</Text>
               </ListItem>
           </List>
        </Content>
        <Footer style={{backgroundColor: 'rgba(36, 37, 38, 1)'}}>
          <FooterTab>
            <Button transparent>
              You are Attending XXX
            </Button>
            <Button transparent>
                <Icon name="ios-thumbs-up" />
                Yes
            </Button>
            <Button transparent>
                <Icon name="ios-thumbs-down" />
                No
            </Button>
            <Button transparent>

                <Icon name="ios-beer-outline" />
                More
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
