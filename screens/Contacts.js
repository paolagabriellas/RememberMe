import React from "react";
import {
   StyleSheet,
  Alert,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableHighlight,
  ActivityIndicator
} from "react-native";
import db from "../database/db";
import colors from "../utils/colors";
import ContactListItem from "../components/ContactListItem";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import personicon from '../assets/images/robot-dev.png';


export default class Contacts extends React.Component {
  static navigationOptions = navData => ({
    title: "Contacts"
  });

  state = {
    contacts: [],
    loading: true,
    error: false,
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

  async componentDidUpdate() {


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
    const { loading, contacts, error, modalVisible } = this.state;

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

          <TouchableHighlight
            style={styles.openButton}
            onPress={() => {
              this.props.navigation.navigate('AddContact');
            }}
          >
            <Text style={styles.textStyle}>Add Contact</Text>
          </TouchableHighlight>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderColor: 'white',
    justifyContent: 'center',
    alignContent: "space-between",
    flex: 1 ,
  },

  items: {
    borderColor: 'white',
    borderBottomWidth: 1
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 0,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
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
  openButton: {
    backgroundColor: colors.blue,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 3
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
