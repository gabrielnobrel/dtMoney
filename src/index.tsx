import React from 'react';
import ReactDOM from 'react-dom';
import { Model, createServer } from 'miragejs'
import { App } from './App';

// configuração inicial de miragejs
createServer({
  // Criar um banco de dados mirage
  models: {
    transaction: Model
  },

  seeds(server) {
    //exemplo de transações
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freelancer de website',
          type: 'deposit',
          category: 'Dev',
          amount: 6000,
          createdAt: new Date('2021-02-12 09:00:00'),
        },
        {
          id: 2,
          title: 'Aluguel',
          type: 'withdraw',
          category: 'Casa',
          amount: 1100,
          createdAt: new Date('2021-02-14 11:00:00'),
        },
      ]
    })
  },

  routes() {
    this.namespace = 'api';

    //tipo da requisição
    this.get('/transactions', () => {
      return this.schema.all('transaction');
    })

    // Criar uma nova transação
    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody) // converter de texto para formato JSON

      return schema.create('transaction', data) // enviar dados para o BD
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)