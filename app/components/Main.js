/**
 * Main
 * 
 * @author David Gaspar
 */
import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Header from './Header';

export default class Main extends Component {
    render() {
        return (
            <View style={style.container}>
                <Header />
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