// import load recipe and state form modal.js
import * as modal from './modal';
import recipeView from './view/recipeView';
import searchView from './view/searchView';
import resultsView from './view/resultsView';

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
    console.log('this function has called');
    // renderr the recipe
    recipeView.render(modal.state.recipe);
    console.log(modal.state.recipe);
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
    console.log(modal.state.search.results);

    // resultsView
    resultsView.render(modal.state.search.results);
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
