/**
 * Strings
 *
 * @author David Gaspar
 */
import DeviceInfo from "react-native-device-info";

/**
 * Contante
 * Get device language
 *
 * Obs: "en" (iOS) or "en-US" (Android)
 */
const deviceLocale = DeviceInfo.getDeviceLocale();
const isPortugueseLenguage = deviceLocale.includes("pt");

/**
 * Strings Object
 *
 * @enum {string}
 * @const
 */
const Strings = Object.freeze({
  textTitle: isPortugueseLenguage ? "Adicionar item à lista" : "Add item to list",
  textInputName: isPortugueseLenguage ? "Nome do item" : "Enter the item name",
  textInputPrice: isPortugueseLenguage ? "Preço do item (opcional)" : "Enter the item price (optional)",
  textQuantity: isPortugueseLenguage ? "quantidade: " : "quantity",
  pickerItemUnit: isPortugueseLenguage ? "unidade" : "unit",
  pickerItemKg: isPortugueseLenguage ? "kilo grama" : "kilo gram",
  pickerItemLiter: isPortugueseLenguage ? "litro" : "liter",
  textCategory: isPortugueseLenguage ? "categoria" : "category",
  pickerItemOthers: isPortugueseLenguage ? "outros" : "others",
  pickerItemMeat: isPortugueseLenguage ? "carne" : "meat",
  pickerItemVegetables: isPortugueseLenguage ? "vegetais" : "vegetables",
  pickerItemFruits: isPortugueseLenguage ? "frutas" : "fruits",
  textCancel: isPortugueseLenguage ? "Cancelar" : "Cancel",
  textSave: isPortugueseLenguage ? "Salvar" : "Save"
});

export default Strings;
