const recipes = [
  { recipe_name: 'Spaghetti Bolognese', created_at: new Date().toUTCString() },
  { recipe_name: 'Test Recipe', created_at: new Date().toUTCString() }
];

const steps = [
  {
    step_number: 1,
    step_instructions: 'Put a large saucepan on a medium heat',
    recipe_id: 1
  },
  {
    step_number: 2,
    step_instructions: 'Add 1 tbsp of olive oil',
    recipe_id: 1
  },
  {
    step_number: 1,
    step_instructions: 'Test step 1: Add test ingredient 1 & 2',
    recipe_id: 2
  },
  {
    step_number: 2,
    step_instructions: 'Test step 2: Add test ingredient 3',
    recipe_id: 2
  },
];

const ingredients = [
  { ingredient_name: 'olive oil' },
  { ingredient_name: 'test ingredient 1' },
  { ingredient_name: 'test ingredient 2' },
  { ingredient_name: 'test ingredient 3' },
];

const steps_ingredients = [
  { quantity: 0.014, ingredient_id: 1, step_id: 2 },
  { quantity: 1, ingredient_id: 2, step_id: 3 },
  { quantity: 2, ingredient_id: 3, step_id: 3 },
  { quantity: 3, ingredient_id: 4, step_id: 4 },
];

exports.seed = async function(knex) {
  await knex('recipes').insert(recipes);
  await knex('steps').insert(steps);
  await knex('ingredients').insert(ingredients);
  await knex('steps_ingredients').insert(steps_ingredients);
};
