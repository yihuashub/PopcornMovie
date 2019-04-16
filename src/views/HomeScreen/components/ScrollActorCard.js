import React, { Component } from "react";
import {Body, Text} from "native-base";
import {Image, TouchableOpacity, View} from "react-native";
import styles from "./styles/ScrollActorCard";
import { withNavigation } from 'react-navigation';

class ScrollActorCard extends Component {
    render() {
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={() => { this.props.navigation.navigate({
                routeName: 'PersonScreen',
                params: { id:this.props.info.id },
                key: 'Person' + this.props.info.id
            })}}>
                <View style={styles.cardContainer}>
                    <Image source={{ uri: `https://image.tmdb.org/t/p/w185/${this.props.info.profile_path}` }} style={styles.cardImage} />
                    <View style={styles.cardTitleContainer}>
                        <Text style={styles.cardTitle} numberOfLines={2}>
                            {this.props.info.name}
                        </Text>
                        <Text style={styles.cardPlayTitle} note numberOfLines={1}>
                            {this.props.info.character}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

export default withNavigation(ScrollActorCard);
