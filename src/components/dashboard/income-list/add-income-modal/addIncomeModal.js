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
        }, 1000)
    }
}

const handleAddIncome = (event) => {
    event.preventDefault();

    const incomeDatails = creatObjDetails('income');

    console.log(incomeDatails)
}

if ('customElements' in window) {
    customElements.define('app-add-income-modal', AddIncomeModal)
}

const formatCurrency = (event, financialType) => {
    const filterValue = event.target.value.replace(/\D/g, '');

    const currency = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(parseFloat(filterValue / 100))

    event.target.value = currency;

    const valueFormated = parseFloat(filterValue / 100);

    if (financialType === 'income') {
        window.valueAddIncomeModal = valueFormated;
    } else if (financialType === 'expense') {
        window.valueAddExpenseModal = valueFormated;
    }
}