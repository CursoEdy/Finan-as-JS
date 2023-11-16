class RequiredFieldModal extends HTMLElement {
    constructor() {
        super()

        fetch('src/components/shared/required-field-modal/RequiredFieldModal.html')
        .then(response => response.text())
        .then(text => this.innerHTML = text)
    }
}

if('customElements' in window) {
    customElements.define('app-required-field-modal', RequiredFieldModal);
}