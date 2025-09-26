import { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const CompraList = () => {
  const [compras, setCompras] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchCompras = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API_URL}/compras`)
      setCompras(response.data.compras || response.data)
      setError('')
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao carregar compras')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCompras()
  }, [])

  if (loading) {
    return (
      <div className="section">
        <h2>Histórico de Compras</h2>
        <div className="loading">Carregando compras...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="section">
        <h2>Histórico de Compras</h2>
        <div className="error">{error}</div>
        <button className="btn" onClick={fetchCompras}>
          Tentar Novamente
        </button>
      </div>
    )
  }

  return (
    <div className="section">
      <h2>Histórico de Compras</h2>
      
      {compras.length === 0 ? (
        <div className="empty-state">
          <p>Nenhuma compra realizada ainda.</p>
          <p>Realize sua primeira compra usando o formulário acima!</p>
        </div>
      ) : (
        <div className="list">
          {compras.map(compra => (
            <div key={compra.id} className="list-item">
              <h3>{compra.item_nome}</h3>
              <p><strong>Preço:</strong> R$ {compra.item_preco.toFixed(2)}</p>
              <p><strong>Comprador:</strong> {compra.comprador_github_login}</p>
              <p><strong>Data da Compra:</strong> {new Date(compra.created_at).toLocaleString('pt-BR')}</p>
            </div>
          ))}
        </div>
      )}

      <button className="btn" onClick={fetchCompras}>
        Atualizar Lista
      </button>
    </div>
  )
}

export default CompraList
