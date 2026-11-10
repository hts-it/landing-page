import React from 'react'
import { createRoot } from 'react-dom/client'
import LegalPage from './LegalPage.jsx'
import './styles.css'
import './legal.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LegalPage kind={document.body.dataset.policy} />
  </React.StrictMode>,
)
