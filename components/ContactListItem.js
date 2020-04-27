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

export default function ContactListItem({ name, avatar, phone, onPress }) {
  return (
    <TouchableHighlight
      underlayColor={colors.grey}
      style={styles.container}
      onPress={onPress}
    >
      <View style={styles.contactInfo}>
        <Image style={styles.avatar} />
        <View style={styles.details}>
          <Text style={[styles.title]}>{name}</Text>
          <Text style={styles.subtitle}>{phone}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
}

ContactListItem.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    borderWidth: 8,
    borderColor: 'white',
    backgroundColor: 'lightgrey'
  },
  contactInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
    paddingRight: 24,
    paddingBottom: 16,
    borderBottomColor: colors.grey,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  avatar: {
    backgroundColor: "darkgrey",
    borderRadius: 44,
    borderWidth: 1,
    borderColor: 'black',
    width: 40,
    height: 40
  },
  details: {
    justifyContent: "center",
    flex: 1,
    marginLeft: 30
  },
  title: {
    color: colors.black,
    fontWeight: "bold",
    fontSize: 20
  },
  subtitle: {
    color: colors.black,
    fontSize: 15,
    marginTop: 10
  }
});
