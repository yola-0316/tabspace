import React from 'react'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { theme as primer } from '@primer/components'

import TabSpace from './pages/app'
import Options from './pages/options'

const theme = { ...primer }

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router basename="/tabspace">
        <Switch>
          <Route path="/app">
            <TabSpace />
          </Route>
          <Route path="/options">
            <Options />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  )
}

export default App
