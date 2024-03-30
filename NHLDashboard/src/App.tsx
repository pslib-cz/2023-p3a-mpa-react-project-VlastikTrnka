import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TeamsList, { NHLTeams } from './components/NHLTeams'

function App() {

  return (
    <NHLTeams />
  )
}

export default App
