const createSelectElement = (elementType, typeClass, containerSelector, labelTitle, data, maxOptions = null) => {
    const select = document.createElement('select');

    select.classList.add('form-control');
    select.classList.add(`${elementType}-${typeClass}-category`);

    const label = document.createElement('label');
    label.textContent = labelTitle;
    document.querySelector(containerSelector).appendChild(label);

    const optionSelected = document.createElement('option');
    optionSelected.selected = true;
    optionSelected.textContent = 'Selecione a categoria';

    //valida se o select já foi criado, e verifico se o index enviado é menor que o numero de items
    let options = data.filter((_, index) => (maxOptions ? index < maxOptions : false))
        .map((item) => {
            const option = document.createElement('option');
            option.textContent = item.name;
            option.value = item.name;
            return option;
        });
    select.append(optionSelected);
    select.append(...options);

    document.querySelector(containerSelector).appendChild(select);
}