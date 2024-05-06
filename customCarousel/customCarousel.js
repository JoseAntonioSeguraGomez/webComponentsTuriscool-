export class customCarousel extends HTMLElement {
    constructor() {
        super();
        this.images = [];
        this.titles = [];
        this.descriptions = [];
        this.navigations = [];
        this.courseID = [];
        this.blocked = false;
        this.newUser = false;
        this.backgroudColor = "white";
        this.borderColor = "#05BFAD"; 

        this.url = "https://academy.turiscool.com/admin/api/"
        this.token = "Bearer 17xa7adwlycG4qrbRatBdCHW41xtl9jNyaBq4d45";
        this.lwId = "62b182eea31d8d9863079f42";
        this.userId = "65d3763f741db932c906da1c";
        this.requestOptions = {
           method: "GET",
           headers: {
              Authorization: this.token,
              "Content-Type": "application/json",
              "Lw-Client": this.lwId,
           },
        };
    }

    static get observedAttributes() {
        return ["data", "backgroudColor", "borderColor"];
    }

    attributeChangedCallback(attribute, oldValue, newValue) {
        if (attribute === "data" && oldValue !== newValue) {
            const data = JSON.parse(newValue);
            this.images = data.images;
            this.titles = data.titles;
            this.descriptions = data.descriptions;
            this.navigations = data.navigations;
            this.backgroudColor = newValue; 
            this.borderColor = newValue;
            this.renderNewUser();
        }
    }


    async renderNewUser() {
        let arrayCourses = [];
        
        // Crear un contenedor para las tarjetas
        const cardContainer = document.createElement('div');
        cardContainer.classList.add('custom-carousel');
        cardContainer.style.borderColor = this.borderColor;
        cardContainer.style.backgroundColor = this.backgroundColor;
    
        for (let index = 0; index < this.titles.length; index++) {
            const card = document.createElement('custom-card');
            card.classList.add('unlocked');
            card.title = this.titles[index];
            card.description = this.descriptions[index];
            card.image = this.images[index];
            card.navigation = this.navigations[index];
    
            // Agregar la tarjeta al contenedor
            cardContainer.appendChild(card);
    
            arrayCourses.push(card);
            if (index < this.titles.length - 1) {
                await this.delay(1000);
            }
        }
    
        // Agregar el contenedor al elemento custom-carousel
        this.appendChild(cardContainer);
    }
    
    
    

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

}

window.customElements.define('custom-carousel', customCarousel);
