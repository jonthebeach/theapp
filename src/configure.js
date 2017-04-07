/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Container, Content, List, ListItem, InputGroup, Input, Icon, Text, Picker, Button } from 'native-base';
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
            <Container>
                <Content>
                  <InputGroup>
                      <Icon name='ios-home' style={{color:'#a7da1c'}}/>
                      <Input placeholder='Valo Host'/>
                  </InputGroup>
                  <InputGroup>
                      <Icon name='ios-home' style={{color:'#a7da1c'}}/>
                      <Input placeholder='Valo Tenant'/>
                  </InputGroup>
                  <InputGroup>
                      <Icon name='ios-home' style={{color:'#a7da1c'}}/>
                      <Input placeholder='Username'/>
                  </InputGroup>
                  <InputGroup>
                      <Icon name='ios-home' style={{color:'#a7da1c'}}/>
                      <Input placeholder='Company'/>
                  </InputGroup>
                  <Picker
                    iosHeader="Select one"
                    mode="dropdown"
                    selectedValue={this.state.selected1}
                    onValueChange={this.onValueChange.bind(this)} >
                      <Item label="Male" value="key0" />
                      <Item label="Female" value="key1" />
                      <Item label="Other" value="key2" />
                  </Picker>
                  <List>
                        <ListItem iconLeft>
                            <Icon name="ios-transgender" style={{ color: '#a7da1c' }} />
                            <Text>Role</Text>
                            <Picker
                              iosHeader="Select one"
                              mode="dropdown"
                              selectedValue={this.state.selected1}
                              onValueChange={this.onValueChange.bind(this)} >
                                <Item label="Male" value="key0" />
                                <Item label="Female" value="key1" />
                                <Item label="Other" value="key2" />
                            </Picker>
                        </ListItem>
                        <ListItem iconLeft>
                            <Icon name="ios-transgender" style={{ color: '#0A69FE' }} />
                            <Text>Country</Text>
                            <Picker
                              iosHeader="Select one"
                              mode="dropdown"
                              selectedValue={this.state.selected1}
                              onValueChange={this.onValueChange.bind(this)} >
                                <Item label="Male" value="key0" />
                                <Item label="Female" value="key1" />
                                <Item label="Other" value="key2" />
                            </Picker>
                        </ListItem>
                        <ListItem iconLeft>
                            <Icon name="ios-transgender" style={{ color: '#0A69FE' }} />
                            <Text>Gender</Text>
                            <Picker
                              iosHeader="Select one"
                              mode="dropdown"
                              selectedValue={this.state.selected1}
                              onValueChange={this.onValueChange.bind(this)} >
                                <Item label="Male" value="key0" />
                                <Item label="Female" value="key1" />
                                <Item label="Other" value="key2" />
                            </Picker>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        );
    }
}
