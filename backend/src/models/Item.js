const knex = require('../database/connection');

class Item {
  static async create(data) {
    const [item] = await knex('itens').insert(data).returning('*');
    return item;
  }

  static async findAll() {
    return await knex('itens').select('*').orderBy('created_at', 'desc');
  }

  static async findById(id) {
    const [item] = await knex('itens').where('id', id).select('*');
    return item;
  }

  static async updateStock(id, newQuantity) {
    const [item] = await knex('itens')
      .where('id', id)
      .update({ qtd_atual: newQuantity })
      .returning('*');
    return item;
  }

  static async hasStock(id) {
    const item = await this.findById(id);
    return item && item.qtd_atual > 0;
  }
}

module.exports = Item;
