import React, {useEffect, useState} from 'react';
import {Text, View, ScrollView, Button, Alert, StyleSheet, TouchableOpacity, Image} from 'react-native';
import homestyle from '../../../style';
import AxiosCall from "./AxiosCall";



export default function Organization(){
const [loading, setLoading] = useState(true);
const [pages, setPages] = useState([]);
const readPress = () => alert(OrganizationName)
const OrganizationName = "Taalkoppels";

    return(
        <ScrollView>
            <View>
                <TouchableOpacity style={styles.LeesvoorButton} onPress={readPress}>
                </TouchableOpacity>

                <Text style={[homestyle.GraviolaSoft_Medium, styles.header]}> {OrganizationName} </Text>

                <View style={styles.appButtonContainer}><AxiosCall/></View>

            </View>


        </ScrollView>
    );
}
const styles = StyleSheet.create({
    header: {
        marginTop: 10,
        marginBottom: 10,
        color: 'black',
        textAlign: 'center',
        fontSize: 25,
    },
    LeesvoorButton:{
        backgroundColor: 'white',
        height: 20,
        width: 75,
        padding: 10,
        margin: 20,
        color:'black',
        fontSize: 10
    },
    LeesvoorText:{
        fontSize: 5,
        color:'black',
        textAlign: 'center',
    },
    appButtonContainer: {
        textAlign: 'center',
        flex:1,
        alignItems:'center',
        backgroundColor: 'white',
        borderRadius: 5,
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 25,
        padding:5,
        elevation: 5,
        height: 180,
    },
});
