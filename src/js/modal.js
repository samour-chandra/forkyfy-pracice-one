// import the getjson
import { getJson } from './view/helper';

// import the recipe url from the helper
import { RECIPE_URL, REICIPR_PER_PAGE } from './config';
export const state = {
  state: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: REICIPR_PER_PAGE,
  },
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJson(`${RECIPE_URL}${id}`);
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      imageUrl: recipe.image_url,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      servings: recipe.servings,
      sourceUrl: recipe.source_url,
      title: recipe.title,
      cookingTime: recipe.cooking_time,
    };
  } catch (err) {
    // console.error(`this error from the created ${err} modal file `);
    throw err;
  }
};

// search results

export const loadSearchResults = async function (query) {
  try {
    const data = await getJson(`${RECIPE_URL}?search=${query}`);
    state.search.results = data.data.recipes.map(ing => {
      return {
        id: ing.id,
        title: ing.title,
        publisher: ing.publisher,
        image: ing.image_url,
      };
    });
  } catch (err) {
    throw err;
  }
};

// loadSearchResults('pizza');

export const getPeginationResult = function (pages = state.search.page) {
  state.search.page = pages;

  const startIndex = (pages - 1) * state.search.resultsPerPage;
  const endIndex = pages * state.search.resultsPerPage;
  return state.search.results.slice(startIndex, endIndex);
};

export const upadateSurvings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });
  state.recipe.servings = newServings;
};
