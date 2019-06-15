/**
 * Add Item 
 * 
 * @author David Gaspar
 */
import React, { PureComponent } from 'react';
import { TouchableOpacity, StyleSheet, Dimensions, StatusBar, Animated, TextInput, Image, Picker, View, Text } from 'react-native';
import { createItem } from '../database/item';
import Strings from '../resources/Strings';
import Colors from '../resources/Colors';

/**
 * Stateless Component 
 * 
 * @description Layout to add item.
 * @param {Obejct} props
 * @returns {Object}
 */
export default class AddItem extends PureComponent {

	constructor(props) {
		super(props);

		// Init state
		this.state = {
            showAnimation: true,
            targetAnimation: new Animated.Value(0), 
            
            // Item properties
			name: String(),
			price: String(),
			quantity: Number(1),
			unit: Strings.pickerItemUnit,
			category: Strings.pickerItemOthers
		}

		// Bind context
		this.moreQuantity = this.moreQuantity.bind(this);
		this.lessQuantity = this.lessQuantity.bind(this);
		this.updateUnit = this.updateUnit.bind(this);
		this.saveItem = this.saveItem.bind(this);
		this.cancelItem = this.cancelItem.bind(this);
	}

	render() {
		// Destructuring assignment
        const { moreQuantity, lessQuantity } = this;
        const { targetAnimation } = this.state;
		const { addItem, addItemBox, addItemTitle, addItemTextInputIcon, addItemTextInput, addItemControlBar, addItemControl, addItemControlCancel, addItemControlSave } = style;

		// View JSX
		return (
			<Animated.View style={[ addItem, { opacity: targetAnimation }]} >
				<StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} hidden={false} />
				<View style={addItemBox} >

					<Text style={addItemTitle}>{Strings.textTitle}</Text>
				
					<View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>

						<Image style={addItemTextInputIcon} source={require('../resources/images/textinput_name.png')} />

						<TextInput 
							style={addItemTextInput} 
							onChangeText={name => this.setState({name})} 
							value={this.state.name} 
							placeholder={Strings.textInputName}
							numberOfLines={1}
							maxLength={40} />

					</View>

					<View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>

						<Image style={addItemTextInputIcon} source={require('../resources/images/textinput_price.png')} />

						<TextInput 
							style={addItemTextInput} 
							onChangeText={price => this.setState({price})} 
							value={this.state.price} 
							placeholder={Strings.textInputPrice}
							numberOfLines={1}
							maxLength={6}
							keyboardType="numeric" />

					</View>

					<Text style={addItemTitle}>{Strings.textQuantity}</Text>

					<View style={[ addItemControlBar,{ alignItems: 'center' }]} >

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

					<Picker 
							selectedValue={this.state.unit}
							onValueChange={this.updateUnit}>

							<Picker.Item label={Strings.pickerItemUnit} value={Strings.pickerItemUnit} />
							<Picker.Item label={Strings.pickerItemKg}   value={Strings.pickerItemKg} />
							<Picker.Item label={Strings.pickerItemLiter} value={Strings.pickerItemLiter} />

						</Picker>

					<Text style={addItemTitle}>{Strings.textCategory}</Text>

					<View style={[ addItemControlBar,{ alignItems: 'center' }]} >

						<Picker 
							style={{ flex: 1 }}
							selectedValue={this.state.category}
							onValueChange={category => this.setState({ category })}>

							<Picker.Item label={Strings.pickerItemOthers} value={Strings.pickerItemOthers} />
							<Picker.Item label={Strings.pickeritemMeat} value={Strings.pickerItemMeat} />
							<Picker.Item label={Strings.pickerItemVegetables} value={Strings.pickerItemVegetables} />

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
        const { targetAnimation } = this.state;
        
        // Animation with opcity
		Animated.timing(targetAnimation, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,      
          }).start();
	}

	updateUnit(unit) {
		if(unit === Strings.pickerItemUnit) {
			unit = { unit, quantity: Math.trunc(this.state.quantity) }
		} else {
			unit = { unit };
		}

		this.setState(unit);
	}

	moreQuantity() {
		// Quantity++
		this.setState(previousState => {
			const more = previousState.unit === Strings.pickerItemUnit ? 1 : 0.25;
			let nextState = {};
			nextState.quantity = previousState.quantity + more;
			return nextState;
		});
	}

	lessQuantity() {
		// Quantity--
		this.setState(previousState => {
			const less = previousState.unit === Strings.pickerItemUnit ? 1 : 0.25;
			let nextState = {};
			if(previousState.quantity > 1) nextState.quantity = previousState.quantity - less;
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
		const { name, price, quantity, unit, category, targetAnimation } = this.state;

		// Item to save
		const item = {
			id: primaryKey(),
			name,
			price: Number.parseInt(price),
			quantity: Number.parseInt(quantity),
			unit,
			category
		}

		

		// Save item in database
		createItem(item).then(() => {
			// Item saved
			Animated.timing(targetAnimation, {
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
        const { targetAnimation } = this.state;

		Animated.timing(targetAnimation, {
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
	addItemTextInputIcon: {
		width: 25,
		height: 25,
		marginTop: 5,
		marginRight: 10,
		justifyContent: 'center',
		alignItems: 'center'
	},
	addItemTextInput: {
		flex: 1,
		height: 40,
		borderBottomWidth: 2,
		borderBottomColor: Colors.BLACK
	},
	addItemTitle: {
	  textTransform: 'uppercase',
		textAlign: 'center',
		fontWeight: 'bold'
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