/**
 * dList | Main Component
 * 
 * @author David Gaspar
 */
import React, { Component } from 'react';
import Header from './Header';
import { ToastAndroid, StyleSheet, View, Text } from 'react-native';
import ItemIO from '../helper/db';

/**
 * @interface
 */
import { Main as Props} from './Props';
import { Main as State } from './State';
import { Iitem } from '../helper/db/types';

/**
 * Stateful Component
 * 
 * @class
 * @extends {Component<Props,State>}
 */
export default class Main extends Component<Props,State> {

    /**
     * Main
     * 
     * @param {Props} props 
     */
    constructor(props: Props) {
        super(props);

    }

    /**
     * Render
     * 
     * @override
     * @returns {JSX.Element}
     */
    public render(): JSX.Element {
        // Destructuring addignment
        const { container }: any = style;

        // Return JSX Element
        return (
            <View style={container} >
                <Header />
                <Text>Hello World!</Text>
            </View>
        );
    }

}

const style: Object = StyleSheet.create({
    // Main style
    container: {
        flexDirection: 'column',
        flex: 1
    }
});