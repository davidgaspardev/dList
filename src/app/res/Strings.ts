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
const isPortuguese = deviceLocale.includes("pt");

/**
 * Strings Object
 * 
 * @constant
 */
export const Strings =  Object.freeze({
    toastAlert: isPortuguese ? 'Este item já existe' : 'That item already exists'
});