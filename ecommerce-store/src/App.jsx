import { useState } from 'react'
import './App.css'
import product from './data/product.json'
import Header from './components/Header/Header'
function App() {
  const phones = product

  return (
    <>
    <Header></Header>
    </>
  )
}

export default App
