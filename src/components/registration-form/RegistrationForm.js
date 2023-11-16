class RegistrationForm extends HTMLElement {
    constructor() {
        super();

        fetch('src/components/registration-form/RegistrationForm.html')
            .then(response => response.text())
            .then(text => this.innerHTML = text);
    }
    connectedCallback() {
        setTimeout(() => {
            setAvatar();
            formValidationRegistration();
            createSelectElement('user', 'registration', '.select-container-registration', 'Gênero', window.gender, 3);
        }, 1000)
    }
}

let uploadedAvatar;
let password;
let confirmPassword;

//setar imagem com js
const setAvatar = () => {
    const imgAvatar = document.querySelector('.avatar');
    if (imgAvatar) {
        imgAvatar.src = 'src/assets/images/avatar.png'
    }
}

document.addEventListener('change', e => {
    const el = e.target;
    if (el.files && el.files.length > 0) {
        //armazena o arquivo enviado
        const file = el.files[0];
        const reader = new FileReader();

        //metodo onload informa quando o arquivo terminou de ser carregado
        reader.onload = () => (document.querySelector('.avatar').src = reader.result)
        reader.readAsDataURL(file);
        uploadedAvatar = file;
    }
})

const validateRegistrationName = (name) => {
    //expressão regular para negar caracteries especiais.
    const regex = /^[a-zA-ZÁ-ÿ\s]+$/;

    //este se o campo nome é válido e retorno true ou false.
    return regex.test(name);
}

const validateRegistrationEmail = (email) => {
    //expressão regular para validar email.
    const regex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

    //este se o campo nome é válido e retorno true ou false.
    return regex.test(email);
}

const validateRegistrationPassword = (password) => {
    return password.length >= 4;
}

const enableButton = () => {
    const btn = document.querySelector('.btn-registration');
    btn.disabled = false;
}

const hideErrorMessage = () => {
    const erroMessage = document.querySelector('.no-match-password');
    erroMessage.style.display = 'none';
    enableButton();
}

const showErroMessage = () => {
    const errorMessage = document.querySelector('.no-match-password');
    errorMessage.style.display = 'block';
    disabledButton();
}

const isPasswordMatch = () => {
    if (password && confirmPassword && password == confirmPassword) {
        hideErrorMessage();
        return true;
    }
    return false;
}

const confirgCloseModalRemove = () => {
    const btnCloseModal = document.querySelector('.btn-registration');
    btnCloseModal.removeAttribute('data-dismiss');
}

const verifyPasswordMisMatch = () => {
    if (password && confirmPassword && password !== confirmPassword) {
        showErroMessage();
        confirgCloseModalRemove();
    }
}

const formValidationRegistration = () => {
    const button = document.querySelector('.btn-registration');
    const nameInput = document.querySelector('.nameRegistrationInput');
    const nameError = document.getElementById('nameRegistrationError');
    const emailInput = document.querySelector('.emailRegistrationInput');
    const emailError = document.getElementById('emailErrorRegistration');
    const passwordInput = document.querySelector('.passwordRegistrationInput');
    const passwordError = document.getElementById('passwordRegistrationError');
    const confirmPasswordInput = document.querySelector('.confirmPasswordRegistrationInput');

    const validationDelay = 1000;
    if (nameInput) {
        addInputValidationEventWithDelay(nameInput, validateRegistrationName, nameError, button, validationDelay);
    }
    if (emailInput) {
        addInputValidationEventWithDelay(emailInput, validateRegistrationEmail, emailError, button, validationDelay);
    }
    if (passwordInput) {
        addInputValidationEventWithDelay(passwordInput, validateRegistrationPassword,
            passwordError, button, validationDelay);
        passwordInput.addEventListener('input', e => {
            password = e.target.value;
            isPasswordMatch();
            verifyPasswordMisMatch();
        });
    }

    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', e => {
            confirmPassword = e.target.value;
            isPasswordMatch();
            verifyPasswordMisMatch();
        })
    }

}

const disabledButton = () => {
    const btn = document.querySelector('.btn-registration');
    btn.disabled = true;
}

const extractInputValues = () => {

    const name = document.querySelector('.nameRegistrationInput').value;
    const email = document.querySelector('.emailRegistrationInput').value;
    const gender = document.querySelector('.user-registration-category').value;
    const image = uploadedAvatar;
    const password = document.querySelector('.passwordRegistrationInput').value;
    const confirmPassword = document.querySelector('.confirmPasswordRegistrationInput').value;

    return {
        name,
        email,
        gender,
        image,
        password,
        confirmPassword
    }
}

const emptyFieldsCheck = (name, email, gender, image, password, confirmPassword) =>
    name !== '' &&
    email !== '' &&
    gender !== '' &&
    image !== undefined &&
    password &&
    confirmPassword

const checkErrorType = (erro) => {
    if (erro == 'Error: Unprocessable Entity') {
        alert('Usuário já existe na base de dados.');
    }
}

const initToast = () => {
    let toastEl = document.querySelector('.toast');
    let toast = new bootstrap.Toast(toastEl);

    toast.show();
}

const registerUser = async (payload) => {
    await window.registerUser(`${window.apiURL}/auth/register/user`, payload)
        .then(captureErrorRequest)
        .then(response => response.json())
        .then(response => {
            localStorage.setItem('userInfo', JSON.stringify(response.user));
            initToast();
        }).catch(checkErrorType)
}

const sendDataToBackend = () => {
    const extractValues = extractInputValues();
    const btnCloseModal = document.querySelector('.btn-registration');

    const payload = {
        name: extractValues.name,
        email: extractValues.email,
        gender: extractValues.gender,
        image: extractValues.image,
        password: extractValues.password,
        confirmPassword: extractValues.confirmPassword
    }

    if (!emptyFieldsCheck(extractValues.name, extractValues.email, extractValues.gender, extractValues.image, extractValues.password, extractValues.confirmPassword)) {
        btnCloseModal.removeAttribute('data-dismiss');
        alert('Por favor preencher todos os campos');
        return;
    }

    btnCloseModal.setAttribute('data-dismiss', 'modal');
    registerUser(payload)
}

if ('customElements' in window) {
    customElements.define('app-registration-form', RegistrationForm);
}


