import React, { createRef, useEffect, useState } from 'react'
import { Text, View, ScrollView, TouchableOpacity, StatusBar, Dimensions, Animated, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles/styles';
import ActionSheet from "react-native-actions-sheet";
import { TextInput } from 'react-native-gesture-handler';
import storage from '../storage/storage';
import * as Notifications from "expo-notifications";

// storage.remove({ key: 'budgets' })
// storage.remove({ key: 'total' })
// storage.remove({ key: 'showNotifs' })

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

const Home = ({ navigation }) => {
    const totalAmountActionRef = createRef()
    const [bugets, setbudgets] = useState([])
    const [total, settotal] = useState(0)
    const [remaining, setremaining] = useState(0)
    const [hasSaved, sethasSaved] = useState(true)

    useEffect(() => {
        navigation.addListener('focus', async () => {
            await onMount()
            try {
                await storage.load({ key: 'showNotifs' }).then(data => {
                    if (data) Notifications.scheduleNotificationAsync({
                        content: {
                            title: 'Pockket',
                            body: 'Remember to keep track of how much you\'ve spent',
                            sound: true,
                            color: '#006aee'
                        },
                        trigger: { seconds: 1 },
                    });
                })
            } catch (e) { }
        });

        return () => { }
    }, [bugets, hasSaved])

    const onMount = async () => {
        await storage.load({ key: 'total' }).then(data => {

            settotal(data)
            setremaining(data)
            observeBudgets(data)

        }).catch(async (e) => {
            navigation.replace('NewUser')
        })
    }

    const saveTotal = async () => {
        await storage.save({ key: 'total', data: total })
        onMount()
        totalAmountActionRef.current?.setModalVisible(false)
    }

    const removeAll = async () => {
        Alert.alert('', 'This will remove all your saved plans. This process is irreversible', [
            { text: "Cancel", onPress: () => { } },
            {
                text: "Yes", onPress: async () => {
                    await storage.save({ key: 'budgets', data: [] })
                    onMount()
                }
            },
        ])
    }

    const observeBudgets = async (totalValue) => {

        await storage.load({ key: 'budgets' })
            .then(data => {
                setbudgets(data)

                if (data.length > 0) sethasSaved(true)
                else sethasSaved(false)

                const amounts = []

                if (data.length > 0) {
                    for (let i = 0; i < data.length; i++) {
                        const element = data[i];

                        if (parseFloat(element.used, 10) > 0) {

                            amounts.push(parseFloat(element.used, 10))

                        }
                    }

                    let remaining = amounts.reduce((a, b) => a + b, 0)

                    setremaining(totalValue - remaining)
                }

            }).catch(async (e) => { })
    }

    // if (hasSaved) 
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#000' />
            <ActionSheet
                gestureEnabled={true}
                defaultOverlayOpacity={0.7}
                elevation={0}
                ref={totalAmountActionRef}
                indicatorColor={'#47474c'}
                containerStyle={{
                    backgroundColor: '#1c1c1f',
                    padding: 20,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 29
                }} >
                <View style={{ height: Dimensions.get('window').height - 300 }}>

                    <View style={styles.pd10} />

                    <View style={styles.flexBetween}>
                        <TouchableOpacity onPress={() => totalAmountActionRef.current?.setModalVisible(false)}>
                            <Text style={styles.btnText}>Cancel</Text>
                        </TouchableOpacity>

                        <Text style={[styles.textAlignCenter, { color: '#fff', fontSize: 16 }]}>Set total amount</Text>

                        <TouchableOpacity onPress={() => saveTotal()}>
                            <Text style={styles.btnText}>Done</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.pd10} />

                    <TextInput
                        placeholder='Total amount'
                        placeholderTextColor='#797980'
                        keyboardType={'numeric'}
                        value={`${total}`}
                        onChangeText={(value) => settotal(value)}
                        style={{
                            backgroundColor: '#47474c',
                            borderRadius: 10,
                            padding: 20,
                            fontSize: 20,
                            textAlign: 'center',
                            color: '#fff',
                            fontWeight: 'bold'
                        }} />

                </View>
            </ActionSheet>

            <View style={styles.appBar}>
                <Text style={styles.appBarTitle}>Pockket</Text>

                <TouchableOpacity style={styles.flexBetween} onPress={() => { navigation.navigate('Settings') }}>
                    <Text style={styles.btnText}>Settings</Text>
                    <Icon name='md-chevron-forward-sharp' color='#007aff' size={20} />
                </TouchableOpacity>
            </View>

            <View style={styles.bottomNav}>
                <View style={styles.flexBetween}>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => { navigation.navigate('AddNew') }} style={styles.flexBetween}>
                        <Icon name={'ios-add-circle'} size={30} color='#007aff' />
                        <View style={styles.pd5} />
                        <Text style={styles.btnText}>Add a budget</Text>
                    </TouchableOpacity>

                    {
                        hasSaved ?
                            <TouchableOpacity style={styles.flexBetween} onPress={() => removeAll()}>
                                <Text style={styles.btnText}>Clear all</Text>
                            </TouchableOpacity>
                            : <View></View>
                    }
                </View>
            </View>

            <ScrollView style={{ padding: 20, marginBottom: 73 }}>

                <Text style={{ fontSize: 30, color: '#fff' }}>GHc {remaining}</Text>
                <View style={styles.pd10} />

                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => totalAmountActionRef.current?.setModalVisible()}
                    style={[styles.contentContainer, styles.flexBetween, styles.noBorder]}>
                    <Text style={styles.greyText}>Total amount</Text>
                    <View style={styles.flexBetween}>
                        <Text style={styles.greyText}>Ghc {total}</Text>
                        <View style={styles.pd2} />
                        <Icon name='md-chevron-forward-sharp' color='#93949b' size={20} />
                    </View>
                </TouchableOpacity>


                {
                    hasSaved ?
                        <View>
                            <View style={styles.pd10} />
                            <Text style={styles.descriptiveText}>MY BUDGETS</Text>

                            <View style={{ backgroundColor: '#1c1c1f', borderRadius: 10, }}>
                                {
                                    bugets.map(
                                        (buget, index) => {
                                            const percentage = ((100 * buget.used) / buget.amount).toFixed(0)

                                            return <View key={index}>
                                                <TouchableOpacity
                                                    activeOpacity={0.6}
                                                    style={[styles.contentContainer, styles.flexBetween]}
                                                    onPress={() => { navigation.navigate('ViewPlan', { 'buget': buget }) }}>
                                                    <View style={{ maxWidth: 150 }}>
                                                        <Text numberOfLines={1} style={styles.text}>{buget.name}</Text>
                                                    </View>
                                                    {percentage > 50 ?
                                                        <Text style={[styles.errorText, styles.smText]}>{percentage}% used</Text> :
                                                        <Text style={[styles.succText, styles.smText]}>{percentage}% used</Text>
                                                    }
                                                    <Text style={styles.text}>Ghc {buget.used}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        }
                                    )
                                }
                            </View>
                        </View>
                        : <View style={{ padding: 30, paddingVertical: 50, justifyContent: "center", alignItems: 'center', }}>
                            <Text style={styles.greyText}>You have no saved budget plans</Text>
                        </View>
                }

                <View style={styles.pd25} />
            </ScrollView >
        </View >
    )

    // else return <View style={styles.container}>
    //     <Text style={styles.text}>You have no set budgets</Text>
    // </View>
}

export default Home