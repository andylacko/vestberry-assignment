import React from 'react'
import { ApolloProvider } from 'react-apollo'
import Page from './pages/Page'
import client from './config/apollo'
import styles from './App.scss'

const App = () =>
  <div className={styles.main}>
    <div className={styles.pageHeader}>
      Vestberry test assignment
    </div>
    <div className={styles.content}>
      <ApolloProvider client={client}>
        <Page />
      </ApolloProvider>
    </div>
  </div>

export default App
