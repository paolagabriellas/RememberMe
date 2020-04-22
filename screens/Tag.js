import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import ContactListItem from "../components/ContactListItem";

import db from "../database/db";
import colors from "../utils/colors";

export default class Tag extends React.Component {
  static navigationOptions = ({navigation}) => {
  //console.log(navigation);
    return {
    title: navigation.state.params.tag.name,
    headerLeft:() => (
      <MaterialIcons
        name="home"
        size={24}
        style={{ color: colors.black }}
        onPress={() =>
          navigation.navigate("Tags")
          }
      />
    )
    };
  };

  state = {
    contacts: [],
    loading: true,
    error: false,
    arecontacts : true
  };

  async componentDidMount() {

    //console.log(this.props.navigation.state.params.tag);
    var tag = this.props.navigation.state.params.tag;
    //console.log(tag);
    try {
      var allcontacts = await db.getAllContactsWithTag(tag.tagID);
      const contacts = allcontacts.rows;
      //console.log(contacts);
      if(!contacts.length)
      {
        this.setState({arecontacts: false});
      }

      this.setState({
        contacts,
        loading: false,
        error: false
      });
    } catch (e) {
      this.setState({
        loading: false,
        error: true
      });
      console.log(e);
    }
  }

  renderContact = ({ item }) => {
    const {
      navigation: { navigate }
    } = this.props;
    //const { id, name, avatar, phone } = item;

    return (
      <ContactListItem
        name={item.name}
        avatar={item.imagePath}
        phone={item.description}
        onPress={() =>
          this.props.navigation.navigate("Profile", {
            contact: item
          })
        }
      />
    );
  };

  render() {
    const { loading, contacts, error, arecontacts } = this.state;

    //const contactsSorted = contacts.sort((a, b) =>
    //  a.name.localeCompare(b.name)
   // );

    return (
      <View style={styles.container}>
        {loading && <ActivityIndicator size="large" />}
        {error && <Text>Error...</Text>}
        {!arecontacts && <Text>No contacts have that tag. Please try again.</Text>}
        {!loading && !error && arecontacts && (
           <FlatList
            data={contacts}
            keyExtractor={item=>item.itemID}
            renderItem={this.renderContact}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    justifyContent: "center",
    flex: 1
  }
});
