class AddIncomeModal extends HTMLElement {
    constructor() {
        super()

        fetch('src/components/dashboard/income-list/add-income-modal/addIncomeModal.html')
            .then(response => response.text())
            .then(text => this.innerHTML = text)
    }

    connectedCallback() {
        setTimeout(() => {
            createSelectElement('income', 'add', '.select-container-income', 'Categoria de Receitas', window.typeIncome, window.typeIncome.length);
            createSelectElement('income', 'payment-method', '.select-container-payment-method-income', 'Metodo de pagamento', window.paymentMethod, window.paymentMethod.length);
            toggleCheckboxes('.currentFutureFixedIncome', '.currentPastFixedIncome')
        }, 1000)
    }
}

const handleAddIncome = (event) => {
    event.preventDefault();
    const incomeDetails = creatObjDetails('income');
    const buttonAddIncome = document.querySelector('.add-income');

    if (!verifyFieldFillTransaction('income', incomeDetails)) {
        buttonAddIncome.removeAttribute('data-dismiss');
        alert('Preencha os campos vazios')
    }
}

if ('customElements' in window) {
    customElements.define('app-add-income-modal', AddIncomeModal)
}