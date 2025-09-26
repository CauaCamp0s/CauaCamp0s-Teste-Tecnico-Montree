import { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const CompraForm = ({ onCompraCreated }) => {
  const [itemId, setItemId] = useState('')
  const [itens, setItens] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingItens, setLoadingItens] = useState(true)
  const [message, setMessage] = useState('')

  const fetchItens = async () => {
    try {
      setLoadingItens(true)
      const response = await axios.get(`${API_URL}/itens`)
      setItens(response.data.itens || response.data)
    } catch (error) {
      console.error('Erro ao carregar itens:', error)
    } finally {
      setLoadingItens(false)
    }
  }

  useEffect(() => {
    fetchItens()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const response = await axios.post(`${API_URL}/compras`, {
        item_id: parseInt(itemId)
      })

      setMessage(response.data.message || 'Compra realizada com sucesso')
      setItemId('')
      
      if (onCompraCreated) {
        onCompraCreated()
      }

      fetchItens()
    } catch (error) {
      setMessage(error.response?.data?.error || 'Erro ao realizar compra')
    } finally {
      setLoading(false)
    }
  }

  const itensComEstoque = itens.filter(item => item.qtd_atual > 0)

  return (
    <div className="section">
      <h2>Realizar Compra</h2>
      
      {message && (
        <div className={message.includes('sucesso') ? 'success' : 'error'}>
          {message}
        </div>
      )}

      {loadingItens ? (
        <div className="loading">Carregando itens disponíveis...</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="item_id">Selecionar Item</label>
            <select
              id="item_id"
              value={itemId}
              onChange={(e) => setItemId(e.target.value)}
              required
              className="form-group input"
              style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
            >
              <option value="">Selecione um item</option>
              {itensComEstoque.map(item => (
                <option key={item.id} value={item.id}>
                  {item.nome} - R$ {item.preco.toFixed(2)} (Estoque: {item.qtd_atual})
                </option>
              ))}
            </select>
          </div>

          {itensComEstoque.length === 0 && (
            <div className="error">
              Nenhum item disponível para compra. Todos os itens estão sem estoque.
            </div>
          )}

          <button 
            type="submit" 
            className="btn btn-success"
            disabled={loading || itensComEstoque.length === 0}
          >
            {loading ? 'Processando...' : 'Realizar Compra'}
          </button>
        </form>
      )}
    </div>
  )
}

export default CompraForm
