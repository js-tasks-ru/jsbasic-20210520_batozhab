import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {
  constructor(product) {
    this.data = product;
    this.render();
  }

  render() {
    if (!this.elem) {
      this.elem = document.createElement('div');
      this.elem.className = 'card';

      const { name, price, image, id } = this.data;

      const elemContent = `
        <div class="card__top">
          <img src="/assets/images/products/${image}" class="card__image" alt="product">
          <span class="card__price">€${price.toFixed(2)}</span>
        </div>
        <div class="card__body">
          <div class="card__title">
            ${name}
          </div>
          <button type="button" class="card__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      `;

      this.elem.insertAdjacentHTML('beforeend', elemContent);

      const customEvent = new CustomEvent("product-add", {
        detail: id,
        bubbles: true
      });

      const button = this.elem.querySelector('button');
      button.addEventListener('click', () => this.elem.dispatchEvent(customEvent));
    }
  }

}