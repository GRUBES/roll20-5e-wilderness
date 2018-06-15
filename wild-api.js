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

    const router = {
        weather: {
            "all": WildWeather.all,
            "precip": WildWeather.precipitation,
            "temp": WildWeather.temperature,
            "wind": WildWeather.wind
        }
    };

    function routeApiCall(msg) {
        if (!isCommand(msg)) { return; }

        exec(router, parseCommand(msg), msg);
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
     * Invokes the given command using the given route structure and passing along the given msg
     *
     * @param routes {Object} Router that maps API calls to actual module methods
     * @param commandPath {string[]} List of words in the command without the "wild-" prefix
     * @param msg {Object} Roll20 chat message that triggered this command
     *
     * @returns {void}
     *
     * @private
     * @function exec
     */
    function exec(routes, commandPath, msg) {
        let moduleName = _.head(commandPath);
        let commandName = _.last(commandPath);

        if (!routes[moduleName] || (typeof routes[moduleName][commandName] !== "function")) {
            return;
        }

        // Split off the command so that only the input parameters remain
        let input = _.tail(msg.content.split(" "));
        routes[moduleName][commandName](input);
    }

    on("chat:message", routeApiCall);
    on("ready", () => { log("[WILD] Loaded."); });
})();