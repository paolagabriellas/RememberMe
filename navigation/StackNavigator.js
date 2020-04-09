import { createStackNavigator } from '@react-navigation/stack';
import Contacts from './screens/Contacts';
import Profile from './screens/Profile';

const Stack = createStackNavigator();

function ContactStack() {
    return(
        <Stack.Navigator
      initialRouteName="Contacts"
      headerMode="screen"
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: 'tomato' },
      }}
    >
      <Stack.Screen
        name="Contacts"
        component={Contacts}
        options={{
          title: 'Contacts',
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
    );
}

export default ContactStack;