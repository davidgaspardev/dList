/**
 * Header
 *
 * @author David Gaspar
 */
import React from 'react';
import { TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import Colors from '../resources/Colors';

/**
 * Stateless Component
 * 
 * @param {Object} props
 * @returns {Object}
 */
export default function Header(props) {
    const { eventShowAddItem } = props;
    const { container, addItem } = style;

    return (
        <View style={container}>
            <Title />
            <TouchableOpacity onPress={eventShowAddItem}>
                <Text style={addItem}>+</Text>
            </TouchableOpacity>
        </View>
    );
}

/**
 * Stateless Component
 * 
 * @returns {Objects}
 */ 
function Title() {
    const { containerTitle, title } = style;

    return (
        <View style={containerTitle}>
            <Text style={[ title ,{ color: Colors.GREEN_FIRST  }]}>d</Text>
            <Text style={[ title ,{ color: Colors.GREEN_SECOND }]}>L</Text>
            <Text style={[ title ,{ color: Colors.GREEN_THIRD  }]}>i</Text>
            <Text style={[ title ,{ color: Colors.GREEN_FOURTH }]}>s</Text>
            <Text style={[ title ,{ color: Colors.GREEN_FIVETH }]}>t</Text>
        </View>
    );
}

/**
 * Style Obejct
 */
const style = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flexDirection: 'row',
        width: '100%',
        height: 48,
        //elevation: 5, 
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: Colors.GREEN_SIXTH
    },
    containerTitle: {
        paddingLeft: 20,
        flexDirection: 'row',
        flex: 1
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    addItem: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.GREEN_THIRD,
        padding: 10,
        marginRight: 10
    }
});