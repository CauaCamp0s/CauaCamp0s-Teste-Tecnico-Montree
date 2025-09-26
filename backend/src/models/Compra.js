const knex = require('../database/connection');

class Compra {
  static async create(data) {
    const [compra] = await knex('compras').insert(data).returning('*');
    return compra;
  }

  static async findAll() {
    return await knex('compras')
      .join('itens', 'compras.item_id', 'itens.id')
      .select(
        'compras.id',
        'compras.comprador_github_login',
        'compras.created_at',
        'itens.nome as item_nome',
        'itens.preco as item_preco'
      )
      .orderBy('compras.created_at', 'desc');
  }

  static async findById(id) {
    const [compra] = await knex('compras')
      .join('itens', 'compras.item_id', 'itens.id')
      .where('compras.id', id)
      .select(
        'compras.id',
        'compras.comprador_github_login',
        'compras.created_at',
        'itens.nome as item_nome',
        'itens.preco as item_preco'
      );
    return compra;
  }
}

module.exports = Compra;
