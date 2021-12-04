import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView, Alert } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Entypo';
import styles from '../styles/styles';
import storage from '../storage/storage';

const AddNew = ({ navigation }) => {
    const [name, setname] = useState('')
    const [amount, setamount] = useState()
    const [total, settotal] = useState(0)

    useEffect(async () => {
        await storage.load({ key: 'total' }).then(data => {
            settotal(data)
        }).catch(async (e) => { })

        return () => { }
    }, [total])

    const add = async () => {

        if (name.trim() === '') {
            Alert.alert('', 'Please name your plan')
            return
        }

        if (parseFloat(amount) <= 0 || parseFloat(amount) === undefined || parseFloat(amount).length < 1) {
            Alert.alert('', 'Enter a valid amount')
            return
        }

        if (parseFloat(amount) > parseFloat(total)) {
            Alert.alert('', 'Budget cannot be greater than the total amount', `Ghc${total}`)
            return
        }

        const budget = {
            'name': name,
            'amount': parseFloat(amount),
            'created': Date().substr(4, 11),
            'updated': Date().substr(4, 11),
            'id': Date.now(),
            'used': 0
        }

        const saved = [...await storage.load({ key: 'budgets' }), budget]
        await storage.save({ key: 'budgets', data: saved })

        setamount('')
        setname('')

        navigation.goBack()
    }

    return <View style={styles.container}>
        <View style={[styles.appBar, styles.backAppBar]}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name='chevron-thin-left' color='#007aff' size={23} />
            </TouchableOpacity>
            <Text style={styles.appBarPageTitle}>Add a budget</Text>
            <TouchableOpacity onPress={() => add()}>
                <Text style={styles.btnText}>Save</Text>
            </TouchableOpacity>
        </View>

        <ScrollView style={styles.pd20}>
            <TextInput
                style={styles.input}
                placeholder='Name your buget'
                placeholderTextColor="#93949b"
                value={name}
                onChangeText={(value) => setname(value)} />


            <View style={styles.pd15} />
            <Text style={styles.descriptiveText}>
                Choose an amount you want to dedicate to this plan.
                This amount should be less than the total amount of money you have
            </Text>
            <TextInput
                placeholderTextColor="#93949b"
                placeholder='Set an amount'
                style={styles.input}
                keyboardType={'numeric'}
                value={amount}
                onChangeText={(value) => setamount(value)} />
        </ScrollView>
    </View>
}

export default AddNew