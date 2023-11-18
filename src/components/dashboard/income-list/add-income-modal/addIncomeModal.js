class AddIncomeModal extends HTMLElement {
    constructor(){
        super()

        fetch('src/components/dashboard/income-list/add-income-modal/addIncomeModal.html')
        .then(response => response.text())
        .then(text => this.innerHTML = text)
    }

    connectedCallback(){}
}

if('customElements' in window) {
    customElements.define('app-add-income-modal', AddIncomeModal)
}
