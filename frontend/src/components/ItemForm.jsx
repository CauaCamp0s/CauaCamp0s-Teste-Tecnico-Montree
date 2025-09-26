import { useState } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const ItemForm = ({ onItemCreated }) => {
  const [formData, setFormData] = useState({
    nome: '',
    preco: '',
    qtd_atual: ''
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const response = await axios.post(`${API_URL}/itens`, {
        nome: formData.nome,
        preco: parseFloat(formData.preco),
        qtd_atual: parseInt(formData.qtd_atual)
      })

      setMessage(response.data.message || 'Item criado com sucesso')
      setFormData({ nome: '', preco: '', qtd_atual: '' })
      
      if (onItemCreated) {
        onItemCreated()
      }
    } catch (error) {
      setMessage(error.response?.data?.error || 'Erro ao criar item')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="section">
      <h2>Criar Novo Item</h2>
      
      {message && (
        <div className={message.includes('sucesso') ? 'success' : 'error'}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome">Nome do Item</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
            placeholder="Digite o nome do item"
          />
        </div>

        <div className="form-group">
          <label htmlFor="preco">Preço</label>
          <input
            type="number"
            id="preco"
            name="preco"
            value={formData.preco}
            onChange={handleChange}
            required
            min="0.01"
            step="0.01"
            placeholder="Digite o preço"
          />
        </div>

        <div className="form-group">
          <label htmlFor="qtd_atual">Quantidade em Estoque</label>
          <input
            type="number"
            id="qtd_atual"
            name="qtd_atual"
            value={formData.qtd_atual}
            onChange={handleChange}
            required
            min="0"
            placeholder="Digite a quantidade"
          />
        </div>

        <button 
          type="submit" 
          className="btn btn-success"
          disabled={loading}
        >
          {loading ? 'Criando...' : 'Criar Item'}
        </button>
      </form>
    </div>
  )
}

export default ItemForm
