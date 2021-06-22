import React, {useState, useEffect} from 'react';
import axios from "axios";
import {Text, View} from "react-native";

export default function AxiosCall() {
    const [loading, setLoading] = useState(true);
    const [pages, setPages] = useState([]);

    useEffect(() => {
        axios.get('http://10.0.2.2:8000/api/pages')
            .then((res) => {
                //console.warn(res.data.organisations);
                setPages(res.data.pages);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            })
    }, []);

    return (
        <View>
            {loading === false ?
                pages?.map((page, index) => {
                    return (
                        <Text key={index}>{page.name}</Text>
                    )
                })
                : <Text>Aan het laden ... </Text> }
        </View>
    )
}
