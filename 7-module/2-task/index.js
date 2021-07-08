import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.render();
    this.addEventListeners();
  }

  render() {
    this.elem = createElement(`
      <div class="modal">
          <div class="modal__overlay"></div>

          <div class="modal__inner">
            <div class="modal__header">
              <button type="button" class="modal__close">
                <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
              </button>
              <h3 class="modal__title"></h3>
            </div>

            <div class="modal__body"></div>
        </div>

      </div>
    `);
  }

  setTitle(title) {
    this.sub(`title`).textContent = title;
  }

  setBody(node) {
    this.sub(`body`).innerHTML = '';
    this.sub(`body`).append(node);
  }

  open() {
    document.body.append(this.elem);
    document.body.classList.add('is-modal-open');
  }

  close() {
    this.elem.remove();
    document.body.classList.remove('is-modal-open');
  }

  addEventListeners() {
    this.elem.onclick = (({ target }) => {
      let button = target.closest('.modal__close');
      if (button)
        this.close();
    });

    document.addEventListener('keydown', ev => {
      if (ev.code === 'Escape')
        this.close();
    });
  }

  sub(ref) {
    return this.elem.querySelector(`.modal__${ref}`);
  }
}