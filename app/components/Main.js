/**
 * Main
 * 
 * @author David Gaspar
 */
import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class Main extends Component {
    render() {
        return (
            <View style={ style.container } >
                <Text>Hello World!</Text>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1
    }
});