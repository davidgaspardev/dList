/**
 * Item 
 * 
 * @author David Gaspar
 */
import React, { PureComponent } from 'react';
import { TouchableOpacity, StyleSheet, Dimensions, StatusBar, Animated, TextInput, Image, Picker, View, Text } from 'react-native';
import Colors from '../resources/Colors';

/**
 * Stateless Component
 * 
 * @param {Obejct} props
 * @return JSX
 */
export default class Item extends PureComponent {

	constructor(props) {
		super(props);

		// Init state
		this.state = {
			animation: new Animated.Value(0)
		}

	}
	
	render() {
		// Destructuring assignment
		const { name, price, quantity, unit, category } = this.props;
		const { animation } = this.state;
		const { item, itemDetail, itemDetailText } = style;

		// View
		return (
			<Animated.View style={[ item,{ width: animation }]} >
				<View>
				    <Text>{name}</Text>
				    <Text>{`R$: ${price}`}</Text>
				</View>
				<View style={itemDetail}>
					<Text style={[ itemDetailText,{ backgroundColor: Colors.BLACK }]}>{category}</Text>
					<Text style={[ itemDetailText,{ backgroundColor: Colors.YELLOW }]}>{`${quantity} ${unit}`}</Text>
				</View>
			</Animated.View>
		);
	}

	componentDidMount() {
		// Destructuring assignment
		const { animation } = this.state;

		Animated.spring(animation, {
			toValue: Dimensions.get('window').width,
			//useNativeDriver: true
		}).start();
	}

}

/**
 * Style Object
 */
const style = StyleSheet.create({
	// Item
	item: {
		padding: 10,
		width: '100%',
		borderBottomWidth: 1,
		borderBottomColor: 'lightgray'
	},
	itemDetail: {
		flexDirection: 'row-reverse'
	},
	itemDetailText: {
		marginLeft: 10,
		padding: 10,
		color: 'white',
		fontWeight: 'bold',
		borderRadius: 20
	}
});