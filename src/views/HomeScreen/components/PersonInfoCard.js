/* eslint-disable new-cap */
import {
    findNodeHandle,
} from 'react-native';

import React, { Component} from 'react';
import {
	Image,
	Text,
	TouchableOpacity,
	View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView, VibrancyView } from 'react-native-blur';

import styles from './styles/PersonInfoCard';

const iconStar = <Icon name="md-star" size={16} color="#F5B642" />;

class PersonInfoCard extends Component {

	constructor(props) {
		super(props);
        this.state = { viewRef: null };
    }

    imageLoaded() {
        this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
    }
	render() {
		const { info, viewMovie } = this.props;
		return (

			<View style={{height:300}}>
                <View style={{height:148}}>
                    <Image
                        ref={(img) => { this.backgroundImage = img; }}
                        source={{ uri: `https://image.tmdb.org/t/p/w780/${(info.profile_path)}`}}
                        style={styles.imageBackdrop}
                        onLoadEnd={this.imageLoaded.bind(this)}
                    />
                    <BlurView
                        style={styles.absolute}
                        viewRef={this.state.viewRef}
                        blurType="light"
                        blurAmount={5}
                    />
                    <LinearGradient colors={['rgba(0, 0, 0, 0.2)', 'rgba(0,0,0, 0.2)', 'rgba(0,0,0, 0.7)']} style={styles.linearGradient} />
                </View>
				<View  style={styles.cardContainer}>
                    <Image source={{ uri: `https://image.tmdb.org/t/p/w185/${info.profile_path}` }} style={styles.cardImage} />

                    <View style={styles.cardDetails}>
                        <Text
                            style={styles.cardTitle}
                            numberOfLines={3}>
                            {info.name}
                        </Text>
                        <View style={styles.cardGenre}>
                            <Text style={styles.cardGenreItem}>{info.birthday}</Text>
                        </View>
                        <View style={styles.cardNumbers}>
                            <View style={styles.cardStar}>
                                {iconStar}
                                <Text style={styles.cardStarRatings}>{info.gender}</Text>
                            </View>
                            <Text style={styles.cardRunningHours} />
                        </View>
                        <Text style={styles.cardDescription} numberOfLines={1}>
                            {info.place_of_birth}
                        </Text>
                    </View>
				</View>

			</View>
		);
	}
}

export default PersonInfoCard;
