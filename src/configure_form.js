/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {View, DatePickerAndroid} from 'react-native';
import { Container, Header, Title, Content, List, ListItem, InputGroup, Input, Icon as IconBase, Text, Picker, Button, Footer} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  goBack,
  convertDate,
  toDateType,
  fromValoDate,
  toValoDate,
  getContributorInstance,
  saveContributorInstance,
  getContributorID,
  getValoHost,
  getValoTenant
} from './utils';
import Routes from './routes';

const Item = Picker.Item;

export default class Configure extends Component {

  constructor(props) {
        super(props);
        this.state = {
            selectedGender: '',
            selectedCountry: '',
            selectedCompany: '',
            selectedRole: '',
            selectedDiet: '',
            birthday: '',
            date: new Date()
        };
    }

    async componentDidMount(){
      const id = await getContributorID();
      const host = await getValoHost();
      const tenant = await getValoTenant();
      const contributor = await getContributorInstance(id, host, tenant);
      if(!contributor) return;
      this.setState({
        selectedGender: contributor.data.gender ? contributor.data.gender : '',
        selectedCountry: contributor.data.country ? contributor.data.country : '',
        selectedCompany: contributor.data.company ? contributor.data.company : '',
        selectedRole: contributor.data.role ? contributor.data.role : '',
        selectedDiet: contributor.data.diet ? contributor.data.diet : '',
        birthday: contributor.data.birthday ? fromValoDate(contributor.data.birthday) : '',
        date:  contributor.data.birthday ? toDateType(fromValoDate(contributor.data.birthday)) : new Date()
      })
    }

    onValueChange(value) {
      this.setState(value);
    }

    async _showPicker(options) {
      try {
        const newDateState = {};
        const {action, year, month, day} = await DatePickerAndroid.open({date: options.date, mode: 'spinner', minDate: new Date(1950, 0, 1), maxDate: new Date(1999, 4, 19)});
        if (action !== DatePickerAndroid.dismissedAction) {
          const date = new Date(year, month, day);
          newDateState['birthday'] = convertDate(date);
          newDateState['date'] = date;
        }
        this.setState(newDateState);
      } catch ({code, message}) {
        console.warn(`Error in example '${stateKey}': `, message);
      }
    };

    _back(){
      return goBack(this.props.navigator);
    }

    _getContributorDocument(id){
      const contributorDoc = {
        "contributor": id
      };
      if(this.state.selectedGender)
        contributorDoc.gender = this.state.selectedGender;
      if(this.state.birthday)
        contributorDoc.birthday = toValoDate(this.state.birthday);
      if(this.state.selectedCountry)
        contributorDoc.country = this.state.selectedCountry;
      if(this.state.selectedCompany)
        contributorDoc.company = this.state.selectedCompany;
      if(this.state.selectedRole)
        contributorDoc.role = this.state.selectedRole;
      if(this.state.selectedDiet)
        contributorDoc.diet = this.state.selectedDiet;
      return contributorDoc;
    }

    async _save(){
      const id = await getContributorID();
      const host = await getValoHost();
      const tenant = await getValoTenant();
      const contributor = await getContributorInstance(id, host, tenant);
      if(!contributor){
        return;// this.moveToValoView();
      }
      const doc = this._getContributorDocument(id);
      console.log('saving', contributor, doc)
      await saveContributorInstance(id, doc, contributor.version, host, tenant);
    }

