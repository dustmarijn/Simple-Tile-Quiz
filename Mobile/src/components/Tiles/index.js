import React, {useEffect, useState} from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';
import Tile from "./Tile";
import Organisation from '../Organisations';

export default function Tiles({navigation, page, organisations}){
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if(page.id) {
            setLoading(false);
        }
    }, [page]);
    /**
     * De return waarin de tegels allemaal tegelijk worden weer gegeven.
     * De gegevens worden gestuurd naar Tile en die maakt een tegel en geeft die terug en maakt dan de volgende tegel.
     */
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
    header: {
        marginTop: 25,
        marginBottom: 25,
        color: 'black',
        textAlign: 'center',
        fontSize: 30,
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
