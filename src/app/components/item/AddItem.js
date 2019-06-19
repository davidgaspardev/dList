/**
 * Add Item
 *
 * @author David Gaspar
 * @flow
 */
import React, { PureComponent } from "react";
import type { AddItem as Props } from '../Properties';
import type { AddItem as State } from '../States';
import {
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
  TextInput,
  Animated,
  Picker,
  Image,
  View,
  Text
} from "react-native";
import { createItem } from "../../database/item";
import Strings from "../../resources/Strings";
import Styles from "../../resources/Styles";
import Colors from "../../resources/Colors";

/**
 * Stateless Component
 *
 * @description Layout to add item.
 * @param {Obejct} props
 * @returns {Object}
 */
export default class AddItem extends PureComponent<Props, State> {

  constructor(props: Props): void {
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
    };

    // Bind context
    (this: any).TextInputCircle = this.TextInputCircle.bind(this); // View JSX
    (this: any).QuantityControl = this.QuantityControl.bind(this); // View JSX
    (this: any).updateName = this.updateName.bind(this);
    (this: any).updatePrice = this.updatePrice.bind(this);
    (this: any).moreQuantity = this.moreQuantity.bind(this);
    (this: any).lessQuantity = this.lessQuantity.bind(this);
    (this: any).updateUnit = this.updateUnit.bind(this);
    (this: any).updateCategory = this.updateCategory.bind(this);
    (this: any).saveItem = this.saveItem.bind(this);
    (this: any).cancelItem = this.cancelItem.bind(this);
  }

  render(): React$Element<any> {
    // Destructuring assignment
    const {
      updateName,
      updatePrice,
      updateCategory,
      TextInputCircle,
      QuantityControl
    }: any = this;
    const { name, price, targetAnimation }: any = this.state;
    const {
      addItem,
      addItemBox,
      addItemTitle,
      addItemControlBar,
      addItemControl,
      addItemControlCancel,
      addItemControlSave
    }: any = style;

    // View JSX
    return (
      <Animated.View style={[addItem, { opacity: targetAnimation }]}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent={true}
          hidden={false}
        />
        <View style={addItemBox}>
          <Text style={addItemTitle}>{Strings.textTitle}</Text>

          <TextInputCircle
            // Input to storage name (state)
            value={name}
            onChangeText={updateName}
            maxLength={10}
            placeholder={Strings.textInputName}
          />

          <TextInputCircle
            // Input to storage price (state)
            value={price}
            onChangeText={updatePrice}
            maxLength={6}
            placeholder={Strings.textInputPrice}
            keyboardType="numeric"
          />

          <Text style={addItemTitle}>{Strings.textQuantity}</Text>

          <QuantityControl />

          <Text style={addItemTitle}>{Strings.textCategory}</Text>

          <View
            style={{
              borderRadius: 20,
              backgroundColor: Colors.YELLOW,
              marginBottom: 10
            }}
          >
            <Picker
              style={{ marginLeft: 10, height: 35, color: Colors.BLACK }}
              selectedValue={this.state.category}
              onValueChange={updateCategory}
            >
              <Picker.Item
                label={Strings.pickerItemOthers}
                value={Strings.pickerItemOthers}
              />
              <Picker.Item
                label={Strings.pickerItemMeat}
                value={Strings.pickerItemMeat}
              />
              <Picker.Item
                label={Strings.pickerItemVegetables}
                value={Strings.pickerItemVegetables}
              />
            </Picker>
          </View>

          <View style={addItemControlBar}>
            <TouchableOpacity
              style={[addItemControl, addItemControlCancel]}
              onPress={this.cancelItem}
            >
              <Text style={{ color: "white" }}>
                {Strings.textCancel.toUpperCase()}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[addItemControl, addItemControlSave]}
              onPress={this.saveItem}
            >
              <Text style={{ color: "white" }}>
                {Strings.textSave.toUpperCase()}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    );
  }

  TextInputCircle(props: any): React$Element<any> {
    // Destrcuturing
    const { containerHorizontal } = Styles; // Generic styles
    const { addItemTextInput, addItemTextInputIcon } = style; // Specific styles

    // Return JSX
    return (
      <View style={containerHorizontal}>
        <Image
          style={addItemTextInputIcon}
          source={
            props.placeholder === Strings.textInputName
              ? require("../../resources/images/textinput_name.png")
              : require("../../resources/images/textinput_price.png")
          }
        />

        <TextInput {...props} style={addItemTextInput} numberOfLines={1} />
      </View>
    );
  }

  QuantityControl(): React$Element<any> {
    // Destructuring assignment
    const { moreQuantity, lessQuantity, updateUnit }: any = this;
    const { quantity, unit }: any = this.state;
    const { containerHorizontal }: any = Styles; // Generic styles
    const { addItemControl, addItemQuantityControl }: any = style; // Especific styles

    // Return JSX
    return (
      <View
        style={[
          containerHorizontal,
          { borderRadius: 20, backgroundColor: Colors.YELLOW }
        ]}
      >
        <View style={[containerHorizontal, addItemQuantityControl]}>
          <TouchableOpacity onPress={lessQuantity} style={addItemControl}>
            <Text style={{ color: Strings.BLACK }}>-</Text>
          </TouchableOpacity>

          <View style={addItemControl}>
            <Text style={{ color: Strings.BLACK }}>{quantity}</Text>
          </View>

          <TouchableOpacity onPress={moreQuantity} style={addItemControl}>
            <Text style={{ color: Strings.BLACK }}>+</Text>
          </TouchableOpacity>
        </View>

        <Picker
          style={{ marginLeft: 10, flex: 1, height: 35 }}
          selectedValue={unit}
          onValueChange={updateUnit}
        >
          <Picker.Item
            color={Colors.BLACK}
            label={Strings.pickerItemUnit}
            value={Strings.pickerItemUnit}
          />
          <Picker.Item
            color={Colors.BLACK}
            label={Strings.pickerItemKg}
            value={Strings.pickerItemKg}
          />
          <Picker.Item
            color={Colors.BLACK}
            label={Strings.pickerItemLiter}
            value={Strings.pickerItemLiter}
          />
        </Picker>
      </View>
    );
  }

  componentDidMount(): void {
    // Destructuring assignment
    const { targetAnimation }: any = this.state;

    // Animation with opcity
    Animated.timing(targetAnimation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  }

  updateName(name: string): void {
    this.setState({ name });
  }

  updatePrice(price: string): void {
    price = price.replace(".", "");
    if(price.length > 2) {
        price = [price.slice(0, price.length - 2), ".", price.slice(price.length - 2)].join("");
    }
    console.log(`price: ${price}`);
    this.setState({ price });
  }

  // Picker onValueChange?: ?(itemValue: string | number, itemIndex: number) => mixed
  updateUnit(unit: string | number): void {
    if (typeof unit === "string") {
      if (unit === Strings.pickerItemUnit) {
        this.setState({ unit, quantity: Math.trunc(this.state.quantity) });
      } else {
        this.setState({ unit });
      }
    }
  }

  // Picker onValueChange?: ?(itemValue: string | number, itemIndex: number) => mixed
  updateCategory(category: string | number): void {
    if (typeof category === "string") this.setState({ category });
  }

  moreQuantity(): void {
    // Quantity++
    this.setState(previousState => {
      const more = previousState.unit === Strings.pickerItemUnit ? 1 : 0.25;
      let nextState = {};
      nextState.quantity = previousState.quantity + more;
      return nextState;
    });
  }

  lessQuantity(): void {
    // Quantity--
    this.setState(previousState => {
      const less = previousState.unit === Strings.pickerItemUnit ? 1 : 0.25;
      let nextState = {};
      if (previousState.quantity > 1)
        nextState.quantity = previousState.quantity - less;
      return nextState;
    });
  }

  primaryKey(): string {
    // Genarating ID
    return (
      Math.random()
        .toString(36)
        .substr(2, 20) + Date.now()
    );
  }

  saveItem(): void {
    // Destructuring assignment
    const { primaryKey }: any = this;
    const { eventCloseAddItem }: any = this.props;
    const {
      name,
      price,
      quantity,
      unit,
      category,
      targetAnimation
    }: any = this.state;

    // Item to save
    const item = {
      id: primaryKey(),
      name,
      price: Number.parseFloat(price),
      quantity,
      unit,
      category
    };

    // Save item in database
    createItem(item)
      .then(() => {
        // Item saved
        Animated.timing(targetAnimation, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true
        }).start(() => {
          eventCloseAddItem();
        });
      })
      .catch(error => {
        // Item don't saved
        console.log(error);
        eventCloseAddItem();
      });
  }

  cancelItem(): void {
    // Destructuring assignment
    const { eventCloseAddItem }: any = this.props;
    const { targetAnimation }: any = this.state;

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
export function AddItemButton(props: any): React$Element<any> {
  // Destructuring assignment
  const { eventShowAddItem }: any = props;
  const { addItemButton, addItemButtonImage }: any = style;

  // View
  return (
    <TouchableOpacity style={addItemButton} onPress={eventShowAddItem}>
      <Image
        style={addItemButtonImage}
        source={require("../../resources/images/additem.png")}
      />
    </TouchableOpacity>
  );
}

const style: any = StyleSheet.create({
  // AddItem
  addItem: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "rgba(  0,  0,  0, .5)",
    alignItems: "center",
    justifyContent: "center"
  },
  addItemBox: {
    width: Dimensions.get("window").width - 70,
    paddingTop: 10,
    paddingRight: 10,
    paddingLeft: 10,
    borderRadius: 10,
    backgroundColor: "white"
  },

  // Text Input Circle
  addItemTextInput: {
    flex: 1,
    height: 40
  },
  addItemTextInputIcon: {
    width: 25,
    height: 25,
    margin: 10,
    justifyContent: "center",
    alignItems: "center"
  },

  // Quantity
  addItemQuantityControl: {
    flex: 0.5,
    height: 35,
    backgroundColor: Colors.ORANGE,
    borderRadius: 20
  },

  addItemTitle: {
    textTransform: "uppercase",
    textAlign: "center",
    fontWeight: "bold",
    margin: 10
  },
  addItemControlBar: {
    flexDirection: "row",
    marginTop: 10,
    height: 48
  },
  addItemCount: {
    backgroundColor: "black"
  },
  addItemControl: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
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
    position: "absolute",
    bottom: 16,
    right: 16
  },
  addItemButtonImage: {
    width: 56, // Default size 56dp (floating action button - docmentation Material Design Google)
    height: 56
  }
});
