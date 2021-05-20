const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//functions

//show input error message
function showError(input, message) {
    //get parent element
    const formControl = input.parentElement;

    //now we manipulate the class name
    formControl.className = 'form-control error';

    //we need to select that error message that pops up and change the message
    const small = formControl.querySelector('small');
    //now that we have a variable made for it, we can change the text
        //we will show the message that is being passed into the function
    small.innerText = message;
}

//show success outline
function showSuccess(input) {
    const  formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// Check email is valid
function checkEmail(input) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Email is not valid')
    }
}

// Check required fields
function checkRequired(inputArr) {
    inputArr.forEach(function(input){
        if (input.value.trim() === ''){
            showError(input, `${getFieldName(input)} is required`);
        } else {
            showSuccess(input)
        }
    })
}

// Check input length
function checkLength(input, min, max) {
    if(input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`)
    } else if(input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`)
    } else {
        showSuccess(input);
    }
}

// Check that passwords match
function checkPasswordsMatch(input1, input2) {
    if(input1.value !== input2.value) {
        showError(input2, 'Passwords do not match')
    }
}

//get fieldname
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event listeners
form.addEventListener('submit', function(e) {
    e.preventDefault();

    checkRequired([username, email, password, password2]);
    
    //we create a function to check length. It will take a min and max number.
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordsMatch(password, password2);
})