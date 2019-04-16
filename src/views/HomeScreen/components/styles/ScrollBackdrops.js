import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    cardContainer: {
        width: 200,
        height: 120,
        backgroundColor: 'white',
        flexDirection: 'column',
        borderRadius: 3,
        marginRight: 2
    },
    cardImage: {
        width: "100%",
        height: 110,
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
