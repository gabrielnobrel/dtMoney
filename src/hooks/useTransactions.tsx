import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { api } from '../services/api';

interface ITransaction {
   id: number,
   title: string,
   amount: number,
   type: string,
   category: string,
   createdAt: string
}

type ITransactionInput = Omit<ITransaction, 'id' | 'createdAt'> // ele vai pegar todos os campos referentes ao ITransaction menos o id e o createAt

interface ITransactionsProviderProps {
   children: ReactNode // aceita tudo do react
}

interface ITransactionsContextData {
   transactions: ITransaction[],
   createTransaction: (transaction: ITransactionInput) => Promise<void>
}

export const TransactionsContext = createContext<ITransactionsContextData>({} as ITransactionsContextData);

export function TransactionsProvider({ children }: ITransactionsProviderProps) {
   const [transactions, setTransactions] = useState<ITransaction[]>([]);

   useEffect(() => {
      api.get('/transactions') // tipo de requisição
         .then(response => setTransactions(response.data.transactions))
   }, []);

   async function createTransaction(transactionInput: ITransactionInput) {
      const response = await api.post('/transactions', { ...transactionInput, createdAt: new Date() })
      const { transaction } = response.data // acessar a transaction de dentro do data

      setTransactions([...transactions, transaction])
   }

   return (
      <TransactionsContext.Provider value={{ transactions, createTransaction }}>
         {children}
      </TransactionsContext.Provider>
   )
}

export function useTransactions() {
   const context = useContext(TransactionsContext);

   return context;
}