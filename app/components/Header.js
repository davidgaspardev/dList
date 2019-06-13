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
 * @description Header
 * @param {Object} props
 * @returns {Object}
 */
export default function Header(props) {
    // Destructuring assignment
    const { container } = style;

    // View
    return (
        <View>
            <View style={container}>
                <Title />
            </View>
            <Line />
        </View>
    );
}

/**
 * Stateless Component
 * 
 * @description Colorful title.
 * @returns {Objects}
 */ 
function Title() {
    // Destructuring assignment
    const { containerTitle, title } = style;

    // View JSX
    return (
        <View style={containerTitle}>
            <Text style={[ title ,{ color: Colors.RED    }]}>d</Text>
            <Text style={[ title ,{ color: Colors.ORANGE }]}>L</Text>
            <Text style={[ title ,{ color: Colors.YELLOW }]}>i</Text>
            <Text style={[ title ,{ color: Colors.GREEN  }]}>s</Text>
            <Text style={[ title ,{ color: Colors.BLACK  }]}>t</Text>
        </View>
    );
}

/**
 * Stateless Component
 * 
 * @description Line below the header.
 * @returns {Object}
 */
function Line() {
    // Destructuring assignment
    const { containerLine } = style;

    // View
    return (
        <View style={containerLine}>
            <View style={{ flex: 1, backgroundColor: Colors.RED    }}/>
            <View style={{ flex: 1, backgroundColor: Colors.ORANGE }}/>
            <View style={{ flex: 1, backgroundColor: Colors.YELLOW }}/>
            <View style={{ flex: 1, backgroundColor: Colors.GREEN  }}/>
            <View style={{ flex: 1, backgroundColor: Colors.BLACK  }}/>
        </View>
    );
}

/**
 * Style Obejct
 */
const style = StyleSheet.create({
    container: {
        width: '100%',
        height: 48,
        justifyContent: 'center'

    },
    containerTitle: {
        flexDirection: 'row',
        paddingLeft: 10
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    containerLine: {
        flexDirection: 'row',
        width: '100%',
        height: 3
    }
});