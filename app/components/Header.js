import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Colors from '../res/Colors';

export default function Header() {
    return (
        <View style={style.container}>
            <Title />
        </View>
    );
}

function Title() {
    return (
        <View style={style.containerTitle}>
            <Text style={[ style.title ,{ color: Colors.GREEN_FIRST  }]}>d</Text>
            <Text style={[ style.title ,{ color: Colors.GREEN_SECOND }]}>L</Text>
            <Text style={[ style.title ,{ color: Colors.GREEN_THIRD  }]}>i</Text>
            <Text style={[ style.title ,{ color: Colors.GREEN_FOURTH }]}>s</Text>
            <Text style={[ style.title ,{ color: Colors.GREEN_FIVETH }]}>t</Text>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flexDirection: 'row',
        width: '100%',
        height: 48,
        elevation: 5,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: Colors.GREEN_SIXTH
    },
    containerTitle: {
        paddingLeft: 20,
        flexDirection: 'row'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    }
}); 