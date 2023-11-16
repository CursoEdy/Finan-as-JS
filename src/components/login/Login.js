class Login extends HTMLElement {
  constructor() {
    super();

    fetch('src/components/login/Login.html')
    .then(response => response.text())
    .then(text => this.innerHTML = text)
  }

  //metodo de ciclo de vida assim que o componente for renderizado na DOM
  connectedCallback(){
    console.log('componente redenrizado na DOM Login.js');
  }
}

if('customElements' in window) {
  customElements.define('app-login', Login);
}

document.addEventListener('click', e => {
  const el = e.target;
  if(el.classList.contains('modal-registration')){
    openRegistrationModal();
  }
})

const openRegistrationModal = () => {
  const diolog = document.querySelector('.dialog-registration-modal');
  diolog.click();
}