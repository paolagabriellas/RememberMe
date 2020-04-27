import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text,
  ColorPropType
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import PropTypes from "prop-types";

import colors from "../utils/colors";

export default function ContactThumbnail({
  name,
  phone,
  avatar,
  textColor,
  onPress
}) {
  const colorStyle = { color: textColor };
  const ImageComponent = onPress ? TouchableOpacity : View;

  return (
    <View style={styles.container}>
      <ImageComponent onPress={onPress}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
      </ImageComponent>
      {name !== "" && <Text style={[styles.name, colorStyle]}>{name}</Text>}
      {phone !== "" && <Text style={[styles.phone, colorStyle]}>{phone}</Text>}
    </View>
  );
}

ContactThumbnail.propTypes = {
  name: PropTypes.string,
  avatar: PropTypes.string,
  phone: PropTypes.string,
  textColor: ColorPropType,
  onPress: PropTypes.func
};

ContactThumbnail.defaultProps = {
  name: "",
  phone: "",
  textColor: "black",
  onPress: null
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    marginHorizontal: 15,
    alignItems: "center",
    justifyContent: "center"
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderColor: "black",
    backgroundColor: "grey",
    borderWidth: 2
  },
  name: {
    fontSize: 20,
    marginTop: 24,
    marginBottom: 2,
    fontWeight: "bold"
  },
  phoneSection: {
    flexDirection: "row",
    marginTop: 4,
    alignItems: "center",
    justifyContent: "center"
  },
  phone: {
    marginLeft: 4,
    fontSize: 16,
    fontWeight: "bold"
  }
});
