export class customToast extends HTMLElement {
    constructor() {
        super();
        this.toastType;
    }

    static get observedAttributes() {
        return ["toastType"];
    }

    attributeChangedCallback(attribute, oldValue, newValue) {
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
                        <div>Enviado con éxito</div>
                    </div>
                `;
                break;
            case "error":
                this.errorToast();
                break;
            case "warning":
                this.warningToast();
                break;
        }
    }
    
}

window.customElements.define('custom-toast', customToast);