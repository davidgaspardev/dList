/**
 * Item
 *
 * @author David Gaspar
 * @flow
 */
import React, { PureComponent } from "react";
import type { Item as Props } from "../Properties";
import type { Item as State } from "../States";
import {
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
  Animated,
  TextInput,
  Image,
  Picker,
  View,
  Text
} from "react-native";
import Styles from "../../resources/Styles";
import Colors from "../../resources/Colors";

/**
 * Stateless Component
 *
 * @param {Obejct} props
 * @return JSX
 */
export default class Item extends PureComponent<Props, State> {
  constructor(props: Props): void {
    super(props);

    // Init state
    this.state = {
      animation: new Animated.Value(0)
    };
  }

  render(): React$Element<any> {
    // Destructuring assignment
    const { name, price, quantity, unit, category } = this.props;
    const { animation } = this.state;
    const {
      item,
      itemName,
      itemDetail,
      itemDetailText,
      itemDetailPrice
    } = style;

    // View
    return (
      <Animated.View style={[item, { width: animation }]}>
        <View>
          <Text style={itemName}>{name}</Text>
        </View>
        <View style={itemDetail}>
          <Text style={[itemDetailText, { backgroundColor: Colors.BLACK }]}>
            {category}
          </Text>
          <Text
            style={[itemDetailText, { backgroundColor: Colors.GREEN }]}
          >{`${quantity} ${unit}`}</Text>
            {price && <Text style={[itemDetailText, { backgroundColor: Colors.YELLOW }]}>{`R$: ${price}`}</Text>}
        </View>
      </Animated.View>
    );
  }

  componentDidMount(): void {
    // Destructuring assignment
    const { animation } = this.state;

    Animated.spring(animation, {
      toValue: Dimensions.get("window").width
      //useNativeDriver: true
    }).start();
  }
}

/**
 * Style Object
 */
const style: any = StyleSheet.create({
  // Item
  item: {
    padding: 10,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "lightgray"
  },
  itemName: {
    fontWeight: "bold",
    fontSize: 20,
    color: "gray"
  },
  itemDetail: {
    flexDirection: "row-reverse"
  },
  itemDetailText: {
    marginLeft: 10,
    padding: 10,
    color: "white",
    fontWeight: "bold",
    //textTransform: "uppercase",
    borderRadius: 20
  }
});
