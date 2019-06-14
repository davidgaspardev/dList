/**
 * Item 
 * 
 * @author David Gaspar
 */
import React, { PureComponent } from 'react';
import { TouchableOpacity, StyleSheet, Dimensions, Animated, TextInput, Image, Picker, View, Text } from 'react-native';
import { Strings } from '../resources/Strings';
import { createItem } from '../database/item';
import Colors from '../resources/Colors';

/**
 * Stateless Component 
 * 
 * @description Layout to add item.
 * @param {Obejct} props
 * @returns {Object}
 */
export class AddItem extends PureComponent {

	constructor(props) {
		super(props);

		// Init state
		this.state = {
			showAnimation: true,
			name: null,
			price: null,
			quantity: 1,
			unit: "u"
		}

		this.showAnimation = new Animated.Value(0);

		// Bind context
		this.moreQuantity = this.moreQuantity.bind(this);
		this.lessQuantity = this.lessQuantity.bind(this);
		this.saveItem = this.saveItem.bind(this);
		this.cancelItem = this.cancelItem.bind(this);
	}

	render() {
		// Destructuring assignment
		const { moreQuantity, lessQuantity } = this;
		const { addItem, addItemBox, addItemTextInput, addItemControlBar, addItemControl, addItemControlCancel, addItemControlSave } = style;

		// View JSX
		return (
			<Animated.View style={[ addItem, { opacity: this.showAnimation }]} >
				<View style={addItemBox} >

					<Text>{Strings.textTitle}</Text>
				
					<TextInput 
						style={addItemTextInput} 
						onChangeText={name => this.setState({name})} 
						value={this.state.name} 
						placeholder={Strings.textInputName}
						numberOfLines={1}
						maxLength={40} />

					<TextInput 
						style={addItemTextInput} 
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

						<Picker 
							style={{ flex: 1 }}
							selectedValue={this.state.unit}
							onValueChange={item => this.setState({ unit: item })}>

							<Picker.Item label="unidade" value="u" />
							<Picker.Item label="grama" value="g" />
							<Picker.Item label="litro" value="l" />

						</Picker>

					</View>

					<View style={addItemControlBar} >

						<TouchableOpacity 
							style={[ addItemControl, addItemControlCancel ]} 
							onPress={this.cancelItem} >
							<Text style={{color: 'white'}}>{Strings.textCancel.toUpperCase()}</Text>
						</TouchableOpacity>

						<TouchableOpacity 
							style={[ addItemControl, addItemControlSave ]}
							onPress={this.saveItem} >
							<Text style={{color: 'white'}}>{Strings.textSave.toUpperCase()}</Text>
						</TouchableOpacity>

					</View>

				</View>
			</Animated.View>
		);
	}

	componentDidMount() {
		// Destructuring assignment
		const { showAnimation } = this.state;
		if(showAnimation) {
			this.state.showAnimation = !showAnimation;
			Animated.timing(this.showAnimation, {
				toValue: 1,
				duration: 500,
				useNativeDriver: true,      
			  }).start();
		}
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
			Animated.timing(this.showAnimation, {
				toValue: 0,
				duration: 500,
				useNativeDriver: true
			}).start(() => {
				eventCloseAddItem();
			});
		}).catch((error) => {
			// Item don't saved
			console.log(error);
			eventCloseAddItem();
		});


	}

	cancelItem() {
		// Destructuring assignment
		const { eventCloseAddItem } = this.props;

		Animated.timing(this.showAnimation, {
			toValue: 0,
			duration: 500,
			useNativeDriver: true
		}).start(() => {
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
export class Item extends PureComponent {

	constructor(props) {
		super(props);

		// Init state
		this.state = {
			animation: new Animated.Value(0)
		}

	}
	
	render() {
		// Destructuring assignment
		const { name, price, quantity } = this.props;
		const { animation } = this.state;
		const { item } = style;

		// View
		return (
			<Animated.View style={[ item,{ width: animation }]} >
				<View>
				    <Text>{name}</Text>
				    <Text>{`R$: ${price}`}</Text>
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
 * Stateless Component
 * 
 * @param {Object} props 
 */
export function AddItemButton(props) {
	// Destructuring assignment
	const { eventShowAddItem } = props;
	const { addItemButton, addItemButtonImage } = style;

	// View
	return (
		<TouchableOpacity style={addItemButton} onPress={eventShowAddItem}>
			<Image style={addItemButtonImage} source={require('../resources/images/additem.png')} />
		</TouchableOpacity>
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
		justifyContent: 'center'
	},
	addItemBox: {
		width: (Dimensions.get('window').width - 70),
		paddingTop: 10,
		paddingRight: 10,
		paddingLeft: 10,
		borderRadius: 10,
		backgroundColor: 'white'
	},
	addItemTextInput: {
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
		backgroundColor: Colors.RED
	},
	addItemControlSave: {
		borderBottomRightRadius: 10,
		marginRight: -10,
		backgroundColor: Colors.GREEN
	},
	// Item
	item: {
		flexDirection: 'row',
		padding: 10,
		width: '100%',
		height: 65,
		borderBottomWidth: 1,
		borderBottomColor: 'lightgray'
	},
	// Add Item Button
	addItemButton: {
		position: 'absolute',
		bottom: 10,
		right: 10
	},
	addItemButtonImage: {
		width: 50,
		height: 50
	}
});