/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.data = rows;
    this.render();
  }

  render() {
    if (!this.elem) {
      this.elem = document.createElement('TABLE');
      this.elem.insertAdjacentHTML('beforeend',
        `<thead>
          <tr>
              <th>Имя</th>
              <th>Возраст</th>
              <th>Зарплата</th>
              <th>Город</th>
              <th></th>
          </tr>
        </thead>
        <tbody>
        </tbody>`
      );
    }

    const tds = this.data
      .map(({ name, age, salary, city }) => {
        return `<tr>
                  <td>${name}</td>
                  <td>${age}</td>
                  <td>${salary}</td>
                  <td>${city}</td>
                  <td><button>X</button></td>
                </tr>`
      })
      .join('');

    const tbody = this.elem.querySelector('tbody');

    tbody.insertAdjacentHTML('beforeEnd', tds);
    const trs = tbody.querySelectorAll('tr');

    for (const tr of trs)
      tr.addEventListener('click', this.onBtnClick.bind(this))
  }

  onBtnClick(e) {
    // удаляет строку при клике
    if (e.target.tagName === "BUTTON")
      e.currentTarget.remove();

    // удаляет заголовок таблицы
    const trs = this.elem.querySelectorAll('tbody tr');
    if (trs.length === 0) {
      const thead = this.elem.querySelector('thead');
      thead.remove();
    }
  }

}