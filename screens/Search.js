import React from 'react';
import { SafeAreaView } from 'react-native';
import FlatListDemo from "../components/SearchableList";

import { MaterialIcons } from "@expo/vector-icons";
import colors from "../utils/colors";


export default class Search extends React.Component{
    static navigationOptions = navData => ({
        title: "Search"
        });


    render() {
        return(
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <FlatListDemo navigation = {this.props.navigation}/>
            </SafeAreaView>
        )
    }
}
