import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from "../../screens/HomeScreen";
import Logo from "./logo";
import axios from "axios";

const Stack = createStackNavigator();

export default function StackNavigator({defaultStack}) {
    const [loading, setLoading] = useState(true);
    const [pages, setPages] = useState([]);
    /**
     * haalt alle data op die nodig is voor de stack.navigator
     */
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
    /**
     * Stack.Navigator maakt navigatie mogelijk door voor elke page.path een stack.screen aan temaken
     */
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
