import { ReactNode, createContext, useEffect, useState } from 'react'
import { api } from './services/api';

interface ITransaction {
   id: number,
   title: string,
   amount: number,
   type: string,
   category: string,
   createdAt: string
}

interface ITransactionsProviderProps {
   children: ReactNode // aceita tudo do react
}

export const TransactionsContext = createContext<ITransaction[]>([]);

export function TransactionsProvider({ children }: ITransactionsProviderProps) {
   const [transactions, setTransactions] = useState<ITransaction[]>([]);

   useEffect(() => {
      api.get('/transactions') // tipo de requisição
         .then(response => setTransactions(response.data.transactions))
   }, []);

   return (
      <TransactionsContext.Provider value={transactions}>
         {children}
      </TransactionsContext.Provider>
   )
}