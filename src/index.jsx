import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import { Footer } from './footer.jsx'
import { Main } from './main.jsx'
import { Header } from './Header.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <Main />
    <Footer />
  </StrictMode>,
)
