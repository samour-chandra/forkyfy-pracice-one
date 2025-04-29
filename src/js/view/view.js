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
