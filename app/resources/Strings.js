/**
 * Strings
 * 
 * @author David Gaspar
 */
import DeviceInfo from 'react-native-device-info';

/**
 * Contante 
 * Get device language
 * 
 * Obs: "en" (iOS) or "en-US" (Android)
 */
const deviceLocale = DeviceInfo.getDeviceLocale();
const isPortugueseLenguage = deviceLocale.includes('pt');

/**
 * Strings Object
 * 
 * @enum {string}
 * @const
 */
const Strings = Object.freeze({
    textTitle:      isPortugueseLenguage ? "Adicionar item à lista" : "Add item to list",
    textInputName:  isPortugueseLenguage ? "Insira o nome do item" : "Enter the item name",
    textInputPrice: isPortugueseLenguage ? "Insira o preço do item" : "Enter the item price",
    textQuantity:   isPortugueseLenguage ? "Quantidade: " : "Quantity: ",
    textCancel:     isPortugueseLenguage ? "Cancelar" : "Cancel",
    textSave:       isPortugueseLenguage ? "Salvar" : "Save"
});

export { Strings };