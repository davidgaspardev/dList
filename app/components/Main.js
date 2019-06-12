/**
 * Main 
 * 
 * @author David Gaspar
 */
import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Header from './Header';
import { AddItem } from './Item';
import { read } from '../database/realm';

/**
 * Stateful Component
 */
export default class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            visibleAddItem: false
        }

        console.log('DATA: ', read('Item'));

        this.showAddItem = this.showAddItem.bind(this);
        this.closeAddItem = this.closeAddItem.bind(this);

    }

    render() {
        return (
            <View style={style.container}>
                <Header eventShowAddItem={this.showAddItem} />
                { this.state.visibleAddItem && <AddItem eventCloseAddItem={this.closeAddItem} /> }
            </View>
        );
    }

    showAddItem() {
        this.setState({
            visibleAddItem: true
        });
    }

    closeAddItem() {
        this.setState({
            visibleAddItem: false
        });
    }
}

/**
 * Style Object
 */
const style = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1
    }
});