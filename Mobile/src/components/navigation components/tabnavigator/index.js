import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements'
import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Image,
} from 'react-native';

import HomeScreen from "../../../screens/HomeScreen";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <Tab.Navigator tabBarOptions={{
            showLabel: false,
            style: {
                position: 'absolute',
                bottom: 0,
                right: 0,
                left: 0,
                shadowColor: '#111',
                shadowOffset: {
                    width: -30,
                    height: -10,
                },
                height: 70,
                shadowOpacity: 1,
                shadowRadius: 3.5,
                elevation: 5,
            }
        }}>
            <Tab.Screen name={'Home'} component={HomeScreen} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: 0, backgroundColor: 'transparent'}}>
                        <Icon name={'home'} type='material' color={'black'}/>
                        <Text>Home</Text>
                    </View>
                )
            }}/>
        </Tab.Navigator>
    )
}
