import React, { PropTypes} from 'react';
import {
    Image, Linking, ScrollView,
    TouchableOpacity,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {
    Text,
    Button,
} from "native-base";
import styles from './styles/InfoSectionCard';
import {withNavigation} from "react-navigation";

const iconStar = (<Icon name="md-star" size={16} color="#F5B642" />);
const drawerImage = require("../../../../assets/play_button.png");

const InfoSectionCard = ({ info, viewMovie, genresList, props, trailers}) => (
	<View>
		<Image source={{ uri: `https://image.tmdb.org/t/p/w780/${(info.backdrop_path || info.poster_path)}` }} style={styles.imageBackdrop} />
		<LinearGradient colors={['rgba(0, 0, 0, 0.5)', 'rgba(0,0,0, 0.7)', 'rgba(0,0,0, 0.8)']} style={styles.linearGradient} />
		<View style={styles.cardContainer}>
            {(trailers !== undefined || trailers != null) ?
                (
                    <TouchableOpacity activeOpacity={0.8} onPress={() => { props.navigation.navigate({
                        routeName: 'VideoScreen',
                        params: { trailersList:trailers },
                        key: 'Video' + info.id
                    })}}>
                        <Image source={{ uri: `https://image.tmdb.org/t/p/w185/${info.poster_path}` }} style={styles.cardImage} />
                        <Image source={drawerImage} style={styles.playImage} />
					</TouchableOpacity>
                )
                :(
                    <Image source={{ uri: `https://image.tmdb.org/t/p/w185/${info.poster_path}` }} style={styles.cardImage} />
                )
            }


			<View style={styles.cardDetails}>
				<Text style={styles.cardTitle} numberOfLines={2}>
					{info.title}
				</Text>
                <Text style={styles.cardOriginalTitle} numberOfLines={1}>
                    {info.original_title}
                </Text>
                <View style={styles.cardGenre}>
                    {genresList.map(genre => <Text style={styles.cardGenreItem} key={genre.id}>{genre.name}</Text>)}
                </View>
				<View style={styles.cardNumbers}>
					<View style={styles.cardStar}>
						{iconStar}
						<Text style={styles.cardStarRatings}>{info.vote_average}</Text>
					</View>
					<Text style={styles.cardRunningHours} />
				</View>
                <Text style={styles.cardDescription} numberOfLines={1}>
                    影片时长：{info.runtime} 分钟
                </Text>
				<Text style={styles.cardDescription} numberOfLines={1}>
					上映日期：{info.release_date}
				</Text>
				<View  style={{paddingTop: 10}}>
                    <Button rounded onPress={viewMovie}>
                        <Text>立即购票</Text>
                    </Button>
				</View>
			</View>
		</View>
	</View>
);


export default withNavigation(InfoSectionCard);
