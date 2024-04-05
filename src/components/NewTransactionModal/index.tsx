import { FormEvent, useState } from 'react';
import Modal from 'react-modal'

import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'

import { Container, TransactionTypeContainer, RadioBox } from './styles';
import { useTransactions } from '../../hooks/useTransactions';

interface INewTransitionModalProps {
   isOpen: boolean;
   onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: INewTransitionModalProps) {
   const { createTransaction } = useTransactions();

   const [title, setTitle] = useState('')
   const [amount, setAmount] = useState(0)
   const [category, setCategory] = useState('')
   const [type, setType] = useState('deposit')

   async function handleCreateTransaction(event: FormEvent) {
      // Para não recarregar o forms
      event.preventDefault()

      // esperar enviar o formulário para depois deletar as informações
      await createTransaction({
         title,
         amount,
         category,
         type
      })

      setTitle('')
      setAmount(0)
      setCategory('')
      setType('deposit')

      onRequestClose()
   }

   return (
      <Modal
         isOpen={isOpen}
         onRequestClose={onRequestClose}
         overlayClassName="react-modal-overlay"
         className="react-modal-content"
      >
         {/* Botao de fechar */}
         <button
            type='button'
            onClick={onRequestClose}
            className='react-modal-close'>
            <img src={closeImg} alt='Fechar modal' />
         </button>

         <Container onSubmit={handleCreateTransaction}>
            <h2>Cadastrar Transação</h2>

            <input placeholder='Título' value={title} onChange={event => setTitle(event.target.value)} />

            <input type="Number" placeholder='Valor' value={amount} onChange={event => setAmount(Number(event.target.value))} />

            <TransactionTypeContainer>
               <RadioBox
                  type='button'
                  onClick={() => { setType('deposit') }}
                  isActive={type === 'deposit'}
                  activeColor="green"
               >
                  <img src={incomeImg} alt="Entrada" />
                  <span>Entrada</span>
               </RadioBox>
               <RadioBox
                  type='button'
                  onClick={() => { setType('withdraw') }}
                  isActive={type === 'withdraw'}
                  activeColor="red"
               >
                  <img src={outcomeImg} alt="Saída" />
                  <span>Saída</span>
               </RadioBox>
            </TransactionTypeContainer>

            <input placeholder='Categoria' value={category} onChange={event => setCategory((event.target.value))} />

            <button type="submit">Cadastrar</button>
         </Container>
      </Modal>
   )
}