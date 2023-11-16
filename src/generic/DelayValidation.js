const addInputValidationEventWithDelay = (Input, validateRegistration, errorElement, button, delay) => {
    let timer;

    Input.addEventListener('input', e => {
        //reinicio a contagem sempre que houer um ocorrencia no input
        clearTimeout(timer);

        const inputValue = e.target.value;

        timer = setTimeout(() => {
            //valida se existe conteúdo na input
            if (inputValue) {
                if (!validateRegistration(inputValue)) {
                    errorElement.style.display = 'block';
                    button.disabled = true;
                } else {
                    errorElement.style.display = 'none';
                    button.disabled = false;
                }
            } else {
                errorElement.style.display = 'none';
                button.disabled = false;
            }
        }, delay);
    });
}