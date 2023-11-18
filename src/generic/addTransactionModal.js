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