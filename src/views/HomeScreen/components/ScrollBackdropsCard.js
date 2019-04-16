import React, { Component } from "react";
import {Image, TouchableOpacity, View} from "react-native";
import styles from "./styles/ScrollBackdrops";
import { withNavigation } from 'react-navigation';
import ImageView from 'react-native-image-view';


class ScrollBackdropsCard extends Component {
    state = {
        isImageViewVisible: false,
    };
    render() {
        const images = [
            {
                source: {
                    uri: `https://image.tmdb.org/t/p/w780/${this.props.info.file_path}`,
                },
                title: 'Paris',
                width: 806,
                height: 720,
            },
        ];
        const {isImageViewVisible} = this.state;

        return (
            <View>
                <TouchableOpacity activeOpacity={0.8} onPress={() => {
                    this.setState({
                        isImageViewVisible: true,
                    });
                }}>
                    <View style={styles.cardContainer}>
                        <Image source={{ uri: `https://image.tmdb.org/t/p/w185/${this.props.info.file_path}` }} style={styles.cardImage} />
                    </View>
                </TouchableOpacity>
                <ImageView
                    glideAlways
                    images={images}
                    imageIndex={0}
                    animationType="fade"
                    isVisible={isImageViewVisible}
                    renderFooter={this.renderFooter}
                    onClose={() => this.setState({isImageViewVisible: false})}
                />
            </View>
        );
    }
}

export default withNavigation(ScrollBackdropsCard);
