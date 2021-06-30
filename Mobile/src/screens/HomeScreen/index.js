import React from 'react';
import Tile from '../../components/Tiles';
import Organization from "../../components/Organization/Index";
import DetailsOrganization from '../../components/Organization/Details';
import style from "../../../style";;
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
            <DetailsOrganization/>
        </View>
    )
}
