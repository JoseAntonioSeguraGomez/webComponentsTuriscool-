class customButton extends HTMLElement {
    constructor() {
        super();
        this.text;
        this.backgroundColor
        this.color;
        this.navigate;

    }
    static get observedAttributes() {
        return ["color", "background-color", "text", "navigate"];
    }

    attributeChangedCallback(atribute, oldValue, newValue) {
        switch (atribute) {
            case "color":
                this.color = newValue;
                break;
            case "background-color":
                this.backgroundColor = newValue;
                break;
            case "text":
                this.text = newValue;
                break;
            case "navigate":
                this.navigate = newValue;
                break;
        }
    }

    connectedCallback() {
        this.innerHTML = `
        <a href="${this.navigate}"><button 
        style="background-color: ${this.backgroundColor}; color:${this.color}; border: solid 1px white; padding:10px 14px; border: none; border-radius: 4px; cursor: pointer;">
        ${this.text}
        </button></a>
        </br>`;

    }

}

class customCard extends HTMLElement {
    constructor() {
        super();
        this.title;
        this.description;
        this.image;
        this.navigation
    }
    static get observedAttributes() {
        return ["title", "description", "image", "navigation"];
    }

    attributeChangedCallback(attribute, oldValue, newValue) {
        if (oldValue !== newValue) {
            switch (attribute) {
                case "title":
                    this.title = newValue;
                    break;
                case "description":
                    this.description = newValue;
                    break;
                case "image":
                    this.image = newValue;
                    break;
                case "navigation":
                    this.navigation = newValue;
                    break;
            }
        }
    }


    connectedCallback() {
        this.innerHTML = `
        <div class = "card">
            <div class = "image-card">
                <img src="${this.image}" alt="${this.title}">
            </div>
            <div class="article-preview">
                <h2>${this.title}</h2>
                <p>${this.description}</p>
                <a href="${this.navigation}"><button>Ir al curso</button></a>
            </div>
        </div>`;
    }
}

class customCarousel extends HTMLElement {
    constructor() {
        super();
        this.images = [];
        this.titles = [];
        this.descriptions = [];
        this.navigations = [];
    }

    static get observedAttributes() {
        return ["data"];
    }

    attributeChangedCallback(attribute, oldValue, newValue) {
        if (attribute === "data" && oldValue !== newValue) {
            const data = JSON.parse(newValue);
            this.images = data.images;
            this.titles = data.titles;
            this.descriptions = data.descriptions;
            this.navigations = data.navigations;
            this.render();
        }
    }

    

    connectedCallback() {
        if (this.hasAttribute("data")) {
            this.render();
        }
    }

    render() {
        this.innerHTML = `
            <div class="custom-carousel">
                ${this.titles.map((title, index) => `
                    <custom-card 
                        title="${title}" 
                        description="${this.descriptions[index]}" 
                        image="${this.images[index]}"
                        navigation="${this.navigations[index]}"
                    >
                    </custom-card>
                `).join("")}
            </div>`;
    }
}

class customInput extends HTMLElement {
    constructor() {
        super();
        this.textType;
        this.place;
        this.data;
        this.cursor;
    }

    static get observedAttributes() {
        return ["place", "config", "cursor", "data"];
    }

    attributeChangedCallback(attribute, oldValue, newValue) {
        if (oldValue !== newValue) {
            switch (attribute) {
                case "place":
                    this.place = newValue;
                    break;
                case "config":
                    this.config = newValue;
                    break;
                case "cursor":
                    this.cursor = newValue;
                    break;
                case "data":
                    this.data = newValue;
                    break;
            }
        }
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <div class="containerInput">
                <input type="${this.config}" placeholder="${this.place}" style="cursor: ${this.cursor}" value="${this.data}"/>
            </div>
        `;
    }
}


window.customElements.define('custom-carousel', customCarousel);
window.customElements.define('custom-button', customButton);
window.customElements.define('custom-card', customCard);
window.customElements.define('custom-input', customInput);