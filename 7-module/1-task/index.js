import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.render();
    this.addEventListeners();
    this.currentSlideNumber = 0;
  }

  render() {
    this.elem = createElement(`
        <div class="ribbon">
            <!--Кнопка прокрутки влево-->
            <button class="ribbon__arrow ribbon__arrow_left ">
              <img src="/assets/images/icons/angle-icon.svg" alt="icon">
            </button>

            <!--Ссылки на категории-->
            <nav class="ribbon__inner"></nav>

            <!--Кнопка прокрутки вправо-->
            <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
              <img src="/assets/images/icons/angle-icon.svg" alt="icon">
            </button>
        </div>
    `);

    let categories = this.categories.map(({ id, name }) => createElement(`
      <a href="#" class="ribbon__item" data-id="${id}">${name}</a>
    `));

    this.sub(`inner`).append(...categories);
  }

  addEventListeners() {
    // событие при нажатии кнопок прокрутки вперёд и назад
    this.elem.onclick = ({ target }) => {
      let buttons = this.sub('inner').querySelectorAll('.ribbon__item');
      for (const btn of buttons)
        btn.classList.remove('ribbon__item_active');

      let button = target.closest('.ribbon__item');
      if (button) {
        button.classList.toggle('ribbon__item_active');

        let id = target.closest('[data-id]').dataset.id;
        this.elem.dispatchEvent(new CustomEvent('ribbon-select', {
          detail: id,
          bubbles: true
        }));
        return false;
      }

      if (target.closest('.ribbon__arrow_left')) {
        this.prev();
      }

      if (target.closest('.ribbon__arrow_right')) {
        this.next();
      }
    };

    // событие при скролле
    this.sub('inner').addEventListener('scroll', ev => {
      let scrollWidth = this.sub('inner').scrollWidth;
      let scrollLeft = this.sub('inner').scrollLeft;
      let clientWidth = this.sub('inner').clientWidth;
      let scrollRight = scrollWidth - scrollLeft - clientWidth;

      if (scrollLeft === 0) {
        this.sub('arrow_left').classList.remove('ribbon__arrow_visible');
        this.sub('arrow_right').classList.add('ribbon__arrow_visible');
      }

      if (scrollLeft > 0 && scrollRight > 1) {
        this.sub('arrow_left').classList.add('ribbon__arrow_visible');
        this.sub('arrow_right').classList.add('ribbon__arrow_visible');
      }

      if (scrollRight <= 1) {
        this.sub('arrow_left').classList.add('ribbon__arrow_visible');
        this.sub('arrow_right').classList.remove('ribbon__arrow_visible');
      }
    });
  }

  sub(ref) {
    return this.elem.querySelector(`.ribbon__${ref}`);
  }

  prev() {
    this.currentSlideNumber--;
    this.sub('inner').scrollBy(-350, 0);
  }

  next() {
    this.currentSlideNumber++;
    this.sub('inner').scrollBy(350, 0);
  }
}
