import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";
// import { StackNavigator, TabNavigator } from "react-navigation";
import { MaterialIcons } from "@expo/vector-icons";

import Favorites from "./screens/Favorites";
import Search from "./screens/Search";

import Contacts from "./screens/Contacts";
import ClickedTag from "./screens/Tag";

import TagsTab from "./screens/Tags";

import Profile from "./screens/Profile";
import User from "./screens/User";

import colors from "./utils/colors";

const getDrawerItemIcon = icon => ({ tintColor }) => (
  <MaterialIcons name={icon} size={22} style={{ color: tintColor }} />
);
const getTabBarIcon = icon => ({ tintColor }) => (
  <MaterialIcons name={icon} size={26} style={{ color: tintColor }} />
);

const ContactScreens = createStackNavigator(
  {
    Contacts: {
      screen: Contacts
    },
    Profile: {
      screen: Profile
    }
  },
  {
    initialRouteName: "Contacts",
    navigationOptions: {
      tabBarIcon: getTabBarIcon("list"),
    //   drawerIcon: getDrawerItemIcon("list")
    }
  }
);

const TagsScreen = createStackNavigator(
    {
      Tags: {
        screen: TagsTab
      },
      ClickedTag: {
        screen: ClickedTag
      }
    },
    {
        initialRouteName: "Tags",
        navigationOptions: {
            tabBarIcon: getTabBarIcon("label")
        }
    }

  );

const FavoriteScreens = createStackNavigator(
  {
    Favorites: {
      screen: Favorites
    },
    Profile: {
      screen: Profile
    }
  },
  {
    initialRouteName: "Favorites",
    navigationOptions: {
      tabBarIcon: getTabBarIcon("search"),
    //   drawerIcon: getDrawerItemIcon("star")
    }
  }
);

const SearchScreens = createStackNavigator(
  {
    Search: {
      screen: Search
    },
    Profile: {
      screen: Profile
    }
  },
  {
    initialRouteName: "Search",
    navigationOptions: {
      tabBarIcon: getTabBarIcon("search"),
    //   drawerIcon: getDrawerItemIcon("star")
    }
  }
);

const UserScreens = createStackNavigator(
  {
    User: { screen: User }
  },
  {
    initialRouteName: "User",
    navigationOptions: {
      tabBarIcon: getTabBarIcon("person"),
    //   drawerIcon: getDrawerItemIcon("person")
    }
  }
);

const DrawerToggle = createBottomTabNavigator(
  {
    Contacts: ContactScreens,
    Tags: TagsScreen,
    Search: SearchScreens
  },
  {
    initialRouteName: "Contacts",
    tabBarPosition: "bottom",
    tabBarOptions: {
      style: {
        backgroundColor: colors.greyLight
      },
      showLabel: false,
    //   showIcon: true,
    activeTintColor: '#e91e63',
    inactiveTintColor: 'white',
    inactiveBackgroundColor: '#7a7a7a',
      renderIndicator: () => null
    }
  }
);

export default createAppContainer(DrawerToggle);

// const ContactsScreens = StackNavigator(
//   {
//     Contacts: {
//       screen: Contacts
//     },
//     Profile: {
//       screen: Profile
//     }
//   },
//   {
//     initialRouteName: "Contacts",
//     navigationOptions: {
//       tabBarIcon: getTabBarIcon("list")
//     }
//   }
// );

// const FavoritesScreens = StackNavigator(
//   {
//     Favorites: {
//       screen: Favorites
//     },
//     Profile: {
//       screen: Profile
//     }
//   },
//   {
//     initialRouteName: "Favorites",
//     navigationOptions: {
//       tabBarIcon: getTabBarIcon("star")
//     }
//   }
// );

// const UserScreens = StackNavigator(
//   {
//     User: {
//       screen: User
//     }
//   },
//   {
//     initialRouteName: "User",
//     navigationOptions: {
//       tabBarIcon: getTabBarIcon("person")
//     }
//   }
// );

// export default TabNavigator(
//   {
//     Contacts: {
//       screen: ContactsScreens
//     },
//     Favorites: {
//       screen: FavoritesScreens
//     },
//     User: {
//       screen: UserScreens
//     }
//   },
//   {
//     initialRouteName: "Contacts",
//     tabBarPosition: "bottom",
//     tabBarOptions: {
//       style: {
//         backgroundColor: colors.greyLight
//       },
//       showLabel: false,
//       showIcon: true,
//       activeTintColor: colors.blue,
//       inactiveTintColor: colors.greyDark,
//       renderIndicator: () => null
//     }
//   }
// );
