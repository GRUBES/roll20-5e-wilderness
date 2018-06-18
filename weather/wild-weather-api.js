/**
 * Entry point module for generating Weather conditions in Roll20.
 *
 * Parses commands from the Roll20 chat interface and passes them along to the Weather module
 *
 * @namespace
 *
 * @author Draico Dorath
 * @copyright 2018
 * @license MIT
 */
(() => {
    'use strict';

    const prefix = "wild-weather-";
    const commandPrefix = `!${prefix}`;

    const routes = {
        "all": WildWeatherChat.all,
        "precip": WildWeatherChat.precipitation,
        "temp": WildWeatherChat.temperature,
        "wind": WildWeatherChat.wind
    };

    function route(msg) {
        if (!isCommand(msg)) { return; }

        execute(parseCommand(msg), parseInput(msg));
    }

    function isCommand(msg) {
        return (
            (msg.type === "api") &&
            msg.content.startsWith(commandPrefix)
        );
    }

    /**
     * Parses the API command out of the given Roll20 chat message
     *
     * @param msg {Object} Roll20 chat message data
     *
     * @returns {string} The name of the command to execute
     *
     * @private
     * @function parseCommand
     *
     * @example parseCommand({content:"!wild-weather-temp 75"}) // => "wild"
     */
    function parseCommand(msg) {
        return msg.content
            .split(" ")[0]
            .toLowerCase()
            .replace(commandPrefix, "");
    }

    /**
     * Strips the command out of the chat message and returns the rest of the input parameters as an Array
     *
     * @param msg {Object} Roll20 chat message
     *
     * @returns {String[]} List of input parameters provided in chat message
     *
     * @private
     * @function parseInput
     */
    function parseInput(msg) {
        // Dumb implementation; will break if e.g. needs to accept text strings with spaces in them
        return _.tail(msg.content.split(" "))
    }

    /**
     * Invokes the given command with the given input on the corresponding route
     *
     * @param command {String} The command to execute
     * @param input {String[]} The raw input parameters to pass to the command
     *
     * @returns {void}
     *
     * @private
     * @function execute
     */
    function execute(command, input) {
        if (!(routes[command] && (typeof routes[command] === "function"))) {
            return;
        }

        routes[command](...input);
    }

    on("chat:message", route);
    on("ready", () => { log("[WILD Weather] Loaded."); });
})();