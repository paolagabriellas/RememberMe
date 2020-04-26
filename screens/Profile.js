import React, { Component } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { Button } from 'react-native-elements';
import db from '../database/db';

import ContactThumbnail from "../components/ContactThumbnail";
import DetailsListItem from "../components/DetailsListItem";
import { MaterialIcons } from "@expo/vector-icons";

//import { fetchRandomContact } from "../utils/api";
import colors from "../utils/colors";

export default class Profile extends Component {
  // render() {
  //   console.log(this.props);
  //   return (
  //     <View>
  //       <Text>Hi</Text>
  //     </View>
  //   );
  // }

  static navigationOptions = ({ navigation }) => {
    //console.log(navigation);

    return {
      title: navigation.state.params.contact.name,
      headerTintColor: "white",
      headerRight: (
        <MaterialIcons
        name="settings"
        size={32}
        style={{ color: colors.white }}
        onPress={() => {
          navigation.navigate('EditContact', {
            contactID: navigation.state.params.contact.contactID
          });
        }}
      />
      ),
      headerStyle: {
        backgroundColor: colors.blue
      }
    
    };
  };

  async componentDidMount() {
    const contact = this.params;
    // console.log(contact);
    this.setState({ contact });
  }

  deleteContact(id) {
    const {
      navigation: {
        state: { params }
      }
    } = this.props;

    db.deleteContact(id);
    this.props.navigation.state.params.onNavigateBack;
    this.props.navigation.goBack();

  }

  // async componentDidUpdate() {
  //   const contact = this.params;
  //   // console.log(contact);
  //   this.setState({ contact });
  // }

  render() {
    const {
      navigation: {
        state: { params }
      }
    } = this.props;
    //console.log(this.props);
    const { contact } = params;
    // const { contact } = this.props.navigation.state.params;
    
    return (
      
      <ScrollView style={styles.container}>
        <View style={styles.avatarSection}>
          <ContactThumbnail avatar={contact.imagePath} name={contact.name} phone={contact.description} />
        </View>
        <View style={styles.detailsSection}>
          <DetailsListItem icon="portrait" title="Appearance" subtitle={contact.appearance} />
          <DetailsListItem icon="mood" title="Demeanor" subtitle={contact.demeanor} />
          <DetailsListItem icon="favorite" title="Interests" subtitle={contact.interests} />
          <DetailsListItem icon="map" title="First Met At (Location)" subtitle={contact.firstMeet} />
          <DetailsListItem icon="event" title="First Met (Date)" subtitle={contact.dateOfMeet} />
          <DetailsListItem icon="cake" title="Birthday" subtitle={contact.birthday} />
          <DetailsListItem icon="work" title="Job" subtitle={contact.job} />
          <DetailsListItem icon="school" title="Major" subtitle={contact.major} />
          <DetailsListItem icon="description" title="Other" subtitle={contact.other} />
          <Button
          large
          leftIcon={{name: 'Delete'}}
          title='Delete'
          onPress={() => this.deleteContact(contact.contactID)} />
        </View>
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.blue,
  },
  detailsSection: {
    flex: 1,
    backgroundColor: 'white',
  },
});
// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   },
//   avatarSection: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: colors.blue
//   },
//   detailsSection: {
//     flex: 1,
//     backgroundColor: "white"
//   }
// });
