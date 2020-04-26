import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import DB from "../database/db";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import db from '../database/db';

export default class ContactEditScreen extends Component {
  static navigationOptions = {
    title: 'Edit Contact',
  };

  constructor(){
    const { navigation } = this.props;

    super();
    this.state = {
        name: navigation.getParam('contact').name,
        description: '', 
        appearance: '',
        demeanor: '',
        interests: '',
        firstMetAt: '',
        firstMetDate: '',
        birthday: '',
        job: '',
        major: '',
        other: '',
        isLoading: false,
    };
}

componentDidMount() {
  const { navigation } = this.props;
  db.getContact(navigation.getParam('contactID')).then((data) => {
    console.log(data);
    const contact = data;
    this.setState({
        name: contact.name,
        description: contact.description,
        appearance: contact.appearance,
        demeanor: contact.demeanor,
        interests: contact.interests,
        firstMetAt: contact.firstMetAt,
        firstMetDate: contact.firstMetDate,
        birthday: contact.birthday,
        job: contact.job,
        major: contact.major,
        other: contact.other,
        isLoading: false,
    });    
  }).catch((err) => {
      console.log(err);
      this.setState = {
          isLoading: false
      }
  })
}

updateTextInput = (text, field) => {
    const state = this.state
    state[field] = text;
    this.setState(state);
}

updateContact(){
    this.setState({
        isLoading: true,
    });
    
    const { navigation } = this.props;


    DB.updateContact(navigation.state.params.contactID, this.state.name, this.state.appearance, this.state.demeanor, this.state.interests, this.state.firstMetAt, this.state.firstMetDate, this.state.birthday, this.state.major, this.state.job, this.state.description, this.state.other, 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png').then((result) => {
        console.log(result);
        this.setState({
            isLoading: false,
            id: result.insertID,
        });
        this.props.navigation.state.params.onNavigateBack;
        this.props.navigation.goBack();
    }).catch((err) => {
        console.log(err);
        this.setState({
            isLoading: false,
        });
    })
}

render() {
    if (this.state.isLoading){
      return(
          <View style={styles.activity}>
            <ActivityIndicator size="large" color="#0000ff"/>
          </View>
        )
      }
      return(
          <View style={styles.centeredView}>

          <ScrollView style={styles.container}>
      <Input
          placeholder="Name"
          value={this.state.name}
          onChangeText={(text) => this.updateTextInput(text, 'name')}
          leftIcon={
              <Icon
                name='user'
                size={24}
                color='black'
              />
            }
      />
    <Input
          placeholder='Description'
          value={this.state.description}
          onChangeText={(text) => this.updateTextInput(text, 'description')}
          leftIcon={
              <Icon
                name='question-circle'
                size={24}
                color='black'
              />
            }
      />
    
    <Input
      placeholder='Appearance'
      value={this.state.appearance}
      onChangeText={(text) => this.updateTextInput(text, 'appearance')}
      leftIcon={
          <Icon
          name='eye'
          size={15}
          color='black'
          />
      }
  />

      <Input
          placeholder='Demeanor'
          value={this.state.demeanor}
          onChangeText={(text) => this.updateTextInput(text, 'demeanor')}
          leftIcon={
          <Icon
              name='smile-o'
              size={15}
              color='black'
          />
          }
      />

      <Input
          placeholder='Interests'
          value={this.state.interests}
          onChangeText={(text) => this.updateTextInput(text, 'interests')}
          leftIcon={
          <Icon
              name='heart-o'
              size={15}
              color='black'
          />
          }
      />

      <Input
          placeholder='First Met At'
          value={this.state.firstMetAt}
          onChangeText={(text) => this.updateTextInput(text, 'firstMetAt')}
          leftIcon={
          <Icon
              name='map-marker'
              size={15}
              color='black'
          />
          }
      />

      <Input
          placeholder='First Met'
          value={this.state.firstMetDate}
          onChangeText={(text) => this.updateTextInput(text, 'firstMetDate')}
          leftIcon={
          <Icon
              name='calendar'
              size={15}
              color='black'
          />
          }
      />

      <Input
          placeholder='Birthday'
          value={this.state.birthday}
          onChangeText={(text) => this.updateTextInput(text, 'birthday')}
          leftIcon={
          <Icon
              name='birthday-cake'
              size={15}
              color='black'
          />
          }
      />

      <Input
          placeholder='Job'
          value={this.state.job}
          onChangeText={(text) => this.updateTextInput(text, 'job')}
          leftIcon={
          <Icon
              name='briefcase'
              size={15}
              color='black'
          />
          }
      />

      <Input
          placeholder='Major'
          value={this.state.major}
          onChangeText={(text) => this.updateTextInput(text, 'major')}
          leftIcon={
          <Icon
              name='graduation-cap'
              size={15}
              color='black'
          />
          }
      />

      <Input
          placeholder='Other'
          value={this.state.other}
          onChangeText={(text) => this.updateTextInput(text, 'other')}
          leftIcon={
          <Icon
              name='reorder'
              size={15}
              color='black'
          />
          }
      />


    <View style={styles.button}>
      <Button
        large
        leftIcon={{name: 'save'}}
        title='Update'
        onPress={() => this.updateContact()} />
    </View>
  </ScrollView>
  </View>
      );
    
}
}

const styles = StyleSheet.create({
  container: {
      margin: 0,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 30,
      width: 300,
      height: 400,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
  },
  subContainer: {
    flex: 1,
    marginBottom: 20,
    padding: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#CCCCCC',
  },
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },

})