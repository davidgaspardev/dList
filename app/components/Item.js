/**
 * Item 
 * 
 * @author David Gaspar
 */
import React, { PureComponent } from 'react';
import { TouchableOpacity, StyleSheet, Dimensions, TextInput, View, Text } from 'react-native';
import { Strings } from '../resources/Strings';
import { write } from '../database/realm';

/**
 * Stateless Component 
 * 
 * @param { obejct } props 
 * @returns JSX
 */
export class AddItem extends PureComponent {

	constructor(props) {
		super(props);

		this.state = {
			name: null,
			price: null
		}

		this.saveItem = this.saveItem.bind(this);
	}

	render() {
	    const { addItem, addItemBox, addItemInput, addItemControlBar, addItemControl, addItemControlCancel, addItemControlSave } = style;

		return (
			<View style={addItem} >
				<View style={addItemBox} >

					<Text>{Strings.title}</Text>

					<TextInput 
						style={addItemInput} 
						onChangeText={name => this.setState({name})} 
						value={this.state.name} 
						placeholder={Strings.nameField}
						numberOfLines={1} />

					<TextInput 
						style={addItemInput} 
						onChangeText={price => this.setState({price})} 
						value={this.state.price} 
						placeholder={Strings.priceField}
						numberOfLines={1}
						keyboardType="numeric" />

					<View style={addItemControlBar} >

						<TouchableOpacity 
							style={[ addItemControl, addItemControlCancel ]} 
							onPress={this.props.eventCloseAddItem} >
							<Text style={{color: 'white'}}>{Strings.cancelButton.toUpperCase()}</Text>
						</TouchableOpacity>

						<TouchableOpacity 
							style={[ addItemControl, addItemControlSave ]}
							onPress={this.saveItem} >
							<Text style={{color: 'white'}}>{Strings.saveButton.toUpperCase()}</Text>
						</TouchableOpacity>

					</View>

				</View>
			</View>
		);
	}

	generateId() {
		return Math.random().toString(36).substr(2,20) + Date.now();
	}
	  

	saveItem() {
		const { name, price } = this.state;

		write('Item', { id: this.generateId(), name, price: Number.parseInt(price) }).then(() => {
			this.props.eventCloseAddItem();
		}).catch((error) => {
			console.log(error);
			this.props.eventCloseAddItem();
		});


	}
}

/**
 * Stateless Component
 * 
 * @param { obejct } props
 * @return JSX
 */
export function Item(props) {
	const { name, price } = props;
	const { item } = style;

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
	addItem: {
		position: 'absolute',
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		backgroundColor: 'rgba(  0,  0,  0, .5)',
		alignItems: 'center',
		justifyContent: 'center',
		//transform: [{'translate':[0,0,100]}]
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
	item: {
		width: '100%',
		height: 65
	}
});