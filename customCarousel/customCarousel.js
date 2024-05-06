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

    renderNewUser() {
        this.innerHTML = `
        <div class="custom-carousel" style="border-color:${this.borderColor}; background-color:${this.backgroudColor};">
        ${this.titles.map((title, index) => {
                        return `
                            <custom-card class="unlocked"
                                title="${title}" 
                                description="${this.descriptions[index]}" 
                                image="${this.images[index]}"
                                navigation="${this.navigations[index]}"
                            >
                            </custom-card>`;

                    }
                ).join("")}
            </div>`;
    }
}

window.customElements.define('custom-carousel', customCarousel);
