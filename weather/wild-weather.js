/**
 * Provides methods for generating random Weather effects based on the rules in the DMG p109
 *
 * @author Draico Dorath
 * @copyright 2018
 * @license MIT
 *
 * @see DMG109
 */
let WILD = WILD || {};

WILD.Weather = (() => {
    'use strict';

    /**
     * Enmerates possible wind strengths
     *
     * @enum {Number}
     *
     * @private
     * @readonly
     * @property Winds
     */
    const Winds = {
        NONE: 0,
        LIGHT: 1,
        STRONG: 2
    };

    /**
     * Enmerates possible precipitation levels
     *
     * @enum {Number}
     *
     * @private
     * @readonly
     * @property Precip
     */
    const Precip = {
        NONE: 0,
        LIGHT: 1,
        HEAVY: 2
    };

    /**
     * Generates a random temperature based on the given seasonal normal
     *
     * @param normal {Number} The normal temperature for the current season in degrees Fahrenheit
     *
     * @returns {Number} The rolled temperature
     *
     * @see DMG109
     *
     * @static
     * @function temperature
     */
    function temperature(normal) {
        let roll = randomInteger(20);

        if (roll < 15) { return normal; }
        if (roll < 18) { return normal - (randomInteger(4) * 10); }
        return normal + (randomInteger(4) * 10);
    }

    /**
     * Generates a random wind strength
     *
     * @returns {Winds} The rolled wind strength
     *
     * @see DMG109
     *
     * @static
     * @function wind
     */
    function wind() {
        let roll = randomInteger(20);

        if (roll < 13) { return Winds.NONE; }
        if (roll < 18) { return Winds.LIGHT; }
        return Winds.STRONG;
    }

    /**
     * Generates a random precipitation level
     *
     * @returns {Precip} The rolled precipitation level
     *
     * @see DMG109
     *
     * @static
     * @function precipitation
     */
    function precipitation() {
        let roll = randomInteger(20);

        if (roll < 13) { return Precip.NONE; }
        if (roll < 18) { return Precip.LIGHT; }
        return Precip.HEAVY;
    }

    return {
        temperature: temperature,
        wind: wind,
        precipitation: precipitation
    };
})();