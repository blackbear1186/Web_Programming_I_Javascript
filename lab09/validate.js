"use strict";
const datePattern = /^((0[13578]|1[02])[\/.]31[\/.](18|19|20)[0-9]{2})|((01|0[3-9]|1[1-2])[\/.](29|30)[\/.](18|19|20)[0-9]{2})|((0[1-9]|1[0-2])[\/.](0[1-9]|1[0-9]|2[0-8])[\/.](18|19|20)[0-9]{2})|((02)[\/.]29[\/.](((18|19|20)(04|08|[2468][048]|[13579][26]))|2000))$/;
const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
const phonePattern = /^\d{3}-\d{3}-\d{4}$/;

$(document).ready( () => {
    const txtArrival = $('#arrival-date');
    const txtNights = $('#nights');
    const txtName = $('#name');
    const txtEmail = $('#email');
    const txtPhone = $('#phone-number');

    // declare Boolean variable to track if form entries are valid
    let isValid;

    const makeInvalid = (textbox, message) => {
        // add validation message to the next element after the textbox
        textbox.next().text(message);
        // add is-invalid class to textbox to outline it in red
        textbox.addClass('is-invalid');
        // set Boolean to false which will will be used to prevent form submission
        isValid = false;
    }
    const makeValid = (textbox) => {
        // clear validation message from next element after the textbox
        textbox.next().text('');
        // remove is-invalid class from textbox
        textbox.removeClass('is-invalid');
    }
    // handle click event of the Join Email List button
    $('#make-reservation').on('click', (evt) => {
        // set isValid variable to true
        isValid = true;

        const date = txtArrival.val().trim();
        const nights = txtNights.val().trim();
        const name = txtName.val().trim();
        const email = txtEmail.val().trim();
        const phone = txtPhone.val().trim();

        // validate that the date is not empty and follows the format of a date
        if(date === '') {
            makeInvalid(txtArrival, 'Arrival date is required.');
        } else if (datePattern.test(date) === false) {
            makeInvalid(txtArrival, 'Must be a valid mm/dd/yyyy date.');
        } else if (!(Date.parse($('#arrival-date').val().trim()) > Date.now())) {
            makeInvalid(txtArrival, "Must be a valid mm/dd/yyyy date.");
        } else {
            makeValid(txtArrival);
        }



        // validate that the number of nights is entered, numeric and under 30
        if(nights === '') {
            makeInvalid(txtNights, 'The number of nights is required.');
        } else if (isNaN(txtNights.val())) {
            makeInvalid(txtNights, 'The number of nights must be numeric.');
        } else if(txtNights.val() > 30) {
			makeInvalid(txtNights, 'The number of nights must be numeric.')
		} else {
            makeValid(txtNights);
        }


        // validate that the email address is not empty and follows the format of an email addresss
        if(email === '') {
            makeInvalid(txtEmail, 'Email is required.');
        } else if (emailPattern.test(email) === false) {
            makeInvalid(txtEmail, 'Email not in the correct format.');
        } else {
            makeValid(txtEmail);
        }

        // validate that the phone number is not empty and follows the format of a phone number
        if(phone === '') {
            makeInvalid(txtPhone, 'Phone number is required.');
        } else if(phonePattern.test(phone) === false) {
            makeInvalid(txtPhone, 'Must be in the 999-999-9999 format.');
        } else {
            makeValid(txtPhone);
        }


        // validate that the name is not empty
        if(name === '') {
            makeInvalid(txtName, 'The name is required.');
        } else {
            makeValid(txtName);
        }
        // validate that radio button is selected
        let radioOptions = $(':radio:checked');
        if(radioOptions.length === 0) {
            $(':radio').addClass('is-invalid');
            $('#contact-message').text('Please select preferred contact method.');
            isValid = false;
        } else {
            $(':radio').removeClass('is-invalid');
            $('#contact-message').text('');
        }
		// remove invalid message from radio buttons when selected
		$(':radio').on('click', () => {
			$(':radio').removeClass('is-invalid');
			$('#contact-message').text('');
			
		});
		

        // prevent the default action of submitting the form if any entries are invalid
        if(isValid === false) {
            evt.preventDefault();
            txtArrival.select().focus();
        }

    }); // end of reservation event
    // write code to reset form
    $('#reset-reservation-form').on('click', () => {
        // clear all textboxes
        $('input[type="text"]').val('');
        // unselect all radio buttons
        $('input[type="radio"]').prop('checked', false);
        // remove is-invalid class from all elements
        $('input').removeClass('is-invalid');
        // remove all validation messages
        $('small').text('');
        //send focus to top textbox
        txtArrival.focus();
    }); // end of reset
}); // end of ready
