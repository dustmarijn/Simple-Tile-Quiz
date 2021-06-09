import React from 'react';
import Tile from '../../components/Tiles';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar
} from 'react-native';

export default function HomeScreen() {
    return (
        <View style = {{flex:1}}>
            <Tile/>
        </View>
    )
}
