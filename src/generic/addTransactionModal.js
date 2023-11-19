const creatObjDetails = (type) => {
    const {
        income,
        expense,
        category,
        value,
        dueDate,
        currentFutureFixed,
        currentPastFixed,
        paymentMethod } = selectInputsDom(type)

    const transactionDetail = {
        value,
        dueDate,
        currentFutureFixed,
        currentPastFixed
    }

    if (type === 'income') {
        transactionDetail.income = income;
        transactionDetail.paymentMethod = paymentMethod
    } else if (type === 'expense') {
        transactionDetail.expense = expense;
        transactionDetail.category = category;
    }

    return transactionDetail;
}

const selectInputsDom = (type) => {
    const transaction = document.querySelector(`.${type}-add-category`).value;
    const value = type === 'income' ? window.valueAddIncomeModal : window.valueAddExpenseModal;

    const paymentMethod = document.querySelector('.income-payment-method-category').value;
    const dueDate = document.querySelector(`.dueDate${capitalizeFirstLetter(type)}`).value;
    const category = type === 'expense' ? document.querySelector('.expense-add-category').value : null;
    const currentFutureFixed = document.querySelector(`.currentFutureFixed${capitalizeFirstLetter(type)}`).checked;
    const currentPastFixed = document.querySelector(`.currentPastFixed${capitalizeFirstLetter(type)}`).checked;
    const user = localStorage.getItem('user');

    const result = {
        //passando campo dinamico para um objeto
        [type]: transaction,
        value,
        dueDate,
        currentFutureFixed,
        currentPastFixed,
        user
    }

    if (type === 'expense') {
        //adicionando novo campo para o obj
        result.category = category
    } else if (type === 'income') {
        result.paymentMethod = paymentMethod
    }

    return result;
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

const toggleCheckboxes = (currentFutureSelector, currentPastSelector) => {
    const currentFutureCheckbox = document.querySelector(currentFutureSelector);
    const currentPastCheckbox = document.querySelector(currentPastSelector);

    if (currentFutureCheckbox) {
        currentFutureCheckbox.addEventListener('change', () => {
            if (currentFutureCheckbox.checked) {
                currentPastCheckbox.disabled = true;
            } else {
                currentPastCheckbox.disabled = false;
            }
        })
    }
    if (currentPastCheckbox) {
        currentPastCheckbox.addEventListener('change', () => {
            if (currentPastCheckbox.checked) {
                currentFutureCheckbox.disabled = true
            } else {
                currentFutureCheckbox.disabled = false
            }
        })
    }
}

const verifyFieldFillTransaction = (financialType, transactionDetails) => {
    const requiredFields = {
        income: ['income', 'value', 'dueDate'],
        expense: ['expense', 'category', 'value', 'dueDate']
    }

    const fields = requiredFields[financialType]
    return fields.every(field => transactionDetails[field] !== '' && transactionDetails[field] !== undefined)

}