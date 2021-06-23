import React, {useState, useEffect} from 'react';
import axios from "axios";
import {Text, View} from "react-native";

export default function AxiosCall() {
    const [loading, setLoading] = useState(true);
    const [organisations, setOrganisations] = useState([]);

    useEffect(() => {
        axios.get('http://10.0.2.2:8000/api/organisations')
            .then((res) => {
                //console.warn(res.data.organisations);
                setOrganisations(res.data.organisations);
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
                organisations?.map((org, index) => {
                    return (
                        <Text key={index}>{org.name} {org.email}</Text>
                    )
                })
                : <Text>Aan het laden ... </Text> }
        </View>
    )
}
