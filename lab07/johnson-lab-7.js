// use strict mode to throw error if variable name is used before being declared
"use strict";

const $ = selector => document.querySelector(selector);

window.onload = () => {
    $('#temperature-entered').focus();
    $('#to-celsius').addEventListener('click', fahrenheitToCelsius);
    $('#to-fahrenheit').addEventListener('click', celsiusToFahrenheit);
    $('#convert').addEventListener('click', convertTemperature);
    $('#clear-entries').addEventListener('click', resetForm);
}
const toggleLabelText = (topLabelText, bottomLabelText) => {
    //update the text of the labels based on which radio button is selected
    //textContent only sends text and is more efficient than innerHTML
    $('#temperature-top-label').textContent = topLabelText;
    $('#temperature-bottom-label').textContent = bottomLabelText;
}
//update text of the label for fahrenheit to celsius
const fahrenheitToCelsius = () => {
    toggleLabelText('Enter temperature in Fahrenheit:', 'Temperature converted to Celsius:');
    //reset value when reset button clicked
    resetForm();
}
//update text of the label for celsius to fahrenheit
const celsiusToFahrenheit = () => {
    toggleLabelText('Enter temperature in Celsius:', 'Temperature converted to Fahrenheit:');
    resetForm();
}
// calculation for converting fahrenheit to celsius
const convertToCelsius = (temperatureEntered) => (temperatureEntered - 32) * 5 / 9;
// calculation for converting celsius to fahrenheit
const convertToFahrenheit = (temperatureEntered) => (temperatureEntered * 9) / 5 + 32;
const convertTemperature = () => {
    //get temperature entered by user
    let temperatureEntered = parseFloat($('#temperature-entered').value);

    if(isNaN(temperatureEntered)) {
        $('#validation-message').textContent = 'Please enter a number';
        $('#temperature-entered').classList.add('is-invalid');
        $('#converted-temperature').value = '';
    }
    else {
        $('#validation-message').textContent = '';
        $('#temperature-entered').classList.remove('is-invalid');
        //determine which radio button is selected to call temperature conversion
        if($('#to-celsius').checked) {
            $('#converted-temperature').value = convertToCelsius(temperatureEntered).toFixed(1) + '\u00B0 C';
        }
        else {
            $('#converted-temperature').value = convertToFahrenheit(temperatureEntered).toFixed(1) + '\u00B0 F';
        }
    }
    //to select the text in the top text box
    $('#temperature-entered').select();
}
//function to reset value of textbox
const resetForm = () => {
    $('#validation-message').textContent = '';
    $('#temperature-entered').classList.remove('is-invalid');
    //clear any existing output with empty string
    $('#converted-temperature').value = '';

    //clear any existing text in the textbox to enter temperature
    $('#temperature-entered').value = '';
    $('#temperature-entered').focus();
}