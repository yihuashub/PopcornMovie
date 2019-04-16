import React, { Component } from "react";
import { Text } from "native-base";
import {Image, TouchableOpacity, View} from "react-native";
import styles from "./styles/ScrollCrewCard";
import { withNavigation } from 'react-navigation';

class ScrollCrewCard extends Component {
    render() {
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={() => { this.props.navigation.navigate({
                routeName: 'MovieScreen',
                params: { id:this.props.info.id },
                key: 'Movie' + this.props.info.id
            })}}>
                <View style={styles.cardContainer}>
                    <Image source={{ uri: `https://image.tmdb.org/t/p/w185/${this.props.info.poster_path}` }} style={styles.cardImage} />
                    <View style={styles.cardTitleContainer}>
                        <Text style={styles.cardTitle} numberOfLines={2}>
                            {this.props.info.title}
                        </Text>
                    </View>
                    <View style={styles.cardTitleContainer}>
                        <Text note style={styles.cardSubTitle} numberOfLines={2}>
                            {this.props.info.character ? '饰演: ' + this.props.info.character : this.props.info.job}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

export default withNavigation(ScrollCrewCard);
