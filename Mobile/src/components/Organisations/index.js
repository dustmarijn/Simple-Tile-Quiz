import React, {useEffect, useState} from 'react';
import {Button, Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {SvgUri} from "react-native-svg";

export default function Organisation({organisation}){
    const [loading, setLoading] = useState(true);
    const [image, setImage] = useState(null);
    const [org, setOrg] = useState(null);

    useEffect(() => {
        setImage({ext: organisation?.logo_file_name.split('.').pop(), source: `http://10.0.2.2:8000/images/organisation?.logo_file_names/${organisation?.logo_file_name}`})
        setOrg(organisation);
        setLoading(false);
    }, [organisation !== undefined])

    return(
        <>
                {loading === false ?
                    <>
                        {image.ext !== 'svg' ?
                            <Image
                                source={{
                                    uri: organisation === undefined ? image.source : `http://10.0.2.2:8000/images/organisationlogo/${organisation?.logo_file_name}`,
                                    method: 'POST',
                                    headers: {
                                        Pragma: 'no-cache',
                                        'Content-Type': 'multipart/form-data',
                                    },
                                    body: ''
                                }}
                                style={{ width: 100 + '%', height: 75 + '%' }}
                            />
                            :
                            <SvgUri
                                width={200}
                                height={125}

                                uri={organisation === undefined ? image.source : `http://10.0.2.2:8000/images/organisationlogo/${organisation?.logo_file_name}`}
                            />}
                            <View>
                                <SvgUri source={require('../../assets/Icons/email.svg')} /> <Text style={styles.text}>{organisation?.email}</Text>
                                <Text style={styles.text}>{organisation?.phone_number}</Text>
                                <Button title="Website" onPress={() => {Linking.openURL(`${organisation?.website}`).catch( err => console.error("Couldn't load page", err))}}/>
                            </View>
                    </>
                    : <Text>Laden ...</Text>}
        </>
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
    text:{
        fontSize: 20
    }
});
