import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import db from "../database/db";

class FlatListDemo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
    };

    this.arrayholder = [];
  }

  async componentDidMount() {
    this.setState({ loading: true });
    var results = await db.getAllContacts();
    const data = results.rows;

    this.setState({
          data,
          error: false,
          loading: false,
        });
    this.arrayholder = data;
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  };

  searchFilterFunction = text => {
    this.setState({
      value: text,
    });

    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.name.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    });
  };

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Search..."
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.value}
      />
    );
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <FlatList  
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem style = {{backgroundColor : 'grey', borderWidth: 10, borderColor: 'white'}}
           //badge = {{color: 'grey'}}
           chevron={{ color: 'grey' }}
              leftAvatar={{ backgroundColor:"darkgrey", borderColor: 'black', borderWidth: 1}}
              title={`${item.name}`}
              containerStyle={{backgroundColor:"lightgrey"}}
              subtitle={item.description}
              onPress={() =>
                  this.props.navigation.navigate("Profile", { contact: item})}
            />
          )}
          keyExtractor={item => item.contactID}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
        />
      </View>
    );
  }
}

export default FlatListDemo;
