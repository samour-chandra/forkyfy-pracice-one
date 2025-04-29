import view from './view';
class paginationView extends view {
  _parentElement = document.querySelector('.pagination');
  handlePagination(handle) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const curPage = +btn.dataset.goto;
      handle(curPage);
    });
  }
  _generateMarkup() {
    const curPage = this._data.page;
    const numPage = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // page 1 , have other page
    if (curPage === 1 && numPage > 1) {
      return `
       <button data-goto ="${
         curPage + 1
       }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-right"></use>
            </svg>
        </button>`;
    }

    // page last ,dont have others page
    if (curPage === numPage && numPage > 1) {
      return `
        <button data-goto ="${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
        </button>`;
    }
    // have other pages
    if (curPage < numPage) {
      return `
      <button data-goto ="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
        </button>
        <button data-goto ="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-right"></use>
            </svg>
        </button>`;
    }
    return '';
  }
}

export default new paginationView();
