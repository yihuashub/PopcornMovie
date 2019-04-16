import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    buttonGroup: {
        flexDirection: 'row',
        alignSelf: 'center',
    },
    button: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        alignSelf: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: 'blue',
    },
    buttonTextSmall: {
        fontSize: 15,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    player: {
        alignSelf: 'stretch',
    },
    listHeaderTitle:{
        backgroundColor: '#f8f8f8',
        height: 60,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft:16,
        marginBottom:2,
        //alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        zIndex:-2
    },
    listHeaderText: {

    },
    containers: {
        flex: 1,
        marginTop: 20,
        marginHorizontal: 16
    },
    thumbnailContainer: {
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    thumbnail: {
        width: 135,
        height: 90,
        borderRadius: 3
    },
    title: {
        flex: 1,
        fontWeight: '500',
        fontSize: 13,
        marginLeft: 10
    },
    icon:{
        marginRight: 10,
        color:'#b5b5b5',
        fontSize: 18,
    }
});
export default styles;
