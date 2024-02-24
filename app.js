const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const email = document.getElementById("email");
const gender = document.getElementsByName("gender");
const dob = document.getElementById("dob");
const mobile = document.getElementById("mobile");
const userid = document.getElementById("userid");
const password = document.getElementById("password");
const cnfpassword = document.getElementById("cnfpassword");

const FNAME_REQUIRED = "Invalid First Name."
const LNAME_REQUIRED = "Invalid Last Name."
const EMAIL_REQUIRED = "Invalid Email id."
const GENDER_REQUIRED = "Invalid Gender."
const DOB_REQUIRED = "Invalid Date of Birth."
const MOBILE_REQUIRED = "Invalid Mobile Number."
const USERID_REQUIRED = "Invalid User ID."
const PASSWORD_REQUIRED = "Invalid Password."
const PASSWORD_MISMATCH = "Password does not match."

let UserData = {};

function showMessage(input, message, type) {
    const small = input.parentNode.querySelector("small");
    small.innerText = message;
    input.className = type ? "success" : "error"
    return type;
}

function showSuccess(input) {
    return showMessage(input, "", true);
}

function showError(input, message) {
    return showMessage(input, message, false);
}

function checkEmpty(input, message) {
    if (input.value.trim() === "" || input.value.length < 3) {
        return showError(input, message);
    } else {
        return showSuccess(input);
    }
}

function validateEmail(input, message) {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const email = input.value.trim();

    if (emailRegex.test(email)) {
        return showSuccess(input);
    } else {
        return showError(input, message);
    }
}

function checkGenderInput(input, message) {
    let checkedGender = false;
    let selectedGender = gender[gender.length - 1];
    for (i = 0; i < gender.length; i++) {
        if (gender[i].checked) {
            checkedGender = true;
        }
    }
    if (checkedGender) {
        return showSuccess(selectedGender);
    } else {
        return showError(selectedGender, message);
    }

}

function validateDob(input, message) {
    if (input.value.trim() === "") {
        return showError(input, message);
    } else {
        return showSuccess(input);
    }
}

function validateMobile(input, message) {
    if (input.value.trim() === "" || input.value.trim().length < 10 || input.value.trim().length > 10 || isNaN(input.value.trim())) {
        return showError(input, message);
    } else {
        return showSuccess(input);
    }
}

function validateuserid(input, message) {
    if (input.value.trim() === "" || input.value.trim().length < 5) {
        return showError(input, message);
    } else {
        return showSuccess(input);
    }
}

function validatepassword(input, message) {
    let passwordregex = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{10,}$/;
    if (!passwordregex.test(input.value.trim())) {
        return showError(input, message);
    } else {
        return showSuccess(input);
    }
}

function matchPassword(input, message) {
    if (validatepassword(input, message)) {
        if (cnfpassword.value.trim() == password.value.trim()) {

            return showSuccess(input);
        } else {
            return showError(input, message);
        }

    }
}

function validateAll() {
    let fnamechecked = checkEmpty(fname, FNAME_REQUIRED);
    let lnamechecked = checkEmpty(lname, LNAME_REQUIRED);
    let emailchecked = validateEmail(email, EMAIL_REQUIRED);
    let genderchecked = checkGenderInput(gender, GENDER_REQUIRED);
    let dobchecked = validateDob(dob, DOB_REQUIRED);
    let mobilechecked = validateMobile(mobile, MOBILE_REQUIRED);
    let useridchecked = validateuserid(userid, USERID_REQUIRED);
    let passwordchecked = validatepassword(password, PASSWORD_REQUIRED)
    let cnfpasswordchecked = matchPassword(cnfpassword, PASSWORD_MISMATCH)

    if (fnamechecked & lnamechecked & emailchecked & genderchecked & dobchecked & mobilechecked & useridchecked & passwordchecked & cnfpasswordchecked) {
        return true;
    } else {
        return false;
    }
}

function printAllValues() {
    UserData = {
        fname: fname.value,
        lname: lname.value,
        email: email.value,
        gender: gender.value,
        dob: dob.value,
        mobile: mobile.value,
        userid: userid.value,
        password: password.value,
        cnfpassword: cnfpassword.value
    }

    console.log(UserData);
}

const form = document.getElementById("jsform");
form.addEventListener("submit", function (event) {
    event.preventDefault();
    printAllValues();
});

const sButton = document.getElementById("sbutton");


document.addEventListener("focusout", function (event) {
    if (validateAll()) {
        document.getElementById("sbutton").disabled = false;
    }
});