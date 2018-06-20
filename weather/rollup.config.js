export default {
    input: "src/wild-weather-api.js",
    // FIXME Generate separate builds for each proxy
    output: [{
        file: "dist/wild5e-weather.js",
        format: "iife"
    }, {
        file: "dist/wild5e-weather-power.js",
        format: "iife"
    }]
}