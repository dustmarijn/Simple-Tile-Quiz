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

import StackNavigator from "../../stacknavigator";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <Tab.Navigator tabBarOptions={{
            showLabel: false,
            style: {
                position: 'absolute',
                backgroundColor: 'white',
                height: 40,
            },
        }}>
            <Tab.Screen name={'Home'} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{borderRadius: 50, height: 55, width: 55, alignItems: 'center', justifyContent: 'center', padding: 3, top: -25, backgroundColor: '#F6227D'}}>
                        <View style={{borderRadius: 50, height: 50, width: 50, alignItems: 'center', justifyContent: 'center', padding: 3, top: -3, backgroundColor: '#4A2485'}}>
                            <View style={{borderRadius: 50, height: 45, width: 45, alignItems: 'center', justifyContent: 'center', padding: 5, top: -3, backgroundColor: '#0551D8'}}>
                                <Icon name={'home'} style={{textAlign: 'center'}} size={35} type='material' color={focused ? 'white' : 'black'}/>
                            </View>
                        </View>
                    </View>
                )
            }}>{props => <StackNavigator defaultRoute={'Home'}/>}</Tab.Screen>
        </Tab.Navigator>
    )
}
