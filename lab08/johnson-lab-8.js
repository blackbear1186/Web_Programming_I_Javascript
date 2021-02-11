$(document).ready(function () {
    $('#temperature-entered').focus ();

    $('#to-celsius').click(function (){
        $('#temperature-top-label').text('Enter temperature in Fahrenheit:');
        $('#temperature-bottom-label').text('Temperature converted to Celsius:');
        $('#clear-entries').click();
    });
    $('#to-fahrenheit').click(function (){
        $('#temperature-top-label').text('Enter temperature in Celsius:');
        $('#temperature-bottom-label').text('Temperature converted to Fahrenheit:');
        $('#clear-entries').click();
    });
    $('#convert').click(function () {
        if(isNaN($('#temperature-entered').val())) {
            // display a validation message that the entry must be numeric
            $('#validation-message').text('Please enter a number');
            // add the is-invalid class to the textbox to outline it in red
            $('#temperature-entered').addClass('is-invalid');
            // clear the value of the #converted temperature element in case output is present
            $('#converted-temperature').val('');
        }
        else if ($('#temperature-entered').val() === '') {
            // display a validation message that the entry is required
            $('#validation-message').text('This field is required');
            // add the is-invalid class to the textbox to outline it in red
            $('#temperature-entered').removeClass('is-invalid');
            // clear the value of the #converted-temperature element in case output is present
            $('#converted-temperature').val('');
        }
        else {
            // clear validation message because a number has been entered
            $('#validation-message').text('');
            // removed is-invalid class if it present
            $('#temperature-entered').removeClass('is-invalid');
            // declare variables for input and output
            let fahrenheit, celsius;


            // determine which radio button is selected
            const radioButton = $(':checked').val();

            if(radioButton === 'convert-to-celsius') {
                // set fahrenheit variable equal to the value in the temperature entered
                fahrenheit = parseFloat($('#temperature-entered').val());
                // calculate celsius based on formula
                celsius = (fahrenheit - 32) * 5 / 9;
                // display celsius to one decimal place in the temperature converted box
                $('#converted-temperature').val(celsius.toFixed(2) + '\u00B0 C');
            }
            else if (radioButton === 'convert-to-fahrenheit') {
                // set celsius variable equal to value in the temperature entered
                celsius = parseFloat($('#temperature-entered').val());
                // calculate fahrenheit based on formula
                fahrenheit = (celsius * 9) / 5 + 32;
                // display fahrenheit to one decimal place
                $('#converted-temperature').val(fahrenheit.toFixed(2) + '\u00B0 F');
            }
        }
        // select text and send focus to textbox
        $('#temperature-entered').select().focus();
    });
    $('#clear-entries').click(function () {
       //clear both textboxes
       $(':text').val('');
       // clear any existing validation message
        $('#validation-message').text('');
        // remove is-invalid class if present and send focus to the textbox for input
        $('#temperature-entered').removeClass('is-invalid').focus();
    });
    // if the textbox is double clicked, trigger the click of the clear button
    $('#temperature-entered').dblclick(function () {
       $('#clear-entries').click();
       $('')
    });
});