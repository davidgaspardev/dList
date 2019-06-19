/**
 * Header
 *
 * @author David Gaspar
 * @flow
 */
import React from 'react';
import { StatusBar, StyleSheet, Image, View, Text } from 'react-native';
import Colors from '../../resources/Colors';

/**
 * Stateless Component
 * 
 * @description Header
 * @returns {React$Element<any>}
 */
export default function Header(): React$Element<any> {
    // Destructuring assignment
    const { container } = style;

    // View
    return (
        <View>
            <StatusBar barStyle="dark-content" hidden={false} backgroundColor="white" translucent={true} />
            <View style={container}>
                <Title />
                <ActionSearch />
            </View>
            <Line />
        </View>
    );
}

/**
 * Stateless Component
 * 
 * @description Colorful title.
 * @returns {React$Element<any>}
 */ 
function Title(): React$Element<any> {
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
 * Statless Component
 * 
 * @description Open menu
 * @returns {React$Element<any>}
 */
function ActionSearch(): React$Element<any> {
    // Destrcuturing assignment
    const { actionSearch } = style;

    // View JSX
    return (
        <Image style={actionSearch} source={require('../resources/images/action_search.png')} />
    );
}

/**
 * Stateless Component
 * 
 * @description Line below the header.
 * @returns {Object}
 */
function Line(): React$Element<any> {
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

    // Header Component
    container: {
        flexDirection: 'row',
        marginTop: StatusBar.currentHeight,
        backgroundColor: 'white',
        alignItems: 'center',
        width: '100%',
        height: 48
    },

    // Title Component
    containerTitle: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 10
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24
    },

    actionSearch: {
        width: 30,
        height: 30,
        marginRight: 10
    },

    // Line Component
    containerLine: {
        flexDirection: 'row',
        width: '100%',
        height: 3
    }

});