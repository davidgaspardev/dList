/**
 * Styles
 *
 * @author David Gaspar
 */
import { StyleSheet } from "react-native";

/**
 * Styles Object
 * This object contain generic styles
 *
 * @enum {Object}
 * @const
 */
const Style = StyleSheet.create({
  containerHorizontal: {
    flexDirection: "row",
    alignItems: "center"
  },
  childrenCenter: {
    justifyContent: "center",
    alignItems: "center"
  }
});

export default Style;
