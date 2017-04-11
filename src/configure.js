/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Container, Header, Title, Content, List, ListItem, InputGroup, Input, Icon, Text, Picker, Button, Footer} from 'native-base';
import Routes from './routes';

const Item = Picker.Item;

export default class Configure extends Component {

  constructor(props) {
        super(props);
        this.state = {
            selectedItem: undefined,
            selected1: 'key0',
            results: {
                items: [],
            },
        };
    }
    onValueChange(value: string) {
        this.setState({
            selected1: value,
        });
    }
    render() {
        return (
            <Container style={styles.root}>
                <Header style={{backgroundColor: 'rgba(255, 255, 255, 0.1)'}}>
                  <Button transparent>
                      <Icon name='ios-arrow-dropleft' />
                  </Button>
                  <Title style={{color: 'rgba(255, 255, 255, 0.6)'}}>Settings</Title>
                  <Button transparent>
                      <Icon name='ios-checkmark-circle-outline' />
                  </Button>
                </Header>
                <Content>
                  <List>
                        {/*
                          <ListItem iconLeft>
                            <InputGroup>
                                <Icon name='ios-home' style={{color:'#a7da1c'}}/>
                                <Input placeholder='Valo Host'/>
                            </InputGroup>
                            </ListItem>
                            <ListItem iconLeft>
                              <InputGroup>
                                  <Icon name='ios-home' style={{color:'#a7da1c'}}/>
                                  <Input placeholder='Valo Tenant'/>
                              </InputGroup>
                            </ListItem>
                          */}
                          {/*
                            <ListItem iconLeft>
                            <InputGroup>
                            <Icon name="ios-man-outline" style={{ color: '#a7da1c' }} />
                            <Input placeholder='Username'/>
                            </InputGroup>
                            </ListItem>
                            */}
                        <ListItem iconLeft>
                            <Icon name="ios-transgender-outline" style={{ color: '#a7da1c' }} />
                            <Text style={styles.text}>Gender</Text>
                            <Picker
                              iosHeader="Select one"
                              mode="dialog"
                              selectedValue={this.state.selected1}
                              onValueChange={this.onValueChange.bind(this)} >
                                <Item label="Male" value="key0" />
                                <Item label="Female" value="key1" />
                                <Item label="Other" value="key2" />
                            </Picker>
                        </ListItem>
                        <ListItem iconLeft>
                            <Icon name="ios-globe-outline" style={{ color: '#a7da1c' }} />
                            <Text style={styles.text}>Country</Text>
                            <Picker
                              iosHeader="Select one"
                              mode="dialog"
                              selectedValue={this.state.selected1}
                              onValueChange={this.onValueChange.bind(this)} >
                                <Item label="Vegan" value="key0" />
                                <Item label="Vegetarian" value="key1" />
                                <Item label="Carnivor" value="key2" />
                            </Picker>
                        </ListItem>
                        <ListItem iconLeft>
                              <Icon name="ios-people-outline" style={{ color: '#a7da1c' }} />
                              <Text style={styles.text}>Company</Text>
                              <Picker
                                iosHeader="Select one"
                                mode="dialog"
                                selectedValue={this.state.selected1}
                                onValueChange={this.onValueChange.bind(this)} >
                                  <Item label="Google" value="key0" />
                                  <Item label="Microsoft" value="key1" />
                                  <Item label="Piksel" value="key1" />
                                  <Item label="Ebury" value="key1" />
                                  <Item label="Other" value="key2" />
                              </Picker>
                        </ListItem>
                        <ListItem iconLeft>
                              <Icon name="ios-laptop" style={{ color: '#a7da1c' }} />
                              <Text style={styles.text}>Role</Text>
                              <Picker
                                iosHeader="Select one"
                                mode="dialog"
                                selectedValue={this.state.selected1}
                                onValueChange={this.onValueChange.bind(this)} >
                                  <Item label="Analyst" value="analyst" />
                                  <Item label="Data Science" value="data_science" />
                                  <Item label="Developer" value="developer" />
                                  <Item label="QA" value="qa" />
                                  <Item label="UX" value="ux" />
                                  <Item label="Designer" value="designer" />
                              </Picker>
                        </ListItem>
                        <ListItem iconLeft>
                            <Icon name="ios-nutrition-outline" style={{ color: '#a7da1c' }} />
                            <Text style={styles.text}>Diet</Text>
                            <Picker
                              iosHeader="Select Diet"
                              style={styles.picker}
                              itemStyle={styles.text}
                              selectedValue={this.state.selected1}
                              onValueChange={this.onValueChange.bind(this)} >
                                <Item color="#a7da1c" label="All (yep, worms too)" value="All" />
                                <Item color="rgba(255, 255, 255, .4)" label="All (no worms please)" value="almost" />
                                <Item color="rgba(255, 255, 255, .4)" label="Developertarian (Coffe, Pizza and Soda)" value="Developertarian" />
                                <Item color="rgba(255, 255, 255, .4)" label="Kosher" value="Kosher" />
                                <Item color="rgba(255, 255, 255, .4)" label="Vegetarian" value="Vegetarian" />
                                <Item color="rgba(255, 255, 255, .4)" label="Vegan" value="Vegan" />
                                <Item color="rgba(255, 255, 255, .4)" label="Raw" value="Raw" />
                                <Item color="rgba(255, 255, 255, .4)" label="Fruitarian" value="Fruitarian" />
                                <Item color="rgba(255, 255, 255, .4)" label="Paleotarian" value="Paleotarian" />
                                <Item color="rgba(255, 255, 255, .4)" label="Pescatarian" value="Pescatarian" />
                                <Item color="rgba(255, 255, 255, .4)" label="Pollotarian" value="Pollotarian" />
                                <Item color="rgba(255, 255, 255, .4)" label="Flexitarian" value="Flexitarian" />
                            </Picker>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        );
    }
};

const styles = {
  root: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'rgba(36, 37, 38, 1)'
  },
  text: {
    color: 'rgba(255, 255, 255, .4)'
  },
  picker: {
    backgroundColor: 'red'
  }
};
