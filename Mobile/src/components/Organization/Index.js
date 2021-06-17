import React, {useEffect, useState} from 'react';
import {Text, View, ScrollView, Button, Alert, StyleSheet, TouchableOpacity, Image} from 'react-native';
import homestyle from '../../../style';
import axios from "axios";


export default function Organization(){
const [loading, setLoading] = useState(true);
const [pages, setPages] = useState([]);
const readPress = () => alert(OrganizationName)
const OrganizationName = "Taalkoppels";
    useEffect( ()=> {
        axios.get('http://192.168.178.214:8000/api/pages')
            .then(response => {
                if (response.data.pages) {
                    setPages(response.data.pages);
                    setLoading(false);
                }
                console.log(response.data);
            })
            .catch(error =>{
                console.log(error);
            })
    }, []);

    return(
        <ScrollView>
            <View>
                <TouchableOpacity style={styles.LeesvoorButton} onPress={readPress}>
                    <Text style={styles.LeesvoorText}>Lees voor</Text>
                </TouchableOpacity>
                <Text style={[homestyle.GraviolaSoft_Medium, styles.header]}> {OrganizationName} </Text>
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
    },
    LeesvoorText:{
        fontSize: 5,
        color:'black',
        textAlign: 'center',
    },
});
