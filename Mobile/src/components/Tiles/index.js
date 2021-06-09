import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

export default function Tile(){
    var indicationWord = 'steekwoord';

    return(
        <View style={{flex:1}}>
            <Text style={styles.header}>Ik zoek voor</Text>
            <View style={styles.button}>
                <Image
                    style={styles.image}
                    source={{uri: 'https://reactnative.dev/img/tiny_logo.png',}}
                />
                <Text style={styles.indicationWord}>{indicationWord}</Text>
            </View>
            <View style={styles.button}>
                <Image
                    style={styles.image}
                    source={{uri: 'https://reactnative.dev/img/tiny_logo.png',}}
                />
                <Text style={styles.indicationWord}>{indicationWord}</Text>
            </View>
            <View style={styles.button}>
                <Image
                    style={styles.image}
                    source={{uri: 'https://reactnative.dev/img/tiny_logo.png',}}
                />
                <Text style={styles.indicationWord}>{indicationWord}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        marginTop: 15,
        height: 100,
        width: 100,
    },
    button: {
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
    },
    header: {
        marginTop: 10,
        marginBottom: 10,
        color: 'black',
        textAlign: 'center',
        fontSize: 25,
    },
    indicationWord: {
        marginTop: 10,
        fontSize: 20,
    }
});