/**
 * Proxy between the Weather module and the Roll20 chat interface
 *
 * @module wild5e/weather/chat
 *
 * @requires module:wild5e/weather/core
 *
 * @author Draico Dorath
 * @copyright 2018
 * @license MIT
 *
 * @see module:wild5e/weather/core
 * @see module:wild5e/weather/api
 */

import  * as WildWeather from "./wild-weather";

// Sender used for chat messages
const SPEAKING_AS = "Weather";

// Display names for wind speeds
const WindLabels = {
    [WildWeather.Winds.NONE]: "None",
    [WildWeather.Winds.LIGHT]: "Light",
    [WildWeather.Winds.STRONG]: "Strong"
};

// Display names for precipitation levels
const PrecipLabels = {
    [WildWeather.Precip.NONE]: "None",
    [WildWeather.Precip.LIGHT]: "Light",
    [WildWeather.Precip.HEAVY]: "Heavy"
};

// wild5e/weather/core#precipitation proxy
function rollPrecip() {
    let precip = WildWeather.precipitation();

    sendChat(SPEAKING_AS, `Precipitation: ${PrecipLabels[precip]}`);
}

// wild5e/weather/core#temperature proxy
function rollTemp(baseTemp=75) {
    let temp = WildWeather.temperature(parseInt(baseTemp, 10) || 75);

    sendChat(SPEAKING_AS, `Temperature: ${temp}F`);
}

// wild5e/weather/core#wind proxy
function rollWind() {
    let windSpeed = WildWeather.wind();

    sendChat(SPEAKING_AS, `Wind: ${WindLabels[windSpeed]}`);
}

// wild5e/weather/core#all proxy
function rollAll(baseTemp=75) {
    rollWind();
    rollPrecip();
    rollTemp(baseTemp);
}

export {
    /**
     * Proxies random generation of all weather conditions for the chat interface
     *
     * @returns {void} Prints the generated weather conditions to the chat interface
     *
     * @example
     * !wild-weather-all
     * // rolls for temperature, wind speeds, and precipitation levels with 75 as "normal" temperature
     *
     * @example
     * !wild-weather-all 30
     * // rolls for temperature, wind speeds, and precipitation levels with 30 as "normal" temperature
     *
     * @function
     */
    rollAll,
    /**
     * Proxies random temperature generation based on the given seasonal baseTemp for the chat interface
     *
     * @param [baseTemp=75] {Number} Base temperature to use for the temp calculation
     *
     * @returns {void} Prints the generated temperature to the chat interface
     *
     * @example
     * !wild-weather-temp 40
     * // rolls for temperature from Chat with 40 as "normal"
     *
     * @example
     * !wild-weather-temp
     * // rolls for temperature from Chat with 75 as "normal"
     *
     * @function
     */
    rollTemp,
    /**
     * Proxies random wind speed generation for the chat interface
     *
     * @returns {void} Prints the generated wind speed to the chat interface
     *
     * @example
     * !wild-weather-wind
     * // rolls for wind speeds
     *
     * @function
     */
    rollWind,
    /**
     * Proxies random precipitation generation for the chat interface
     *
     * @returns {void} Prints the generated precipitation to the chat interface
     *
     * @example
     * !wild-weather-precip
     * // rolls for precipitation levels
     *
     * @function
     */
    rollPrecip
}