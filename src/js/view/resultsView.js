import view from './view';

class resultsView extends view {
  _parentElement = document.querySelector('.results');

  _generateMarkup() {
    console.log(this._data);
    return this._data.map(this._generateMarkupPreview).join('');
  }
  _generateMarkupPreview(result) {
    const id = window.location.hash.slice(1);
    console.log(id);
    return `
    <li class="preview">
        <a class="preview__link  ${
          result.id === id ? 'preview__link--active' : ''
        } " href="#${result.id}">
          <figure class="preview__fig">
              <img src="${result.image}" alt="Test" />
          </figure>
          <div class="preview__data">
              <h4 class="preview__title">${result.title}</h4>
              <p class="preview__publisher">${result.publisher}</p>
              <div class="preview__user-generated">
                <svg>
                  <use href="src/img/icons.svg#icon-user"></use>
                </svg>
              </div>
          </div>
        </a>
    </li>
    `;
  }
}
export default new resultsView();
