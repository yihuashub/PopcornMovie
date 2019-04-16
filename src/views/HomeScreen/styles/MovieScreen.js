import {Dimensions, Platform, StyleSheet} from 'react-native';

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
    progressBar: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    readMore:{
        backgroundColor: '#f8f8f8',
        height: 40,
        marginTop:5,
        paddingTop: 5,
        paddingBottom: 5,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.2,
        zIndex:-2
    },
    readMoreIcon:{
        color:'#b5b5b5',
        fontSize: 18,
    }
});

export default styles;
