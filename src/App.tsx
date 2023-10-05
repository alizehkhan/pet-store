import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'

import './index.css'
import Form from './pages/Form'
import Home from './pages/Home'

function App() {
  return (
    <BrowserRouter>
      <header className="container mx-auto mt-8 px-8">
        <Link to="/">
          <h1 className="inline-block text-6xl font-bold text-gray-700">
            Pet Store
          </h1>
        </Link>
      </header>
      <main className="container mx-auto px-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<Form />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
