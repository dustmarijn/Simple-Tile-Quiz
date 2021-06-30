import React, {useState, useEffect} from 'react';
import axios from "axios";
import {Text, View, Image, StyleSheet} from "react-native";

export default function AxiosCall() {
    const [loading, setLoading] = useState(true);
    const [organisations, setOrganisations] = useState([]);

    /*
    Get call op api door middel van axios
     */
    useEffect(() => {
        axios.get('http://10.0.2.2:8000/api/organisations')
            .then((res) => {
                //console.warn(res.datas    .organisations);
                setOrganisations(res.data.organisations);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            })
    }, []);

    /*
       De return functie waar de tegels worden ingedeeld en gestyled.
     */
    return (
        <View>
            {loading === false ?
                organisations?.map((org, index) => {
                    return (
                        <View key={index}>
                            <Image source={{uri: 'http://10.0.2.2:8000/images/organisationlogo/' + org.logo_file_name}}/>
                            <Text style={styles.header}>{org.name}</Text>
                        </View>)})
                : <Text>Aan het laden ... </Text> }
        </View>
    )
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
