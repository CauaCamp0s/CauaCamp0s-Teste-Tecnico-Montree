import axios from 'axios';
import knex from '../database/connection.js';
import Compra from '../models/Compra.js';
import Item from '../models/Item.js';

class CompraController {
  static async create(req, res) {
    try {
      const { item_id } = req.body;

      if (!item_id) {
        return res.status(400).json({
          error: 'Por favor, informe o item_id do produto que deseja comprar.'
        });
      }

      const item = await Item.findById(item_id);
      if (!item) {
        return res.status(404).json({
          error: 'Item não encontrado. Verifique se o ID está correto.'
        });
      }

      if (!await Item.hasStock(item_id)) {
        return res.status(400).json({
          error: 'Este item está sem estoque disponível.'
        });
      }

      let comprador_github_login;
      try {
        const githubUrl = 'https://api.github.com/users';
        const githubResponse = await axios.get(githubUrl);
        const users = githubResponse.data;
        const randomUser = users[Math.floor(Math.random() * users.length)];
        comprador_github_login = randomUser.login;
      } catch (githubError) {
        console.error('Erro ao acessar API do GitHub:', githubError);
        return res.status(500).json({
          error: 'Erro ao conectar com o GitHub. Tente novamente mais tarde.'
        });
      }

      const compra = await Compra.create({
        comprador_github_login,
        item_id
      });

      await Item.updateStock(item_id, item.qtd_atual - 1);

      const compraCompleta = await Compra.findById(compra.id);
      res.status(201).json({
        message: 'Compra realizada com sucesso',
        compra: compraCompleta
      });
    } catch (error) {
      console.error('Erro ao criar compra:', error);
      res.status(500).json({ 
        error: 'Erro interno ao processar a compra. Tente novamente mais tarde.' 
      });
    }
  }

  static async list(req, res) {
    try {
      const compras = await Compra.findAll();
      res.json({
        message: compras.length > 0 ? `Encontradas ${compras.length} compra(s)` : 'Nenhuma compra realizada',
        compras
      });
    } catch (error) {
      console.error('Erro ao listar compras:', error);
      res.status(500).json({ 
        error: 'Erro interno ao buscar as compras. Tente novamente mais tarde.' 
      });
    }
  }
}

export default CompraController;