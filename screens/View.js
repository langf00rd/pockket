import React, { useState, useEffect } from 'react'
import { Text, View, ScrollView, TextInput, Alert } from 'react-native';
import { Switch, TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Entypo';
import styles from '../styles/styles';
import storage from '../storage/storage';

const ViewPlan = ({ navigation, route }) => {
    const [amount, setamount] = useState('')
    const [budgets, setbudgets] = useState([])
    const [addToExisting, setaddToExisting] = useState(true)

    const percentage = ((100 * route.params.buget.used) / route.params.buget.amount).toFixed(0)

    useEffect(async () => {

        await storage.load({ key: 'budgets' }).then(data => {
            setbudgets(data)
        }).catch(async (e) => { })

        return () => { }
    }, [budgets])

    const deletePlan = async () => {
        Alert.alert('', 'Are you sure you want to delete this plan?', [
            { text: "Cancel", onPress: () => { } },

            {
                text: "Yes", onPress: async () => await storage.load({ key: 'budgets' }).then(async data => {

                    const p = []

                    for (let i = 0; i < data.length; i++) {
                        p.push(data[i])
                    }

                    for (let i = 0; i < p.length; i++) {
                        const element = data[i];

                        if (element.id === route.params.buget.id) {
                            p.splice(i, 1);
                        }
                    }

                    await storage.save({ key: 'budgets', data: p })
                    navigation.goBack()
                })
            }
        ]);
    }

    const update = async () => {
        if (parseFloat(amount) > parseFloat(route.params.buget.amount)) {
            Alert.alert('', `Amount should not be greater than the amount set, GHc${route.params.buget.amount}`,)
            return
        }

        await storage.load({ key: 'budgets' })
            .then(async (data) => {

                let p = []
                let usedValue;

                if (addToExisting) usedValue = parseFloat(route.params.buget.used) + parseFloat(amount)
                else usedValue = parseFloat(amount)

                const newBudget = {
                    'name': route.params.buget.name,
                    'amount': route.params.buget.amount,
                    'created': route.params.buget.created,
                    'updated': Date().substr(4, 11),
                    'id': route.params.buget.id,
                    'used': usedValue
                }

                for (let i = 0; i < data.length; i++) {
                    p.push(data[i])
                }

                for (let i = 0; i < p.length; i++) {
                    const element = data[i];

                    if (element.id === route.params.buget.id) {
                        p.splice(i, 1);
                        p.push(newBudget)
                    }
                }

                await storage.save({ key: 'budgets', data: p })
                setamount(0)
                navigation.goBack()

            })
    }

    return <View style={styles.container}>
        <View style={[styles.appBar, styles.backAppBar]}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name='chevron-thin-left' color='#007aff' size={23} />
            </TouchableOpacity>
            <Text style={styles.appBarPageTitle}>Budget</Text>
            <TouchableOpacity onPress={() => update()}>
                <Text style={styles.btnText}>Save</Text>
            </TouchableOpacity>
        </View>

        <ScrollView style={styles.pd20}>
            <View style={styles.pd10} />

            <View style={styles.flexBetween}>
                <Text style={{ fontSize: 27, fontWeight: 'bold', color: "#fff" }}>{route.params.buget.name}</Text>

            </View>

            <View style={styles.pd20} />

            {percentage > 50 ?
                <Text style={[styles.errorText, styles.smText]}>{percentage}% used</Text> :
                <Text style={[styles.succText, styles.smText]}>{percentage}% used</Text>
            }

            <View style={styles.pd5} />

            <View style={styles.flexBetween}>
                <Text style={styles.greyText}>Remaining plan amount</Text>
                <Text style={styles.text}>GHc {route.params.buget.amount - route.params.buget.used}</Text>
            </View>

            <View style={styles.pd5} />

            <View style={styles.flexBetween}>
                <Text style={styles.greyText}>Amount set</Text>
                <Text style={styles.greyText}>GHc {route.params.buget.amount}</Text>
            </View>

            <View style={styles.pd5} />

            <View style={styles.flexBetween}>
                <Text style={styles.greyText}>Planned on</Text>
                <Text style={styles.greyText}>{route.params.buget.created}</Text>
            </View>

            <View style={styles.pd20} />

            <View style={styles.flexBetween}>
                <Text style={[styles.text, styles.boldText]}>How much have you just spent?</Text>

                <TextInput
                    placeholder='0.00'
                    autoFocus={true}
                    placeholderTextColor='#797980'
                    keyboardType={'numeric'}
                    value={`${amount}`}
                    onChangeText={(value) => setamount(value)}
                    style={{
                        color: '#fff',
                        fontSize: 20,
                        maxWidth: 90,
                        // borderBottomColor: '#1c1c1f',
                        // borderBottomWidth: 2,
                    }} />
            </View>

            <View style={styles.pd10} />

            <View style={styles.flexBetween}>
                <Text style={[styles.text, styles.boldText]}>Add to already spent amount</Text>
                <Switch onValueChange={(val) => setaddToExisting(val)} value={addToExisting} />
            </View>

            <View style={styles.pd10} />

            <TouchableOpacity onPress={() => deletePlan()}>
                <Text style={styles.errBtnText}>Delete plan</Text>
            </TouchableOpacity>

        </ScrollView>
    </View>
}

export default ViewPlan