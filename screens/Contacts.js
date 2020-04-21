import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import ContactListItem from '../components/ContactListItem';
import db from "../database/db";
//import {DBTest} from "../database/dbTests";


export default class Contacts extends React.Component {
  state = {
    contacts: [],
    loading: true,
    error: false,
  };

  async componentDidMount() {
    //TODO: REMOVE THIS - TESTING PURPOSES fOR DB
    //console.log("Before database tests");
    //DBTest.doAllTests();


    try {

      var tempresult = db.createContact("John Test", "", "", "", "", "", "", "", "", "my friend John!", "", "");
      var result = await db.getAllContacts();
      //const contacts = await db.getAllContacts();
      const contacts = result.rows;
      //const contacts = allcontsarray.map(mapContact);

      this.setState({
        contacts,
        loading: false,
        error: false,
      });
    } catch (e) {
      this.setState({
        loading: false,
        error: true,
      });
      console.log(e);
    }
  }

  renderContact = ({ item }) => {
    const { navigation: { navigate }} = this.props;
    //const { name, avatar, phone } = item;

    return(
        <ContactListItem
        name = {item.name}
        avatar = {item.imagePath}
        phone = {item.description}
        onPress ={() => navigate('Profile')}
        />
    );
  };

  render() {
    const { loading, contacts, error } = this.state;

    //const contactsSorted = contacts.sort((a, b) =>
     // a.name.localeCompare(b.name));

    return (
      <View style={styles.container}>
        {loading && <ActivityIndicator size="large" />}
        {error && <Text>Error!</Text>}
        {!loading &&
          !error && (
            <FlatList
              data={contacts}
              keyExtractor={item => item.contactID}
              renderItem={this.renderContact}
            />
          )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    flex: 1,
  },
});
