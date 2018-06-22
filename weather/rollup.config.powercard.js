import alias from "rollup-plugin-alias";

export default {
    input: "src/wild-weather-api.js",
    output: [{
        file: "dist/wild5e-weather-power.js",
        format: "iife"
    }],
    plugins: [alias({"wildWeatherProxy": "./wild-weather-power"})]
}