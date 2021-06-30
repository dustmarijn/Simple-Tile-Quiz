import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { SvgUri } from 'react-native-svg';

export default function Tile({title, illustration, onPress, organisations}) {
    const [loading, setLoading] = useState(true);
    const [image, setImage] = useState(null);
    const [org, setOrg] = useState(null);

    useEffect(() => {
        setImage({ext: illustration.split('.').pop(), source: `http://10.0.2.2:8000/images/illustrations/${illustration}`})
        setOrg(organisations?.find(org => org.name === title));
        console.log(org);
        setLoading(false);
    }, [title !== undefined && illustration !== undefined]);

    return (
        <>
            {loading === false ?
                <TouchableOpacity style={styles.appButtonContainer} onPress={() => onPress()}>
                    {image.ext !== 'svg' ?
                        <Image
                            source={{
                                uri: org === undefined ? image.source : `http://10.0.2.2:8000/images/organisationlogo/${illustration}`,
                                method: 'POST',
                                headers: {
                                    Pragma: 'no-cache',
                                    'Content-Type': 'multipart/form-data',
                                },
                                body: ''
                            }}
                            style={{ width: 90 + '%', height: 75 + '%' }}
                        />
                    :
                        <SvgUri
                            width={90 + '%'}
                            height={75 + '%'}
                            uri={org === undefined ? image.source : `http://10.0.2.2:8000/images/organisationlogo/${illustration}`}
                        />
                    }
                    <Text style={styles.appButtonText}>{title}</Text>
                </TouchableOpacity>
            : null }
        </>
    )
}


const styles = StyleSheet.create({
    image: {
        marginTop: 15,
        height:  50,
        width: 100,
    },
    appButtonContainer: {
        textAlign: 'center',
        flex:1,
        alignItems:'center',
        backgroundColor: 'white',
        borderRadius: 5,
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 30,
        padding:5,
        elevation: 5,
        height: 200,
        width: 75 + '%',
    },
    header: {
        marginTop: 10,
        marginBottom: 10,
        color: 'black',
        textAlign: 'center',
        fontSize: 25,
    },
    appButtonText: {
        position: 'absolute',
        bottom: 25,
        marginTop: 15,
        fontSize: 20,
    }
});
