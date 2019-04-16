import {Dimensions, Platform, StyleSheet} from 'react-native';

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
	progressBar: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
    wrapper: {
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
    image: {
        width,
        flex: 1
    },
    paginationStyle: {
        position: 'absolute',
        bottom: 10,
        right: 10
    },
    paginationText: {
        color: 'white',
        fontSize: 20
    }
});

export default styles;
