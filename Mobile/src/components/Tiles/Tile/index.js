import React, {useEffect, useState} from 'react';
import {Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { SvgUri } from 'react-native-svg';

export default function Tile({title, illustration, onPress, organisations}) {
    const [loading, setLoading] = useState(true);
    const [image, setImage] = useState(null);
    const [org, setOrg] = useState(null);
    /**
     * UseEffect waar in de informatie wordt per tile wordt terug gegeven
     */
    useEffect(() => {
        setImage({ext: illustration.split('.').pop(), source: `http://10.0.2.2:8000/images/illustrations/${illustration}`})
        setOrg(organisations?.find(org => org.name === title));
        console.log(org);
        setLoading(false);
    }, [title !== undefined && illustration !== undefined]);
    /**
     * Hier wordt een enkele tegel per keer aangemaakt die worden in geladen in D:\Projects\SamenZwolle-Laaggeletterden\Mobile\src\components\Tiles\index.js.
     */
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
    appButtonText: {
        position: 'absolute',
        bottom: 25,
        marginTop: 15,
        fontSize: 20,
    }
});
