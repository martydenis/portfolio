import { validateEmailAddress } from '../tools.js'
import "@scss/pages/contact.scss";


const validateContactForm = () => {
    const formElement = document.getElementById('contact__form');
    formElement.addEventListener("submit", function (e) {
        var field, value = null;
        var valid = true;

        // Test name.
        field = document.getElementById('name');
        value = field.value;
        if (value) {
            field.parentNode.classList.remove("error");
        } else {
            field.parentNode.classList.add("error");
            valid = false;
        }

        // Test email.
        field = document.getElementById('email');
        value = field.value;
        if (validateEmailAddress(value)) {
            field.parentNode.classList.remove("error");
        } else {
            field.parentNode.classList.add("error");
            valid = false;
        }

        // Test message.
        field = document.getElementById('message');
        value = field.value;
        if (value) {
            field.parentNode.classList.remove("error");
        } else {
            field.parentNode.classList.add("error");
            valid = false;
        }

        // Submit form if valid.
        if (!valid) {
            e.preventDefault();
        }
    });
}

window.addEventListener('load', function() {
    validateContactForm();
})
