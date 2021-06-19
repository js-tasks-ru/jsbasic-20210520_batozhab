import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.render();
  }

  render() {
    if (!this.elem) {
      this.elem = document.createElement('div');
      this.elem.className = 'carousel';
    }

    const arrowButtons = `
        <div class="carousel__arrow carousel__arrow_right">
            <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
            <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner"></div>
      `;

    this.elem.insertAdjacentHTML('beforeend', arrowButtons);

    const items = this.slides
      .map(({ id, name, price, image }) => {
        return `<div class="carousel__slide" data-id="${id}">
                    <img src="/assets/images/carousel/${image}" class="carousel__img" alt="slide">
                    <div class="carousel__caption">
                        <span class="carousel__price">€${price.toFixed(2)}</span>
                        <div class="carousel__title">${name}</div>
                        <button type="button" class="carousel__button">
                            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
                        </button>
                    </div>
                </div>`
      })
      .join('');

    const carouselInner = this.elem.querySelector('.carousel__inner');
    carouselInner.insertAdjacentHTML('beforeend', items);

    const arrowRight = this.elem.querySelector('.carousel__arrow_right');
    const arrowLeft = this.elem.querySelector('.carousel__arrow_left');

    const slide = this.elem.querySelector('.carousel__slide');
    arrowLeft.style.display = 'none';
    const slideCount = this.slides.length;
    let currentOffset = 0;

    // click вправо
    arrowRight.addEventListener('click', (event) => {
      arrowLeft.style.display = '';

      currentOffset += slide.offsetWidth;

      if (currentOffset === slide.offsetWidth * (slideCount - 1))
        arrowRight.style.display = 'none';

      carouselInner.style.transform = `translateX(-${currentOffset}px)`;
    });

    // click влево
    arrowLeft.addEventListener('click', (event) => {
      arrowRight.style.display = '';

      currentOffset -= slide.offsetWidth;

      if (currentOffset === 0) {
        arrowLeft.style.display = 'none';
      }

      carouselInner.style.transform = `translateX(-${currentOffset}px)`;
    });

    const slideList = carouselInner.querySelectorAll('.carousel__slide');
    for (const item of slideList) {
      item.addEventListener('click', ({target, currentTarget}) => {
        if (target.tagName !== 'BUTTON') return;

        this.elem.dispatchEvent(new CustomEvent("product-add", {
          detail: currentTarget.dataset.id,
          bubbles: true,
        }));

      });

    }
  }
}
