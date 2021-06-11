import React from 'react';
import {Text, View, ScrollView, Button, Alert, StyleSheet, TouchableOpacity, Image} from 'react-native';

export default function Tile(){
    var indicationWord = 'steekwoord';
    const tilePress = () => alert(indicationWord);

    return(
        <ScrollView>
            <Text style={styles.header}>Ik zoek voor</Text>
            <View>
                <TouchableOpacity style={styles.appButtonContainer} onPress={tilePress}>
                    <Image
                        style={styles.image}
                        source={{uri: 'https://reactnative.dev/img/tiny_logo.png',}}
                    />
                    <Text style={styles.appButtonText}>{indicationWord}</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity style={styles.appButtonContainer} onPress={tilePress}>
                    <Image
                        style={styles.image}
                        source={{uri: 'https://reactnative.dev/img/tiny_logo.png',}}
                    />
                    <Text style={styles.appButtonText}>{indicationWord}</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity style={styles.appButtonContainer} onPress={tilePress}>
                    <Image
                        style={styles.image}
                        source={{uri: 'https://reactnative.dev/img/tiny_logo.png',}}
                    />
                    <Text style={styles.appButtonText}>{indicationWord}</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity style={styles.appButtonContainer} onPress={tilePress}>
                    <Image
                        style={styles.image}
                        source={{uri: 'https://reactnative.dev/img/tiny_logo.png',}}
                    />
                    <Text style={styles.appButtonText}>{indicationWord}</Text>
                </TouchableOpacity>
            </View>
        <View>
            <Text style={{marginTop: 35}}/>
        </View>
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
        marginTop: 10,
        marginBottom: 10,
        color: 'black',
        textAlign: 'center',
        fontSize: 25,
    },
    appButtonText: {
        marginTop: 15,
        fontSize: 20,
    }
});