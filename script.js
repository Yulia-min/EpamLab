const [mainElement] = document.getElementsByClassName('main');
const [formElement] = document.getElementsByClassName('form');
const formFields = document.querySelectorAll('.form__field > input');
const errorElements = document.querySelectorAll('.form__field > div');
const [lightButtonElement, darkButtonElement] = document.getElementsByClassName('theme-buttom');

const [nameElement, passwordElement, emailElement] = formFields;
const [nameErrorElement, passwordErrorElement, emailErrorElement] = errorElements;

const emailRegex = /[0-9a-z_-]+@[0-9a-z_-]+\.[a-z]{2,5}/i;
const ERRORS = {
    REQUIRED: 'Should not be empty',
    EMAIL: 'Email is not correct'
}

formElement.addEventListener('submit', (event) => {
    event.preventDefault();

    let isValid = true;

    formFields.forEach(e => e.classList.remove('form__field_error'));
    errorElements.forEach(e => e.innerHTML = '');

    if (!requiredValidator(nameElement.value)) {
        nameElement.classList.add('form__field_error');
        nameErrorElement.innerHTML = ERRORS.REQUIRED;
        isValid = false;
    }

    if (!requiredValidator(passwordElement.value)) {
        passwordElement.classList.add('form__field_error');
        passwordErrorElement.innerHTML = ERRORS.REQUIRED;
        isValid = false;
    }

    if (!emailValidator(emailElement.value)) {
        emailElement.classList.add('form__field_error');
        emailErrorElement.innerHTML = ERRORS.EMAIL;
        isValid = false;
    }

    if (isValid) {
        sendData({
            name: nameElement.value,
            password: passwordElement.value,
            email: emailElement.value
        })  
            .finally(() => alert('Registration completed successfully'));
    }
});

lightButtonElement.addEventListener('click', () => {
    mainElement.classList.remove('main_dark');
    mainElement.classList.add('main_light'); 
});

darkButtonElement.addEventListener('click', () => {
    mainElement.classList.remove('main_light');
    mainElement.classList.add('main_dark'); 
});

function sendData(obj) {
    return fetch('./', {
        method: 'POST',
        body: JSON.stringify(obj)
    })
}

function requiredValidator(value) {
    return Boolean(value.trim());
}

function emailValidator(value) {
    return emailRegex.test(value);
}