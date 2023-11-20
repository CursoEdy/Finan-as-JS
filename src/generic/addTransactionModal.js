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

const registerFixedTransaction = async (financialType) => {
    const selectInput = selectInputsDom(financialType);
    const apiUrl = `${window.apiURL}/auth/${financialType}s`;
    const currentDate = new Date();
    const currentMonthIndex = currentDate.getMonth();
    
    if (selectInput.currentFutureFixed) {
        //criar window.months no arquivo GobalVariables
        const fututeMonths = window.months.slice(currentMonthIndex);
        await registerTransactions(apiUrl, financialType, selectInput, fututeMonths)
    } else if (selectInput.currentPastFixed) {
        const AllMonths = window.months;
        await registerTransactions( apiUrl, financialType, selectInput, AllMonths)
    }
}

const currentMonthTransactionRegistration = async (financialType) => {
    console.log('currenteMoth =>> ' + financialType)
}

const registerTransactions = async (apiUrl, financialType, selectinputs, monthsToRegister) => {
    const dateReplace = selectinputs.dueDate.replace(/-/g, '$').split('$')

    for (const month of monthsToRegister) {
        const dueDate = new Date(dateReplace[0], getMonthIndex(month), dateReplace[2]);
        const payload = createPayload(financialType, selectinputs, month, dueDate)

        try {
            //criar window.registerItem(apiUrl, payload) no arquivo Api.js
            await window.registerItem(apiUrl, payload)
        } catch (error) {
            console.log(error)
        }
    }
}

const getMonthIndex = (month) => {
    const monthsInPortuguese = [
        'janeiro',
        'fevereiro',
        'março',
        'abril',
        'maio',
        'junho',
        'julho',
        'agosto',
        'setembro',
        'outubro',
        'novembro',
        'dezembro',
    ];

    return monthsInPortuguese.indexOf(month.toLowerCase());
}

const createPayload = (financialType, selectinputs, month, dueDate) => {
    //criar função getCurrentYear na pasta generic no arquivo MonthsTransaction
    const currentYear = getCurrentYear();

    const payload = {
        user: {
            title: selectinputs.user,
            month: {
                title: month,
                year: currentYear,
                listMonth: {
                    [financialType]: selectinputs[financialType],
                    value: selectinputs.value,
                    dueDate,
                    paymentMethod: selectinputs.paymentMethod
                }
            }
        }
    }

    if (financialType === 'expense') {
        payload.user.month.listmonth.category = selectinputs.category;
    }

    return payload;
}