import { useState } from 'react'
import ItemForm from './components/ItemForm'
import ItemList from './components/ItemList'
import CompraForm from './components/CompraForm'
import CompraList from './components/CompraList'

function App() {
  const [refreshKey, setRefreshKey] = useState(0)

  const handleItemCreated = () => {
    setRefreshKey(prev => prev + 1)
  }

  const handleCompraCreated = () => {
    setRefreshKey(prev => prev + 1)
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Montree - Sistema de Compras</h1>
        <p>Gerencie seus itens e realize compras de forma simples e eficiente.</p>
      </div>

      <ItemForm onItemCreated={handleItemCreated} />
      
      <ItemList key={`items-${refreshKey}`} />

      <CompraForm onCompraCreated={handleCompraCreated} />
      
      <CompraList key={`compras-${refreshKey}`} />
    </div>
  )
}

export default App