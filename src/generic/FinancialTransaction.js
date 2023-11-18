//deixa a primeira letra maiuscula
const capitalizeFirstLetter = (string) => {
    return string.substring(0,1).toUpperCase() + string.substring(1);
}

const openDialogAddFinancial = (financialType) => {
    const dialogSelector = (financialType === 'income') ? '.add-income-modal' : '.add-expense-modal';
    const dialog = document.querySelector(dialogSelector);
    dialog.click();
}