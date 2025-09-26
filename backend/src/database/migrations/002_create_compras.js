exports.up = function(knex) {
  return knex.schema.createTable('compras', function(table) {
    table.increments('id').primary();
    table.string('comprador_github_login').notNullable();
    table.integer('item_id').unsigned().notNullable();
    table.timestamps(true, true);
    
    table.foreign('item_id').references('id').inTable('itens');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('compras');
};
