exports.up = function(knex) {
  return knex.schema.createTable('itens', function(table) {
    table.increments('id').primary();
    table.string('nome').notNullable();
    table.decimal('preco', 10, 2).notNullable();
    table.integer('qtd_atual').notNullable().defaultTo(0);
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('itens');
};
