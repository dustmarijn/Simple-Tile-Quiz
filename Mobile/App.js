import * as React from 'react';
import type {Node} from 'react';

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Button,
} from 'react-native';
import TabNavigator from "./src/components/navigation components/tabnavigator";

import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';


const App: () => Node = () => {

    return (
        <>
            <StatusBar barStyle={'light-content'}/>
            <NavigationContainer>
                <TabNavigator/>
                <SafeAreaView>
                    <ScrollView style={{flex:1}}>
                    </ScrollView>
                </SafeAreaView>
            </NavigationContainer>
        </>
    );
};

export default App;
