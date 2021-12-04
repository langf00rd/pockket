import React, { useState } from 'react'
import { Text, View, TouchableOpacity, ScrollView, Alert, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles/styles';
import { TextInput } from 'react-native-gesture-handler';
import storage from '../storage/storage';

const NewUser = ({ navigation }) => {
    const [total, settotal] = useState()

    const done = async () => {

        if (parseFloat(total) <= 0 || isNaN(parseFloat(total))) {
            Alert.alert('', 'Please enter a valid amount greater than 0')
            return
        }

        await storage.save({ key: 'total', data: parseFloat(total) })
        await storage.save({ key: 'showNotifs', data: true })
        await storage.save({ key: 'budgets', data: [] })

        navigation.navigate('Home')
    }

    return (
        <View style={[styles.container, { backgroundColor: '#1c1c1c' }]}>
            <StatusBar backgroundColor='#1c1c1c' />
            <View style={[styles.appBar, { backgroundColor: '#1c1c1c' }]}>
                <Text style={styles.appBarTitle}>Pockket</Text>

                <TouchableOpacity style={styles.flexBetween} onPress={() => done()}>
                    <Text style={styles.btnText}>Done</Text>
                    <Icon name='md-chevron-forward-sharp' color='#007aff' size={20} />
                </TouchableOpacity>
            </View>

            <View style={styles.pd10} />

            <ScrollView style={styles.pd20}>

                <View style={styles.pd20} />
                <Text style={{ color: '#fff', fontSize: 25, fontWeight: '300', textAlign: 'center', paddingHorizontal: 30 }}>Set a total amount</Text>
                <View style={styles.pd20} />

                <Text style={[styles.greyText, { textAlign: 'center', lineHeight: 24 }]}>
                    This amount should be how much you have. Your budgets will depend on this total amount</Text>
                <View style={styles.pd20} />

                <TextInput
                    placeholder='Total amount'
                    placeholderTextColor='#797980'
                    keyboardType={'numeric'}
                    value={total}
                    onChangeText={(value) => settotal(value)}
                    style={{
                        // backgroundColor: '#1c1c1f',
                        borderWidth: 2,
                        borderColor: '#414141',
                        borderRadius: 10,
                        padding: 20,
                        fontSize: 20,
                        textAlign: 'center',
                        color: '#fff',
                        fontWeight: 'bold'
                    }} />
            </ScrollView>
        </View >
    )
}

export default NewUser