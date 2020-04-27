import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import DB from "../database/db";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import db from '../database/db';
import {Dimensions} from 'react-native';


export default class ContactAddScreen extends Component {
  static navigationOptions = {
    title: 'Add Contact',
  };

  constructor(){
    super();
    this.state = {
        name: '',
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
        id: '',
        isLoading: false,
    };
}

updateTextInput = (text, field) => {
    const state = this.state;
    state[field] = text;
    this.setState(state);
}

saveContact(){
    this.setState({
        isLoading: true,
    });
    getId = DB.createContact(this.state.name, this.state.appearance, this.state.demeanor, this.state.interests, this.state.firstMetAt, this.state.firstMetDate, this.state.birthday, this.state.major, this.state.job, this.state.description, this.state.other, 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png').then((result) => {
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

    this.setState({
        id: getId
    });
}
    

  render() {
      if (this.state.isLoading){
        return(
            <View style={styles.activity}>
              <ActivityIndicator size="large" color="black"/>
            </View>
            
          )
        }
        return(
            <View style={styles.centeredView}>
               
            <ScrollView style={styles.container}>
             <View style={{
            width: Dimensions.get('window').width*0.6,
            height: Dimensions.get('window').height * 0.02}}></View>
        <Input
            color = 'black'
            placeholder="Name"
            placeholderTextColor= 'black'
            textAlign = 'left'
            opacity = {0.4}
            padding = {10}
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
            placeholderTextColor= 'black'
                  textAlign = 'left'
                  opacity = {0.4}
                padding = {10}
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
        placeholderTextColor= 'black'
                  textAlign = 'left'
                  opacity = {0.4}
                padding = {10}
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
            placeholderTextColor= 'black'
                  textAlign = 'left'
                  opacity = {0.4}
                padding = {10}
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
            placeholderTextColor= 'black'
                  textAlign = 'left'
                  opacity = {0.4}
                padding = {10}
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
            placeholderTextColor= 'black'
                  textAlign = 'left'
                  opacity = {0.4}
                padding = {10}
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
            placeholderTextColor= 'black'
                  textAlign = 'left'
                  opacity = {0.4}
                padding = {10}
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
            placeholderTextColor= 'black'
                  textAlign = 'left'
                  opacity = {0.4}
                padding = {10}
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
            placeholderTextColor= 'black'
                  textAlign = 'left'
                  opacity = {0.4}
                padding = {10}
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
            placeholderTextColor= 'black'
                  textAlign = 'left'
                  opacity = {0.4}
                padding = {10}
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
        placeholderTextColor= 'black'
        textAlign = 'left'
        opacity = {0.4}
      padding = {10}
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


      <View >
        <Button
      buttonStyle={{
        backgroundColor:'#e91e63'
      }}
          large
          title='Save'
          onPress={() => this.saveContact()} />
      </View>
    </ScrollView>
    </View>
        );
      
  }
}

const styles = StyleSheet.create({
    container: {
        margin: 30,
        backgroundColor: "white",
        borderRadius: 10,
        borderWidth: 15,
        borderColor: 'grey',
        padding: 25,
    },
    subContainer: {
      flex: 0,
      marginBottom: 10,
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
        marginTop: 12
      },

      Button: {
          backgroundColor: 'red'
      }

  })