const root = document.querySelector(".root");
class Rating {
    constructor(){
        this.star = new Star();
    }
    render() {
        return `
      <div class="rating">
        ${this.star.render()}
      </div>
    `;
    }
}
class Star {
    constructor(){}
    render() {
        return `
        <div class="star">
            <img src="./images/icon-star.svg" alt="star">
        </div>
        `;
    }
}
root.innerHTML = new Rating().render();

//# sourceMappingURL=index.672d4772.js.map
