/**
 * Proxy between the Weather module and the Roll20 chat interface
 *
 * @namespace
 *
 * @author Draico Dorath
 * @copyright 2018
 * @license MIT
 *
 * @see WildWeather
 */
const WildWeatherProxy = (() => {
    'use strict';

    const SPEAKING_AS = "Weather";

    let WindLabels = {};
    WindLabels[WildWeather.Winds.NONE] = "None";
    WindLabels[WildWeather.Winds.LIGHT] = "Light";
    WindLabels[WildWeather.Winds.STRONG] = "Strong";

    let PrecipLabels = {};
    PrecipLabels[WildWeather.Precip.NONE] = "None";
    PrecipLabels[WildWeather.Precip.LIGHT] = "Light";
    PrecipLabels[WildWeather.Precip.HEAVY] = "Heavy";

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
     * @static
     * @function all
     */
    function all(baseTemp=75) {
        wind();
        precipitation();
        temperature(baseTemp);
    }

    /**
     * Proxies random wind speed generation for the chat interface
     *
     * @returns {void} Prints the generated wind speed to the chat interface
     *
     * @example
     * !wild-weather-wind
     * // rolls for wind speeds
     *
     * @static
     * @function wind
     */
    function wind() {
        let windSpeed = WildWeather.wind();

        sendChat(SPEAKING_AS, `Wind: ${WindLabels[windSpeed]}`);
    }

    /**
     * Proxies random precipitation generation for the chat interface
     *
     * @returns {void} Prints the generated precipitation to the chat interface
     *
     * @example
     * !wild-weather-precip
     * // rolls for precipitation levels
     *
     * @static
     * @function precipitation
     */
    function precipitation() {
        let precip = WildWeather.precipitation();

        sendChat(SPEAKING_AS, `Precipitation: ${PrecipLabels[precip]}`);
    }

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
     * @static
     * @function temperature
     */
    function temperature(baseTemp=75) {
        let temp = WildWeather.temperature(parseInt(baseTemp, 10) || 75);

        sendChat(SPEAKING_AS, `Temperature: ${temp}F`);
    }

    return {
        all: all,
        temperature: temperature,
        wind: wind,
        precipitation: precipitation
    };
})();