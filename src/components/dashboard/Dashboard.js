class Dashboard extends HTMLElement {
    constructor(){
        super()

        fetch('src/components/dashboard/Dashboard.html')
        .then(response => response.text())
        .then(text => this.innerHTML = text);
    }

    connectedCallback() {
        setTimeout(() => {
            const loading = document.querySelector('.loading');
            const appContent = document.querySelector('.app-content');

            loading.style.display = 'none'
            appContent.style.display = 'block';

        }, 2000);
    }
}

if('customElements' in window) {
    customElements.define('app-dashboard', Dashboard)
}