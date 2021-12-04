import { Dimensions, Platform, PlatformColor, StyleSheet } from "react-native";

export default styles = StyleSheet.create({
    appBar: {
        backgroundColor: '#000',
        paddingVertical: Platform.OS === 'ios' ? 70 : 30,
        paddingHorizontal: 20,
        paddingBottom: 10,

        paddingTop: Platform.OS === 'ios' ? 100 : 60,

        // height: Platform.OS === 'ios' ? 120 : 83,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // borderBottomColor: '#24242666',
        // borderBottomWidth: 1
    },

    backAppBar: {
        paddingTop: Platform.OS === 'ios' ? 60 : 30,
    },

    appBarTitle: {
        fontWeight: 'bold',
        fontSize: 30,
        color: '#fff'
    },

    appBarPageTitle: {
        fontWeight: 'bold',
        fontSize: 17,
        color: '#fff'
    },

    bottomNav: {
        zIndex: 1000,
        padding: 20,
        paddingVertical: 20,
        position: 'absolute',
        bottom: 0,
        width: Dimensions.get('window').width,
    },

    btnText: { color: '#007aff' },

    errBtnText: { color: '#ff0100' },

    greyText: { color: '#93949b', },

    smText: { fontSize: 13 },

    errorText: { color: '#ff0100' },

    succText: { color: '#00f026' },

    text: { color: '#fff' },

    pd2: { padding: 2 },

    pd5: { padding: 5 },

    pd20: { padding: 20 },

    pd10: { padding: 10 },

    pd15: { padding: 15 },

    pd25: { padding: 25 },

    sp10: { height: 10, width: 10 },

    sp20: { height: 20, width: 20 },

    sp5: { height: 5, width: 5 },

    boldText: { fontWeight: 'bold', color: '#fff' },

    noBorder: {
        borderTopWidth: 0,
        borderTopColor: '#ffffff00',
        borderBottomWidth: 0,
        borderBottomColor: '#ffffff00',
    },

    textAlignCenter: { textAlign: 'center' },

    descriptiveText: {
        paddingBottom: 10,
        paddingLeft: 20,
        fontSize: 13,
        color: '#93949b',
        lineHeight: 20
    },

    input: {
        backgroundColor: '#1c1c1f',
        color: '#fff',
        // borderColor: '#24242422',
        // borderWidth: 1,
        borderRadius: 9,
        paddingVertical: 8,
        paddingHorizontal: 15
    },

    flexEnd: { alignItems: 'flex-end' },

    flexBetween: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    contentContainer: {
        backgroundColor: '#1c1c1f',
        padding: 20,
        paddingVertical: 15,
        borderRadius: 13,
        borderBottomColor: '#24242688',
        borderBottomWidth: 1,
    },

    negativeSpace: {
        backgroundColor: '#F5F6FA',
        padding: 20,
        // borderBottomColor: '#f1f1f1',
        // borderBottomWidth: 1,
        // borderTopColor: '#f1f1f1',
        // borderTopWidth: 1,
    },

    container: {
        flex: 1,
        backgroundColor: '#000',
        // backgroundColor: '#F5F6FA',
    },

    greyContainer: { backgroundColor: '#F5F6FA' },
})