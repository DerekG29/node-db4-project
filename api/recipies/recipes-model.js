const db = require('../../data/db-config');

module.exports = {
  getById
}

async function getById(recipe_id) {
  const data = await db('recipes as r')
    .leftJoin('steps as st', 'r.recipe_id', 'st.recipe_id')
    .leftJoin('steps_ingredients as si', 'si.step_id', 'st.step_id')
    .leftJoin('ingredients as i', 'i.ingredient_id', 'si.ingredient_id')
    .where('r.recipe_id', recipe_id)
    .select(
      'r.recipe_id as recipe_id',
      'recipe_name',
      'created_at',
      'st.step_id as step_id',
      'step_number',
      'step_instructions',
      'i.ingredient_id as ingredient_id',
      'ingredient_name',
      'quantity'
    )
    .orderBy('step_number');

  const result = {
    recipe_id: data[0].recipe_id,
    recipe_name: data[0].recipe_name,
    created_at: data[0].created_at,
    steps: []
  }

  let ingredients = [];

  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const next = data[i + 1];
    if (item.ingredient_id) {
      ingredients.push({
        ingredient_id: item.ingredient_id,
        ingredient_name: item.ingredient_name,
        quantity: item.quantity
      })
    }
    if (item.step_id !== next?.step_id) {
      result.steps.push({
        step_id: item.step_id,
        step_number: item.step_number,
        step_instructions: item.step_instructions,
        ingredients: ingredients
      })
      ingredients = []
    }
  }

  return result;
}
