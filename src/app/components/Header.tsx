/**
 * Header
 * 
 * @author David Gaspar
 */
import React from 'react';
import { StyleSheet, StatusBar, View, Text } from 'react-native';
import { Colors } from '../res/Colors';

/**
 * Stateless Component
 * 
 * @returns {JSX.Element}
 */
export default function Header(): JSX.Element {
    // Destructuring
    const { headerContainer }: any = style;

    // Return JSX Element
    return (
        <View>
            <StatusBar barStyle='dark-content' backgroundColor='transparent' hidden={false} />
            <View style={headerContainer} >
                <Title />
            </View>
            <Line />
        </View>
    );
}

/**
 * Stateless Component
 * 
 * @returns {JSX.Element}
 */
function Title(): JSX.Element {
    // Destructuring assignment
    const { titleContainer, titleText }: any = style;

    // Return JSX Element
    return (
        <View style={titleContainer} >
            <Text style={[ titleText,{ color: Colors.RED }]} >d</Text>
            <Text style={[ titleText,{ color: Colors.ORANGE }]} >L</Text>
            <Text style={[ titleText,{ color: Colors.YELLOW }]} >i</Text>
            <Text style={[ titleText,{ color: Colors.GREEN }]} >s</Text>
            <Text style={[ titleText,{ color: Colors.BLACK }]} >t</Text>
        </View>
    );
}

/**
 * Stateless Component
 * 
 * @returns {JSX.Element}
 */
function Line(): JSX.Element {
    // Destrcuturing assigment
    const { lineContainer }: any = style;

    // Return JSX Element
    return (
        <View style={lineContainer} >
            <View style={{ flex: 1, backgroundColor: Colors.RED }} />
            <View style={{ flex: 1, backgroundColor: Colors.ORANGE }} />
            <View style={{ flex: 1, backgroundColor: Colors.YELLOW }} />
            <View style={{ flex: 1, backgroundColor: Colors.GREEN }} />
            <View style={{ flex: 1, backgroundColor: Colors.BLACK }} />
        </View>
    );
}

const style: Object = StyleSheet.create({
    // Header
    headerContainer: {
        height: 48,
        justifyContent: 'center'
    },
    // Title
    titleContainer: {
        flexDirection: 'row',
        marginLeft: 10
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 24
    },
    // Line
    lineContainer: {
        flexDirection: 'row',
        width: '100%',
        height: 3
    }
});