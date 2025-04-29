// import load recipe and state form modal.js
import * as modal from './modal';
import recipeView from './view/recipeView';
import searchView from './view/searchView';
import resultsView from './view/resultsView';
import paginationView from './view/paginationView';

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io
// the api is \\ https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886
///////////////////////////////////////
// samour chandra paul

// showRecips();
// render spinner

const controlRecipe = async function () {
  try {
    // render the spinner here
    recipeView.loadSpinner();
    // get id from the hash change event
    const id = window.location.hash.slice(1);
    // load recipe from the load recipe
    await modal.loadRecipe(id);
    // renderr the recipe
    recipeView.render(modal.state.recipe);
    // render markup
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};

const controlSearchResults = async function () {
  try {
    // render the spinner here
    resultsView.loadSpinner();
    // get the query
    const query = searchView.getQuery();
    if (!query) return;
    // console.log(modal.state.search.results);
    await modal.loadSearchResults(query);

    // resultsView
    resultsView.render(modal.getPeginationResult());

    paginationView.render(modal.state.search);
  } catch (err) {
    console.error(err);
    resultsView.renderError();
  }
};

const controlPagination = function (pages) {
  resultsView.render(modal.getPeginationResult(pages));
  paginationView.render(modal.state.search);
};
const controlServings = function (newServing) {
  modal.upadateSurvings(newServing);
  recipeView.render(modal.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.handlePagination(controlPagination);
  recipeView.handlupdateSurvings(controlServings);
};
init();
