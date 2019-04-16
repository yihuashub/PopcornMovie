import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    cardContainer: {
        height: 231,
        width: 135,
        backgroundColor: 'white',
        flexDirection: 'column',
        marginRight: 2,
        borderRadius: 3,
        paddingLeft: 15
    },
    cardImage: {
        width: 121,
        height: 165,
        borderRadius: 3,
    },
    cardTitleContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    cardTitle: {
        color: 'black',
        fontSize: 13,
        fontWeight: '500',
        textAlign: 'center',
        paddingHorizontal: 1
    },
    cardPlayTitle: {
        textAlign: 'center',
        paddingHorizontal: 1
    }
});

export default styles;
