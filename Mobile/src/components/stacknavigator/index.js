import React, {useEffect, useState} from 'react';
import {Button} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Svg, {Path, G} from 'react-native-svg';

import HomeScreen from "../../screens/HomeScreen";
import Tiles from "../Tiles/index";
import Logo from "./logo";
import axios from "axios";
const Stack = createStackNavigator();

export default function StackNavigator({defaultStack}) {
    const [loading, setLoading] = useState(true);
    const [pages, setPages] = useState([]);

    useEffect(() => {
        axios.get('http://10.0.2.2:8000/api/pages')
            .then((res) => {
                setPages(res.data.pages);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            })
    }, []);

    const options = {
        animationEnabled: true,
        headerTitleAlign: 'right',
        headerRight: () => (
            <Logo/>
        ),
        title: null,
        headerMode: 'screen',
        cardStyle: { backgroundColor: '#f6f5fb' },
    }
    return (
        <>
            {loading === false ?
                <Stack.Navigator
                    initialRouteName={defaultStack ? defaultStack : '/'}
                >
                    {pages?.map((page, index) => {
                        return (
                            <Stack.Screen
                                key={index}
                                name={page.path}
                                component={HomeScreen}
                                options={options}>
                            </Stack.Screen>
                        )
                    })}
                </Stack.Navigator>
                : null }
        </>
    )
}
