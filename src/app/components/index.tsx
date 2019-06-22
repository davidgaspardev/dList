/**
 * dList | Main Component
 * 
 * @author David Gaspar
 */
import React, { Component } from 'react';
import { Main as Props} from './Props';
import { Main as State } from './State';
import { StyleSheet, View, Text } from 'react-native';

export default class Main extends Component<Props,State> {

    public render(): JSX.Element {
        // Destructuring addignment
        const { container }: any = style;

        // Return JSX Element
        return (
            <View style={container} >
                <Text>Hello World!</Text>
            </View>
        );
    }

}

const style: Object = StyleSheet.create({
    // Main style
    container: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});