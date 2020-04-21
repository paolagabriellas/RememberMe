import React, { Component } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";

import ContactThumbnail from "../components/ContactThumbnail";
import DetailsListItem from "../components/DetailsListItem";

import { fetchRandomContact } from "../utils/api";
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
    console.log(navigation);

    return {
      title: navigation.state.params.contact.name.split(" ")[0],
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: colors.blue
      }
    };
  };

  async componentDidMount() {
    const contact = await fetchRandomContact();
    this.setState({ contact });
  }

  render() {
    const {
      navigation: {
        state: { params }
      }
    } = this.props;
    console.log(this.props);
    const { contact } = params;
    // const { contact } = this.props.navigation.state.params;
    const { avatar, name, email, phone, cell } = contact;

    return (
      <ScrollView style={styles.container}>
        <View style={styles.avatarSection}>
          <ContactThumbnail avatar={avatar} name={name} phone={phone} />
        </View>
        <View style={styles.detailsSection}>
          <DetailsListItem icon="portrait" title="Appearance" subtitle="Appearance Description" />
          <DetailsListItem icon="mood" title="Demeanor" subtitle="Demeanor Description" />
          <DetailsListItem icon="favorite" title="Interests" subtitle="Interest 1, Interest 2" />
          <DetailsListItem icon="map" title="First Met At (Location)" subtitle="Location" />
          <DetailsListItem icon="event" title="First Met (Date)" subtitle="MM//DD/YY" />
          <DetailsListItem icon="cake" title="Birthday" subtitle="MM//DD/YY" />
          <DetailsListItem icon="work" title="Job" subtitle="Job Text" />
          <DetailsListItem icon="school" title="Major" subtitle="Major Text" />
          <DetailsListItem icon="description" title="Other" subtitle="Here goes extra information" />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  avatarSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.blue
  },
  detailsSection: {
    flex: 1,
    backgroundColor: "white"
  }
});