const axios = require('axios');
const knex = require('../database/connection');
const Compra = require('../models/Compra');

class CompraController {
  static async create(req, res) {
    try {
      const { item_id } = req.body;

      if (!item_id) {
        return res.status(400).json({
          error: 'Campo obrigatório: item_id'
        });
      }

      const item = await knex('itens').where('id', item_id).first();
      if (!item) {
        return res.status(404).json({
          error: 'Item não encontrado'
        });
      }

      if (item.qtd_atual <= 0) {
        return res.status(400).json({
          error: 'Item sem estoque disponível'
        });
      }

      let comprador_github_login;
      try {
        const githubResponse = await axios.get('https://api.github.com/users');
        const users = githubResponse.data;
        const randomUser = users[Math.floor(Math.random() * users.length)];
        comprador_github_login = randomUser.login;
      } catch (githubError) {
        console.error('Erro ao acessar API do GitHub:', githubError);
        return res.status(500).json({
          error: 'Erro ao acessar API do GitHub'
        });
      }

      const compra = await Compra.create({
        comprador_github_login,
        item_id
      });

      await knex('itens')
        .where('id', item_id)
        .update({ qtd_atual: item.qtd_atual - 1 });

      const compraCompleta = await Compra.findById(compra.id);
      res.status(201).json(compraCompleta);
    } catch (error) {
      console.error('Erro ao criar compra:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  static async list(req, res) {
    try {
      const compras = await Compra.findAll();
      res.json(compras);
    } catch (error) {
      console.error('Erro ao listar compras:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

module.exports = CompraController;