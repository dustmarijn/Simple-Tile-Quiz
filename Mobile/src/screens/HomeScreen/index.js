import React, {useEffect, useState} from 'react';
import Tiles from '../../components/Tiles';
import Organisations from '../../components/Organisations/index';
import style from "../../../style";;
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar
} from 'react-native';
import axios from "axios";

export default function HomeScreen({navigation, route}) {
    const [loading, setLoading] = useState(true);
    const [pages, setPages] = useState([]);
    const [organisations, setOrganisations] = useState([]);
    const [page, setPage] = useState([]);

    useEffect(() => {
        axios.get('http://10.0.2.2:8000/api/pages')
            .then((res) => {
                setPages(res.data.pages);
            })
            .catch(error => {
                console.error(error);
            });
        axios.get('http://10.0.2.2:8000/api/organisations')
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

    return (
        <View style={{flex:1}}>
             <Tiles navigation={navigation} page={page} organisations={organisations}/>
        </View>
        //<Organisations organisation={{email:"Wes.hakvoort@gmail.com", name:"Wessel", phone_number:"0616360616", logo_file_name:"adults.svg", location:"Test"}}/>
    )
}
