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
import TagListItem from "../components/TagListItem";
import colors from "../utils/colors";

export default class Contacts extends React.Component {
  static navigationOptions = navData => ({
    title: "Tags",
    headerLeft: (
      <MaterialIcons
        name="add"
        size={24}
        style={{ color: colors.black }}
      />
    )
  });

  state = {
    tags: [],
    loading: true,
    error: false
  };

  async componentDidMount() {
    try {
      var result = await db.getAllTags();
      const tags = result.rows;


      this.setState({
        tags,
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

    return (
      <TagListItem
        location={item.name}
        color={item.color}
        onPress={() =>
          this.props.navigation.navigate("ClickedTag", { tag:item })
        }
      />
    );
  };

  render() {
    const { loading, tags, error } = this.state;

    const tagsSorted = tags.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    return (
      <View style={styles.container}>
        {loading && <ActivityIndicator size="large" />}
        {error && <Text>Error!</Text>}
        {!loading && !error && (
          <FlatList
            data={tagsSorted}
            keyExtractor={item => item.tagID}
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
