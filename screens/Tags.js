import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import TagListItem from "../components/TagListItem";

import { fetchContacts } from "../utils/api";
import colors from "../utils/colors";

const keyExtractor = ({ phone }) => phone;

export default class Contacts extends React.Component {
  static navigationOptions = navData => ({
    title: "Tags",
    headerLeft: (
      <MaterialIcons
        name="add"
        size={24}
        style={{ color: colors.black }}
      />
    ),
    headerRight: (
      <MaterialIcons
        name="home"
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
      const contacts = await fetchContacts();

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
    }
  }

  renderContact = ({ item }) => {
    const {
      navigation: { navigate }
    } = this.props;
    const { id, name, avatar, phone } = item;

    return (
      <TagListItem
        location={name}
        onPress={() =>
          this.props.navigation.navigate("Tag")
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
        {error && <Text>Error...</Text>}
        {!loading && !error && (
          <FlatList
            data={contactsSorted}
            keyExtractor={keyExtractor}
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