"use strict";
const datePattern = /^((0[13578]|1[02])[\/.]31[\/.](18|19|20)[0-9]{2})|((01|0[3-9]|1[1-2])[\/.](29|30)[\/.](18|19|20)[0-9]{2})|((0[1-9]|1[0-2])[\/.](0[1-9]|1[0-9]|2[0-8])[\/.](18|19|20)[0-9]{2})|((02)[\/.]29[\/.](((18|19|20)(04|08|[2468][048]|[13579][26]))|2000))$/;
const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.edu$/;
const phonePattern = /^\(\d{3}\)\s\d{3}\.\d{4}$/;
const zipCodePattern = /^\d{5}-\d{4}$/;
const dobPattern = /^\d{2}\/\d{2}\/\d{4}$/;

$(document).ready(() => {
  const txtEmail = $("#email");
  const txtPhone = $("#phone");
  const txtZip = $("#zip");
  const txtDob = $("#dob");

  let isValid;
  // create invalid function
  const makeInvalid = (textbox, message) => {
    textbox.next().text(message);
    textbox.addClass("is-invalid");
    textbox.removeClass('is-valid');
    isValid = false;
  };
  // create valid function
  const makeValid = (textbox) => {
    textbox.next().text("");
    textbox.removeClass("is-invalid");
	  
    textbox.addClass("is-valid");
		  
  };

  txtEmail.focus();
  // validate button event listener
  $("#validate").on("click", (e) => {
    isValid = true;

    const email = txtEmail.val().trim();
    const phone = txtPhone.val().trim();
    const zip = txtZip.val().trim();
    const dob = txtDob.val().trim();

    //validate email
    !emailPattern.test(email)
      ? makeInvalid(
          txtEmail,
          "Please enter an email address that ends in .edu."
        )
      : makeValid(txtEmail);
    //validate phone number
    !phonePattern.test(phone)
      ? makeInvalid(
          txtPhone,
          "Please enter a phone number in the (999) 999.9999 format."
        )
      : makeValid(txtPhone);

    //validate zip code
    !zipCodePattern.test(zip)
      ? makeInvalid(txtZip, "Please enter a zip code in the 99999-9999 format.")
      : makeValid(txtZip);
    // validate date of birth
    if (dob === "") {
      makeInvalid(
        txtDob,
        "Please enter a valid date in the MM/DD/YYYY format."
      );
    } else if (dobPattern.test(dob) === false) {
      makeInvalid(
        txtDob,
        "Please enter a valid date in the MM/DD/YYYY format."
      );
    } else if (Date.parse(dob) > Date.now()) {
        makeInvalid(txtDob, 'Please enter a date in the past.');
    }
    else {
      makeValid(txtDob);
    }
    //display success message 
    $("#all-valid").text(isValid ? "All fields contain valid entries" : "");

    txtEmail.select().focus();

  });
});
