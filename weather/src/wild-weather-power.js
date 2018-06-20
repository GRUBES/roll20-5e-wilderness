/**
 * Proxy between the Weather module and the PowerCards interface
 *
 * @module wild5e/weather/powercard
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

// Name of PowerCard Format to use
const POWER_FORMAT = "weather";

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

// wild5e/weather/core#all proxy
function rollAll(baseTemp=75) {
    let windSpeed = WildWeather.wind();
    let precip = WildWeather.precipitation();
    let temp = WildWeather.temperature(parseInt(baseTemp, 10) || 75);
    let powerCard = `!power {{
        --format|${POWER_FORMAT}
        --name|Current Weather
        --Temperature|${temp}F
        --Wind Speed|${WindLabels[windSpeed]}
        --Precipitation|${PrecipLabels[precip]}
    }}`;

    sendChat(SPEAKING_AS, powerCard);
}

// wild5e/weather/core#precipitation proxy
function rollPrecip() {
    let precip = WildWeather.precipitation();
    let powerCard = `!power {{
        --format|${POWER_FORMAT}
        --name|Current Precipitation
        --!tag|${PrecipLabels[precip]}
    }}`;

    sendChat(SPEAKING_AS, powerCard);
}

// wild5e/weather/core#temperature proxy
function rollTemp(baseTemp=75) {
    let temp = WildWeather.temperature(parseInt(baseTemp, 10) || 75);
    let powerCard = `!power {{
        --format|${POWER_FORMAT}
        --name|Current Temperature
        --!tag|${temp}F
    }}`;

    sendChat(SPEAKING_AS, powerCard);
}

// wild5e/weather/core#wind proxy
function rollWind() {
    let windSpeed = WildWeather.wind();
    let powerCard = `!power {{
        --format|${POWER_FORMAT}
        --name|Current Wind Speed
        --!tag|${WindLabels[windSpeed]}
    }}`;

    sendChat(SPEAKING_AS, powerCard);
}

on("ready", () => { log("[WILD Weather] PowerCards proxy module loaded."); });

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