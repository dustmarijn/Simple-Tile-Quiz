import React, {useEffect, useState} from 'react';
import {Text, View, ScrollView, Button, Alert, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Tile from "./Tile";
import Organisation from '../Organisations';

export default function Tiles({navigation, page, organisations}){
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(page.id) {
            setLoading(false);
        }
    }, [page]);

    return(
        <ScrollView>
            <Text style={styles.header}>{page?.title}</Text>
            {loading === false ?
                page?.type === "tile" ?
                        <View style={styles.tiles}>
                            {page?.tiles?.map((tile, index) => {
                                return (
                                    <Tile organisations={organisations} key={index} title={tile.title} illustration={tile.illustration_file_name} onPress={() => navigation.navigate(tile.path)} />
                                )
                            })}
                        </View>
                :
                    <View style={styles.tiles}>
                        <Organisation organisation={organisations?.find(org => org.name === page.title)}/>
                    </View>
            : <Text>Laden ...</Text> }
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    image: {
        marginTop: 15,
        height: 100,
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
        marginBottom: 25,
        padding:5,
        elevation: 5,
        height: 180,
    },
    header: {
        marginTop: 25,
        marginBottom: 25,
        color: 'black',
        textAlign: 'center',
        fontSize: 30,
    },
    appButtonText: {
        marginTop: 15,
        fontSize: 20,
    },
    tiles: {
        width: 100 + '%',
        height: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        paddingBottom: 50,
        flexDirection: 'column',
    }
});
