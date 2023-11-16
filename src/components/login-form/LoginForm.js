class LoginForm extends HTMLElement {
    constructor() {
        super();

        fetch('src/components/login-form/LoginForm.html')
            .then(response => response.text())
            .then(text => this.innerHTML = text)
    }
}

const isLoginFormValid = (email, password) => email !== '' && password !== '';

const createLoginPayload = () => {
    const email = document.querySelector('.email').value;
    const password = document.querySelector('.password').value;

    return { email, password };
}

const showErrorModal = (error) => {
    if (error.message === 'Not Found') {
        showModal('user-not-found-modal');
    } else if (error.message === 'Unprocessable Entity') {
        showModal('invalid-password-modal');
    }
}

const authenticateUser = async () => {
    const payload = createLoginPayload();
    const { email } = payload;

    try {
        const response = await window.login(`${window.apiURL}/auth/login`, payload)
        captureErrorRequest(response);

        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', email);

        navigateTo('/dashboard')
    } catch (error) {
        showErrorModal(error)
    }
}

const handleLogin = () => {
    const { email, password } = createLoginPayload();

    if (!isLoginFormValid(email, password)) {
        showModal('required-field-modal');
        return;
    }

    authenticateUser();
}

if ('customElements' in window) {
    customElements.define('app-login-form', LoginForm)
}