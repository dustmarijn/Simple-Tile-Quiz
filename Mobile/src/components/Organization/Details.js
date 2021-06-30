import React from 'react';
import {ScrollView, View} from "react-native";
import Axios from './DetailsAxiosCall';

export default function Details(){
    return(
        <ScrollView>
            <View>
                <Axios/>
            </View>
        </ScrollView>
    )
}
