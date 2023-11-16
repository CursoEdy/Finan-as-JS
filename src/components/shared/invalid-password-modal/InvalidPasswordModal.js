class InvalidPasswordModal extends HTMLElement {
    constructor() {
        super()

        fetch('src/components/shared/invalid-password-modal/InvalidPasswordModal.html')
            .then(response => response.text())
            .then(text => this.innerHTML = text);
    }
}

if ('customElements' in window) {
    customElements.define('app-invalid-password-modal', InvalidPasswordModal)
}