class Menu extends HTMLElement {
    constructor() {
        super()

        fetch('src/components/dashboard/menu/Menu.html')
            .then(response => response.text())
            .then(text => this.innerHTML = text)
    }

    connectedCallback() {
        setTimeout(() => {
            getImageUser();
            messageWelcome();            
        }, 1000);
    }
}

const messageByHour = (hour) => {
    if ( hour <= 5) {
        return 'Boa madrugada';
    }
    if ( hour <= 12) {
        return 'bom dia!';
    }
    if ( hour <= 18) {
        return 'Boas tarde';
    }

    return 'Boa noite!';
}

const messageWelcome = () => {
    const messageContainer = document.querySelector('.message');
    const { name } = JSON.parse(localStorage.getItem('userInfo'))
    const currentHour = new Date().getHours();
    const greetingMessage = messageByHour(currentHour);
    const capitalizeNameUser = capitalizeFirstLetter(name);
    messageContainer.innerHTML = `Olá <strong>${capitalizeNameUser}</strong>, ${greetingMessage}`;
}

const getImageUser = () => {
    const img = document.querySelector('.profile-img');
    const nameImage = JSON.parse(localStorage.getItem('userInfo'))

    window.downloadImg(`${window.apiURL}/download/image`, nameImage.image)
    .then(response => response.json())
    .then(response => {
        let src = `data:image/jpg;base64, ${response.image}`
        img.src = src;
    })
}

if ('customElements' in window) {
    customElements.define('app-menu', Menu)
}