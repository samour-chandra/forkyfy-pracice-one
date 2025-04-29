export default class view {
  _errorMessage = 'we could not find the rcipe ! please try  again later';
  _data;
  render(data) {
    if (!data || data.length === 0) return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    if (!data || data.length === 0) return this.renderError();
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElement = Array.from(newDom.querySelectorAll('*'));
    const curElement = Array.from(this._parentElement.querySelectorAll('*'));
    newElement.forEach((newEl, i) => {
      const curEl = curElement[i];
      if (!newEl.isEqualNode(curEl) && newEl.firstChild.nodeValue.trim()) {
        curEl.textContent = newEl.textContent;
        // update change attributes
      }
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr => {
          curEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }

  loadSpinner() {
    const spinnerMarkup = `
        <div class="spinner">
          <svg>
              <use href="src/img/icons.svg#icon-loader"></use>
          </svg>
        </div>
        `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', spinnerMarkup);
  }
  //   real world error handalin
  renderError(message = this._errorMessage) {
    const errorMarkup = `
          <div class="error">
              <div>
                  <svg>
                      <use href="src/img/icons.svg#icon-alert-triangle"></use>
                  </svg>
              </div>
              <p>${message}</p>
          </div>
        `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', errorMarkup);
  }

  //   clear all the data from the container
  _clear() {
    this._parentElement.innerHTML = '';
  }
}
