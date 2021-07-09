import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {


    this.steps = steps;
    this.value = value;
    this.render();
    this.addEventListeners();
  }

  render() {
    this.elem = createElement(`
      <div class="slider">

        <!--Ползунок слайдера с активным значением-->
        <div class="slider__thumb">
          <span class="slider__value">0</span>
        </div>
      
        <!--Полоска слайдера-->
        <div class="slider__progress"></div>
      
          <!-- Шаги слайдера (вертикальные чёрточки) -->
          <div class="slider__steps">
           
          </div>

      </div>
    `);

    for (let i = 0; i < this.steps; i++)
    {
      if (i == 0) {
        this.sub(`steps`).insertAdjacentHTML('beforeend', `<span class="slider__step-active"></span>`);
        continue;
      }
      this.sub(`steps`).insertAdjacentHTML('beforeend', `<span></span>`);
    }
      
  }

  addEventListeners() {
    this.elem.onclick = (ev => {
    
      // расстояние в пикселях от начала слайдера до места клика
      let left = ev.clientX - this.elem.getBoundingClientRect().left;

      let leftRelative = left / this.elem.offsetWidth;
      let segments = this.steps - 1;
      let approximateValue = leftRelative * segments;
      let value = Math.round(approximateValue);
      let valuePercents = value / segments * 100;

      let thumb = this.sub('thumb');
      let progress = this.sub('progress');
      let sliderValue = this.sub('value');

      // Значение в процентах от 0 до 100
      let leftPercents = valuePercents;

      thumb.style.left = `${leftPercents}%`;
      progress.style.width = `${leftPercents}%`;
      sliderValue.textContent = value;

      // визуальное выделение шага на слайдере
      let inx = 0;
      for (const item of this.elem.querySelectorAll('.slider__steps span')) {
        item.classList.remove('slider__step-active');
        if (inx === value)
          item.classList.add('slider__step-active');
          inx++;
      }

      // генерация пользовательского события "slider-change"
      this.elem.dispatchEvent(new CustomEvent('slider-change', {
        detail: value,
        bubbles: true
      }));
    });
  }

  sub(ref) {
    return this.elem.querySelector(`.slider__${ref}`);
  }
}