/**
 * Entry point module for the Wilderness Survival module for Roll20.
 *
 * Follows D&D 5e rules for exploration and wilderness survival.
 *
 * Intended for use with the 5E Shaped Character Sheet
 *
 * @author Draico Dorath
 * @copyright 2018
 *
 * @license MIT
 */
(() => {
    'use strict';

    on("ready", () => { log("[WILD] Loaded."); });
    on("chat:message", routeApiCall);

    function routeApiCall(msg) {
        const router = {
            weather: {
                "precip": WildWeather.precipitation,
                "temp": WildWeather.temperature,
                "wind": WildWeather.wind
            }
        };

        if (!isCommand(msg)) { return; }

        exec(router, parseCommand(msg));

    }

    function isCommand(msg) {
        return (
            (msg.type === "api") &&
            msg.content.startsWith(WildConstants.namespace)
        );
    }

    /**
     * Parses the API command out of the given Roll20 chat message
     *
     * @param msg {Object} Roll20 chat message data
     *
     * @returns {string[]} List of words in the command without the "wild-" prefix
     *
     * @private
     * @function parseCommand
     *
     * @example parseCommand({content:"!wild-weather-temp 75"}) // => ["weather", "wild"]
     */
    function parseCommand(msg) {
        return msg.content
            .split(" ")[0]
            .toLowerCase()
            .replace(WildConstants.namespace, "")
            .split("-");
    }

    /**
     * Invokes the given command using the given route structure
     *
     * @param routes {Object} Router that maps API calls to actual module methods
     * @param commandPath {string[]} List of words in the command without the "wild-" prefix
     *
     * @returns {void}
     *
     * @private
     * @function exec
     */
    function exec(routes, commandPath) {
        let moduleName = _.head(commandPath);
        let commandName = _.tail(commandPath);

        if (!routes[moduleName] || (typeof routes[moduleName][commandName] !== "function")) {
            return;
        }

        routes[moduleName][command](msg.content);
    }
})();