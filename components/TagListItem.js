import React from "react";
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Text,
  Button,
  Image
} from "react-native";
import PropTypes from "prop-types";

import colors from "../utils/colors";

export default function TagListItem({ location, onPress }) {
  return (
    <TouchableHighlight
      underlayColor={colors.grey}
      style={styles.touchable}
      onPress={onPress}
    >
      <View style={styles.view}>
          <Text style={styles.text}>{location}</Text>
      </View>
    </TouchableHighlight>
  );
}

TagListItem.propTypes = {
  location: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    borderRadius: 23,
    borderWidth: 2,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 16,
    paddingRight: 16
  },
  touchable: {
    marginLeft: 4,
    marginRight: 4,
    marginBottom: 8
  },
  image: {
    marginRight: 8
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    fontSize: 16
  }
});