import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView } from 'react-native';
import { Switch, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Entypo';
import storage from '../storage/storage';
import styles from '../styles/styles';

const Settings = ({ navigation }) => {
    const [showNotif, setshowNotif] = useState(false)

    useEffect(async () => {
        await storage.load({ key: 'showNotifs' }).then(data => {
            setshowNotif(data)
        })
    }, [])

    const toggleNotifs = async () => {
        await storage.save({ key: 'showNotifs', data: showNotif })
        navigation.goBack()
    }

    return <View style={styles.container}>
        <View style={[styles.appBar, styles.backAppBar]}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name='chevron-thin-left' color='#007aff' size={23} />
            </TouchableOpacity>
            <Text style={styles.appBarPageTitle}>Settings</Text>
            <TouchableOpacity onPress={() => toggleNotifs()}>
                <Text style={styles.btnText}>Save</Text>
            </TouchableOpacity>
        </View>

        <ScrollView style={styles.pd20}>
            <View style={[{ backgroundColor: '#1c1c1f', borderRadius: 10, }]}>
                <View style={[styles.contentContainer, styles.flexBetween]}>
                    <Text style={styles.greyText}>Show notifications</Text>
                    <Switch onValueChange={(val) => setshowNotif(val)} value={showNotif} />
                </View>
            </View>

            <View style={styles.pd20} />
            <Text style={[styles.greyText, { fontSize: 20, color: '#fff', fontWeight: 'bold' }]}> Contact the dev </Text>
            <View style={styles.pd10} />
            <Text style={styles.greyText}> 💌  langfordquarshie21@gmail.com </Text>
            <View style={styles.pd10} />
            <Text style={styles.greyText}> ☎️  (+233) 550 202 871 </Text>
            <View style={styles.pd10} />
            <Text style={styles.greyText}> 🚀  Multiverse tech </Text>
        </ScrollView>
    </View>
}

export default Settings