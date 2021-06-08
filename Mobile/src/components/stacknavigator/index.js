import React from 'react';
import {Button} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Svg, {Path, G} from 'react-native-svg';

import HomeScreen from "../../screens/HomeScreen";
import Logo from "./logo";
const Stack = createStackNavigator();

export default function StackNavigator({defaultStack}) {
    const options = {
        animationEnabled: true,
        headerTitleAlign: 'right',
        headerRight: () => (
            <Logo/>
        ),
        title: null,
        headerMode: 'screen',
        cardStyle: { backgroundColor: '#f6f5fb' },
    }
    return (
        <Stack.Navigator
            initialRouteName={defaultStack ? defaultStack : 'Home'}
        >
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={options}>
            </Stack.Screen>
        </Stack.Navigator>
    )
}
