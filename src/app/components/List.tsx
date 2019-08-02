/**
 * List
 * 
 * @author David Gaspar
 */
import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';
import { Iitem } from '../helper/db/types';

/**
 * Stateful component
 * 
 * @class List
 * @extends {Component}
 */
export default class List extends Component {

    public render(): JSX.Element {

        // Return JSX.Element
        return (
            <View>

            </View>
        );
    }

}

/**
 * Stateless Component
 * 
 * @param {Iitem} item
 * @returns {JSX.Element} 
 */
function ListItem(item: Iitem): JSX.Element {
    // Destructuring assigment
    const { name }: Iitem = item;

    return (
        <View>

        </View>
    );
}