    render() {
        return (
            <Container style={styles.root}>
                <Header style={styles.header}>
                  <Button onPress={this._back.bind(this)} transparent>
                      <IconBase name='ios-arrow-dropleft' />
                  </Button>
                  <Title style={styles.headerTitle}>Configure Settings</Title>
                  <Button transparent onPress={this._save.bind(this)}>
                      <IconBase name='ios-checkmark-circle-outline' />
                  </Button>
                </Header>
                <Content>
                  <List style={styles.list}>
                        <ListItem style={styles.listItem}>
                          <View style={styles.itemContainer}>
                            <View style={styles.labelContainer}>
                              <IconBase name="ios-transgender-outline" style={{ color: '#a7da1c' }} />
                              <Text style={styles.text}>Gender</Text>
                            </View>
                            <Picker
                              iosHeader="Select one"
                              style={styles.picker}
                              selectedValue={this.state.selectedGender}
                              onValueChange={(value) => this.onValueChange.bind(this)({'selectedGender':value})} >
                                <Item label="Select Gender ..." value="" />
                                <Item label="Male" value="male" />
                                <Item label="Female" value="female" />
                            </Picker>
                          </View>
                        </ListItem>
                        <ListItem style={styles.listItem}>
                          <View style={styles.itemContainer}>
                            <View style={styles.labelContainer}>
                              <Icon
                                style={{marginRight: 2}}
                                name="birthday-cake"
                                size={22}
                                color="#a7da1c" />
                              <Text style={styles.text}>Age</Text>
                            </View>
                            <View>
                            <Text
                              onPress={this._showPicker.bind(this, {date: this.state.date})}
                              style={{color:"#a7da1c", marginRight: this.state.birthday ? 80 : 48, fontFamily: 'sans-serif-light'}}>{this.state.birthday || "Select Birthday ..."}</Text>
                            </View>
                          </View>
                        </ListItem>
                        <ListItem style={styles.listItem}>
                          <View style={styles.itemContainer}>
                            <View style={styles.labelContainer}>
                              <IconBase name="ios-globe-outline" style={{ color: '#a7da1c' }} />
                              <Text style={styles.text}>Country</Text>
                            </View>
                            <Picker
                              iosHeader="Select one"
                              style={styles.picker}
                              selectedValue={this.state.selectedCountry}
                              onValueChange={(value) => this.onValueChange.bind(this)({'selectedCountry':value})} >
                                <Item label="Select Country ..." value="" />
                                <Item label="Canada" value="canada" />
                                <Item label="Germany" value="germany" />
                                <Item label="Spain" value="spain" />
                                <Item label="UK" value="uk" />
                                <Item label="US" value="us" />
                            </Picker>
                          </View>
                        </ListItem>
                        <ListItem style={styles.listItem}>
                          <View style={styles.itemContainer}>
                            <View style={styles.labelContainer}>
                              <IconBase name="ios-people-outline" style={{ color: '#a7da1c' }} />
                              <Text style={styles.text}>Company</Text>
                            </View>
                            <Picker
                              iosHeader="Select one"
                              style={styles.picker}
                              selectedValue={this.state.selectedCompany}
                              onValueChange={(value) => this.onValueChange.bind(this)({'selectedCompany':value})} >
                                <Item label="Select Company ..." value="" />
                                <Item label="Google" value="google" />
                                <Item label="Microsoft" value="microsoft" />
                                <Item label="Piksel" value="piksel" />
                                <Item label="Ebury" value="ebury" />
                                <Item label="Other" value="other" />
                            </Picker>
                          </View>
                        </ListItem>
                        <ListItem style={styles.listItem}>
                          <View style={styles.itemContainer}>
                            <View style={styles.labelContainer}>
                              <IconBase name="ios-laptop" style={{ color: '#a7da1c' }} />
                              <Text style={styles.text}>Role</Text>
                            </View>
                            <Picker
                              iosHeader="Select one"
                              style={styles.picker}
                              selectedValue={this.state.selectedRole}
                              onValueChange={(value) => this.onValueChange.bind(this)({'selectedRole':value})} >
                                <Item label="Select Role ..." value="" />
                                <Item label="Analyst" value="analyst" />
                                <Item label="Data Science" value="data_science" />
                                <Item label="Developer" value="developer" />
                                <Item label="QA" value="qa" />
                                <Item label="UX" value="ux" />
                                <Item label="Designer" value="designer" />
                                <Item label="Other" value="other" />
                            </Picker>
                          </View>
                        </ListItem>
                        <ListItem style={styles.listItem}>
                          <View style={styles.itemContainer}>
                            <View style={styles.labelContainer}>
                              <IconBase name="ios-nutrition-outline" style={{ color: '#a7da1c' }} />
                              <Text style={styles.text}>Diet</Text>
                            </View>
                            <Picker
                              iosHeader="Select Diet"
                              style={styles.picker}
                              selectedValue={this.state.selectedDiet}
                              onValueChange={(value) => this.onValueChange.bind(this)({'selectedDiet':value})} >
                                <Item label="Select Diet ..." value="" />
                                <Item label="All (yep, worms too)" value="All" />
                                <Item label="All (no worms please)" value="almost" />
                                <Item label="Devetarian (Coffe, Pizza and Soda)" value="Developertarian" />
                                <Item label="Kosher" value="Kosher" />
                                <Item label="Vegetarian" value="Vegetarian" />
                                <Item label="Vegan" value="Vegan" />
                                <Item label="Raw" value="Raw" />
                                <Item label="Fruitarian" value="Fruitarian" />
                                <Item label="Paleotarian" value="Paleotarian" />
                                <Item label="Pescatarian" value="Pescatarian" />
                                <Item label="Pollotarian" value="Pollotarian" />
                                <Item label="Flexitarian" value="Flexitarian" />
                                <Item label="Other" value="other" />
                            </Picker>
                          </View>
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
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    fontSize: 16,
    color: 'rgba(255, 255, 255, .4)'
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelContainer:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  picker: {
    color: '#a7da1c',
    maxWidth: 160,
    width: 160
  },
  list: {
    margin: 0,
    paddingLeft: 0
  },
  listItem: {
    borderBottomWidth: 1,
    borderColor:'rgba(255, 255, 255, .1)',
    marginRight: 15,
    paddingLeft: 0
  },
  header: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)'
  },
  headerTitle:{
    fontSize: 17,
    color: 'rgba(255, 255, 255, 0.5)'
  }
};
