/**
 * Item 
 * 
 * @author David Gaspar
 */
import React, { PureComponent } from 'react';
import { TouchableOpacity, StyleSheet, Dimensions, TextInput, View, Text } from 'react-native';
import { Strings } from '../resources/Strings';
import { createItem } from '../database/item';

/**
 * Stateless Component 
 * 
 * @param {Obejct} props 
 * @returns {Object}
 */
export class AddItem extends PureComponent {

	constructor(props) {
		super(props);

		// Init state
		this.state = {
			name: null,
			price: null,
			quantity: 1
		}

		// Bind context
		this.moreQuantity = this.moreQuantity.bind(this);
		this.lessQuantity = this.lessQuantity.bind(this);
		this.saveItem = this.saveItem.bind(this);
	}

	render() {
		// Destructuring assignment
		const { moreQuantity, lessQuantity } = this;
		const { eventCloseAddItem } = this.props;
		const { addItem, addItemBox, addItemInput, addItemControlBar, addItemControl, addItemControlCancel, addItemControlSave } = style;

		// View
		return (
			<View style={addItem} >
				<View style={addItemBox} >

					<Text>{Strings.textTitle}</Text>
				
					<TextInput 
						style={addItemInput} 
						onChangeText={name => this.setState({name})} 
						value={this.state.name} 
						placeholder={Strings.textInputName}
						numberOfLines={1}
						maxLength={40} />

					<TextInput 
						style={addItemInput} 
						onChangeText={price => this.setState({price})} 
						value={this.state.price} 
						placeholder={Strings.textInputPrice}
						numberOfLines={1}
						maxLength={6}
						keyboardType="numeric" />

					<Text>{Strings.textQuantity}</Text>

					<View style={addItemControlBar} >

						<TouchableOpacity 
							onPress={lessQuantity}
							style={addItemControl}>
							<Text>-</Text>
						</TouchableOpacity>

						<View style={addItemControl} >
							<Text>{this.state.quantity}</Text>
						</View>

						<TouchableOpacity 
							onPress={moreQuantity}
							style={addItemControl}>
							<Text>+</Text>
						</TouchableOpacity>

					</View>

					<View style={addItemControlBar} >

						<TouchableOpacity 
							style={[ addItemControl, addItemControlCancel ]} 
							onPress={eventCloseAddItem} >
							<Text style={{color: 'white'}}>{Strings.textCancel.toUpperCase()}</Text>
						</TouchableOpacity>

						<TouchableOpacity 
							style={[ addItemControl, addItemControlSave ]}
							onPress={this.saveItem} >
							<Text style={{color: 'white'}}>{Strings.textSave.toUpperCase()}</Text>
						</TouchableOpacity>

					</View>

				</View>
			</View>
		);
	}

	moreQuantity() {
		// Quantity++
		this.setState(previousState => {
			let nextState = {};
			nextState.quantity = previousState.quantity + 1;
			return nextState;
		});
	}

	lessQuantity() {
		// Quantity--
		this.setState(previousState => {
			let nextState = {};
			if(previousState.quantity > 1) nextState.quantity = previousState.quantity - 1;
			return nextState;
		});
	}

	primaryKey() {
		// Genarating ID
		return Math.random().toString(36).substr(2,20) + Date.now();
	}
	  

	saveItem() {
		// Destructuring assignment
		const { primaryKey } = this;
		const { eventCloseAddItem } = this.props;
		const { name, price, quantity } = this.state;

		// Item to save
		const item = {
			name,
			price: Number.parseInt(price),
			quantity: Number.parseInt(quantity),
			id: primaryKey()
		}

		// Save item in database
		createItem(item).then(() => {
			// Item saved
			eventCloseAddItem();
		}).catch((error) => {
			// Item don't saved
			console.log(error);
			eventCloseAddItem();
		});


	}
}

/**
 * Stateless Component
 * 
 * @param {Obejct} props
 * @return JSX
 */
export function Item(props) {
	// Destructuring assignment
	const { name, price } = props;
	const { item } = style;

	// View
	return (
		<View style={item} >
			<Text>{name}</Text>
			<Text>{price}</Text>
		</View>
	);

}

/**
 * Style Object
 */
const style = StyleSheet.create({
	// AddItem
	addItem: {
		position: 'absolute',
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		backgroundColor: 'rgba(  0,  0,  0, .5)',
		alignItems: 'center',
		justifyContent: 'center',
		//transform: [{ 'translate': [0,0,1] }]
	},
	addItemBox: {
		width: (Dimensions.get('window').width - 70),
		paddingTop: 10,
		paddingRight: 10,
		paddingLeft: 10,
		borderRadius: 10,
		backgroundColor: 'white'
	},
	addItemInput: {
		borderBottomWidth: 2,
		borderBottomColor: '#989898'
	},
	addItemTitle: {
		textAlign: 'center'
	},
	addItemControlBar: {
		flexDirection: 'row',
		marginTop: 10,
		height: 48 
	},
	addItemCount: {
		backgroundColor: 'black'
	},
	addItemControl: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	addItemControlCancel: {
		borderBottomLeftRadius: 10,
		marginLeft: -10,
		backgroundColor: 'red'
	},
	addItemControlSave: {
		borderBottomRightRadius: 10,
		marginRight: -10,
		backgroundColor: 'green'
	},

	// Item
	item: {
		width: '100%',
		height: 65
	}
});