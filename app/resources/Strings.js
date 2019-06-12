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
 */
const Strings = Object.freeze({
    title:        isPortugueseLenguage ? "Adicionar item à lista" : "Add item to list",
    nameField:    isPortugueseLenguage ? "Insira o nome do item" : "Enter the item name",
    priceField:   isPortugueseLenguage ? "Insira o preço do item" : "Enter the item price",
    cancelButton: isPortugueseLenguage ? "Cancelar" : "Cancel",
    saveButton:   isPortugueseLenguage ? "Salvar" : "Save"
});

export { Strings };