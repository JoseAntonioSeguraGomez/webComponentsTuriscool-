export class customToast extends HTMLElement {
    constructor() {
        super();
        this.toastType = "success";
    }

    static get observedAttributes() {
        return ["toastType"];
        
    }

    attributeChangedCallback(attribute, oldValue, newValue) {
        console.log(this.toastType);

        if (oldValue !== newValue) {
            switch (attribute) {
                case "toastType":
                    this.toastType = newValue;
                    break;
            }
        }
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.classList.add('toastBox');
        switch (this.toastType) {
            case "success":
                this.innerHTML = `
                    <div class="toast">
                        <p>Enviado con éxito</p>
                    </div>
                `;
                break;
            case "error":
                this.innerHTML = `
                <div class="toast">
                    <p>Error en la solicitud</p>
                </div>
            `;
                break;
            case "warning":
                this.innerHTML = `
                <div class="toast">
                    <p>Texto introducido incorrecto, vuelva a intentarlo.</p>
                </div>
            `;
                break;
        }
        setTimeout(() => {
            this.remove();
        }, 6000);
    }
    
}

window.customElements.define('custom-toast', customToast);