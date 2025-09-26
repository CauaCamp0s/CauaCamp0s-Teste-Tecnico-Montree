import Item from '../models/Item.js';

class ItemController {
  static async create(req, res) {
    try {
      const { nome, preco, qtd_atual } = req.body;

      if (!nome || !preco || qtd_atual === undefined) {
        return res.status(400).json({
          error: 'Por favor, preencha todos os campos obrigatórios: nome, preço e quantidade.'
        });
      }

      if (preco <= 0 || qtd_atual < 0) {
        return res.status(400).json({
          error: 'O preço deve ser maior que zero e a quantidade não pode ser negativa.'
        });
      }

      const item = await Item.create({ nome, preco, qtd_atual });
      res.status(201).json({
        message: 'Item criado com sucesso',
        item
      });
    } catch (error) {
      console.error('Erro ao criar item:', error);
      res.status(500).json({ 
        error: 'Erro interno ao criar o item. Tente novamente mais tarde.' 
      });
    }
  }

  static async list(req, res) {
    try {
      const itens = await Item.findAll();
      res.json({
        message: itens.length > 0 ? `Encontrados ${itens.length} item(s)` : 'Nenhum item cadastrado',
        itens
      });
    } catch (error) {
      console.error('Erro ao listar itens:', error);
      res.status(500).json({ 
        error: 'Erro interno ao buscar os itens. Tente novamente mais tarde.' 
      });
    }
  }
}

export default ItemController;
