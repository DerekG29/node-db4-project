/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('recipes', table => {
      table.increments('recipe_id');
      table.string('recipe_name', 128)
        .notNullable()
        .unique();
      table.string('created_at', 32)
        .notNullable();
    })

    .createTable('steps', table => {
      table.increments('step_id');
      table.integer('step_number')
        .notNullable()
        .unsigned();
      table.string('step_instructions', 256)
        .notNullable();
      table.integer('recipe_id')
        .unsigned()
        .notNullable()
        .references('recipe_id')
        .inTable('recipes')
        .onUpdate('RESTRICT')
        .onDelete('RESTRICT');
    })

    .createTable('ingredients', table => {
      table.increments('ingredient_id');
      table.string('ingredient_name', 128)
        .notNullable();
    })

    .createTable('steps_ingredients', table => {
      table.increments('step_ingredient_id');
      table.integer('quantity')
        .unsigned()
        .notNullable();
      table.integer('ingredient_id')
        .unsigned()
        .notNullable()
        .references('ingredient_id')
        .inTable('ingredients')
        .onUpdate('RESTRICT')
        .onDelete('RESTRICT');
      table.integer('step_id')
        .unsigned()
        .notNullable()
        .references('step_id')
        .inTable('steps')
        .onUpdate('RESTRICT')
        .onDelete('RESTRICT');
    })
    
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('steps_ingredients')
  .dropTableIfExists('ingredients')
  .dropTableIfExists('steps')
  .dropTableIfExists('recipes')
};
