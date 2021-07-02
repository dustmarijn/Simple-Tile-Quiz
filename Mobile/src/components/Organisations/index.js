import React, {useEffect, useState} from 'react';
import {Button, Image, Linking, Platform, TouchableOpacity, StyleSheet, Text, View} from "react-native";
import {SvgCssUri } from "react-native-svg";
import { Icon } from 'react-native-elements'

export default function Organisation({organisation}){
    const [loading, setLoading] = useState(true);
    const [image, setImage] = useState(null);
    const [org, setOrg] = useState(null);

    useEffect(() => {
        setImage({ext: organisation?.logo_file_name.split('.').pop(), source: `http://10.0.2.2:8000/images/organisation?.logo_file_names/${organisation?.logo_file_name}`})
        setOrg(organisation);
        setLoading(false);
    }, [organisation !== undefined])
    /**
     * Zorgt er voor dat als je op de knop clickt je wordt door gestuurd naar de website.
     * @constructor
     */
    const Website = () => {
        Linking.openURL(`${organisation?.website}`)
            .catch( err => console.error("Couldn't load page", err))
    }
    /**
     *  Functie bekijkt wat voor OS het is en stuurd door naar bel app met telefoon nummer er in gecopieerd.
     */
    let phoneNumber ='';
    const phoneCall = ()=>{
        if (Platform.OS === 'android')
        {
            phoneNumber = `tel:${organisation?.phone_number}`;
        }else{
            phoneNumber = `telprompt:${organisation?.phone_number}`;
        }
        Linking.openURL(phoneNumber);
    };

    /**
     * open mail app en maakt alles klaar voor verzenden.
     */

    let url = `mailto:${organisation?.email}`;
    const mailTo = async () => {
        const canOpen = await Linking.canOpenURL(url);
        if (!canOpen){
            throw new Error('rovided URL can not be handled');
        }
        return Linking.openURL(url);
    };
    /**
     *De return van de functie waar door de details van organisaties te zien zijn.
     */
    return(
        <>
                {loading === false ?
                    <>
                        {/*Kijkt wat voor bestand het is en zorgt dat de juiste image wordt laten zien.*/}
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
                            <SvgCssUri
                                width={200}
                                height={125}
                                uri={organisation === undefined ? image.source : `http://10.0.2.2:8000/images/organisationlogo/${organisation?.logo_file_name}`}
                            />}
                            <View>
                                <TouchableOpacity onPress={mailTo}><Text style={styles.text}><Icon name="envelope" type="font-awesome"/> {organisation?.email}</Text></TouchableOpacity>
                                <TouchableOpacity onPress={phoneCall}><Text style={styles.text}><Icon name="phone" type="font-awesome"/> {organisation?.phone_number}</Text></TouchableOpacity>
                                <Button title="Website" onPress={Website}/>
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
