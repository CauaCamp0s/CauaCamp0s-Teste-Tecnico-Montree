import { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const ItemList = () => {
  const [itens, setItens] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchItens = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API_URL}/itens`)
      setItens(response.data.itens || response.data)
      setError('')
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao carregar itens')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchItens()
  }, [])

  if (loading) {
    return (
      <div className="section">
        <h2>Lista de Itens</h2>
        <div className="loading">Carregando itens...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="section">
        <h2>Lista de Itens</h2>
        <div className="error">{error}</div>
        <button className="btn" onClick={fetchItens}>
          Tentar Novamente
        </button>
      </div>
    )
  }

  return (
    <div className="section">
      <h2>Lista de Itens</h2>
      
      {itens.length === 0 ? (
        <div className="empty-state">
          <p>Nenhum item cadastrado ainda.</p>
          <p>Crie seu primeiro item usando o formulário acima!</p>
        </div>
      ) : (
        <div className="list">
          {itens.map(item => (
            <div key={item.id} className="list-item">
              <h3>{item.nome}</h3>
              <p><strong>Preço:</strong> R$ {item.preco.toFixed(2)}</p>
              <p><strong>Estoque:</strong> {item.qtd_atual} unidades</p>
              <p><strong>Criado em:</strong> {new Date(item.created_at).toLocaleString('pt-BR')}</p>
            </div>
          ))}
        </div>
      )}

      <button className="btn" onClick={fetchItens}>
        Atualizar Lista
      </button>
    </div>
  )
}

export default ItemList
