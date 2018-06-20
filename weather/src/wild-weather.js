/**
 * Provides methods for generating random Weather effects based on the rules in the DMG p109
 *
 * @module wild5e/weather/core
 *
 * @author Draico Dorath
 * @copyright 2018
 * @license MIT
 *
 * @see DMG109
 */

// Enumeration of wind speeds
const Winds = {
    NONE: 0,
    LIGHT: 1,
    STRONG: 2
};

// Enumeration of precipitation levels
const Precip = {
    NONE: 0,
    LIGHT: 1,
    HEAVY: 2
};

// Generate a random temperature based on given base temp
function temperature(baseTemp=75) {
    let roll = randomInteger(20);

    if (roll < 15) { return baseTemp; }
    if (roll < 18) { return baseTemp - (randomInteger(4) * 10); }
    return baseTemp + (randomInteger(4) * 10);
}

// Generate a random wind speed
function wind() {
    let roll = randomInteger(20);

    if (roll < 13) { return Winds.NONE; }
    if (roll < 18) { return Winds.LIGHT; }
    return Winds.STRONG;
}

// Generate a random precipitation level
function precipitation() {
    let roll = randomInteger(20);

    if (roll < 13) { return Precip.NONE; }
    if (roll < 18) { return Precip.LIGHT; }
    return Precip.HEAVY;
}

// Convenience method for generating all random weather conditions
function all(baseTemp) {
    return {
        temperature: temperature(baseTemp),
        precipitation: precipitation(),
        wind: wind()
    };
}

export {
    /**
     * Enmerates possible precipitation levels
     *
     * @enum {Number}
     *
     * @readonly
     * @property
     */
    Precip,
    /**
     * Enmerates possible wind strengths
     *
     * @enum {Number}
     *
     * @readonly
     * @property
     */
    Winds,
    /**
     * Convenience method for rolling all of the weather conditions at once. Can optionally provide a baseTemp
     * for the Temperature roll.
     *
     * @param [baseTemp=75] {Number} A typical seasonal temperature
     *
     * @returns {{temperature: Number, precipitation: Precip, wind: Winds}}
     *
     * @function
     */
    all,
    /**
     * Generates a random precipitation level
     *
     * @returns {Precip} The rolled precipitation level
     *
     * @see DMG109
     *
     * @function
     */
    precipitation,

    /**
     * Generates a random temperature based on the given seasonal baseTemp.
     *
     * @param [baseTemp=75] {Number} The baseTemp temperature for the current season in degrees Fahrenheit
     *
     * @returns {Number} The rolled temperature
     *
     * @example
     * WildWeather.temperature(40)
     * // rolls for temperature with 40 as "normal"
     * @example
     * WildWeather.temperature()
     * // rolls for temperature with 75 as "normal"
     *
     * @see DMG109
     *
     * @function
     */
    temperature,
    /**
     * Generates a random wind strength
     *
     * @returns {Winds} The rolled wind strength
     *
     * @see DMG109
     *
     * @function
     */
    wind
}