import React, {useEffect, useState} from 'react';
import Tiles from '../../components/Tiles';
import {View,} from 'react-native';
import axios from "axios";
import config from '../../../App.config';

export default function HomeScreen({navigation, route}) {
    const [loading, setLoading] = useState(true);
    const [pages, setPages] = useState([]);
    const [organisations, setOrganisations] = useState([]);
    const [page, setPage] = useState([]);
    /**
     * 2 axioscalls voor alle data die nodig is zodat de call maar 1 keer gedaan hoefd te worden.
     */
    useEffect(() => {
        axios.get(`${config}/api/pages`)
            .then((res) => {
                setPages(res.data.pages);
            })
            .catch(error => {
                console.error(error);
            });
        axios.get(`${config}/api/organisations`)
            .then((res) => {
                setOrganisations(res.data.organisations);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            })
    }, [loading === true]);

    useEffect(() => {
        const findPage = pages?.find((e) => e.path === route.name);
        if(findPage) {
            setPage(findPage);
            console.log(page)
        }
    }, [pages.length !== 0]);
    /**
     * de data wordt door gegeven aan alle onderliggende componets
     */
    return (
        <View style={{flex:1}}>
             <Tiles navigation={navigation} page={page} organisations={organisations}/>
        </View>
    )
}
