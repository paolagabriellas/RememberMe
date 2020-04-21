import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import db from "../database/db";
import colors from "../utils/colors";
import ContactListItem from "../components/ContactListItem";


export default class Contacts extends React.Component {
  static navigationOptions = navData => ({
    title: "Contacts",
    headerLeft: (
      <MaterialIcons
        name="add"
        size={24}
        style={{ color: colors.black }}
      />
    )
  });

  state = {
    contacts: [],
    loading: true,
    error: false
  };

  async componentDidMount() {


    try {

      var result = await db.getAllContacts();
      //console.log(result);
      const contacts = result.rows;

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
    const { navigation: { navigate }} = this.props;

    return(
        <ContactListItem
        name = {item.name}
        avatar = {item.imagePath}
        phone = {item.description}
        onPress={() =>
          this.props.navigation.navigate("Profile", {
            contact: item
          })
        }
        />
    );
  };

  render() {
    const { loading, contacts, error } = this.state;

    const contactsSorted = contacts.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    return (
      <View style={styles.container}>
        {loading && <ActivityIndicator size="large" />}
        {error && <Text>Error!</Text>}
        {!loading &&
          !error && (
            <FlatList style = {styles.items}
              data={contactsSorted}
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
    backgroundColor: 'gray',
    borderColor: 'white',
    borderWidth: 10,
    justifyContent: 'center',
    alignContent: "space-between",
    flex: 1 ,
    borderBottomWidth: 10,
  },

  items: {
    borderColor: 'white',
    borderBottomWidth: 1
  }
});
