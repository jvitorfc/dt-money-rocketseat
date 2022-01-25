import { FormEvent, useState, useContext } from 'react'
import Modal from 'react-modal'
import closeImg  from '../../assets/close.svg'
import incomeImg  from '../../assets/income.svg'
import outcomeImg  from '../../assets/outcome.svg'
import { TransactionsContext } from '../../TransactionsContext'

import { Container, TransactionTypeContainer, RadioBox } from './styles'

interface NewTransactionModalProps{
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({isOpen, onRequestClose}: NewTransactionModalProps) {

  const { createTransaction } = useContext(TransactionsContext)

  const [type, setType] =useState('deposit')
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [amount, setAmount] = useState(0)

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

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

  return(
    <Modal 
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName='react-modal-overlay'
      className='react-modal-content'
      >

        <button 
          className='react-modal-close' 
          type='button' 
          onClick={onRequestClose}
        >
          <img src={closeImg} alt="close modal" />
        </button>

        <Container onSubmit={handleCreateNewTransaction}>
          <h2>Cadastrar transação</h2>

          <input 
            placeholder="Título"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />

          <input 
            type="number"
            placeholder="Valor"
            value={amount}
            onChange={event => setAmount(Number(event.target.value))}
          /> 

          <TransactionTypeContainer>
            <RadioBox
            type='button'
            isActive={type === 'deposit'}
            activeColor='green'
            onClick={()=> setType('deposit')}
            >
              <img src={incomeImg} alt="Entradas" />
              <span>
                Entrada
              </span>
            </RadioBox>

            <RadioBox
              type='button'
              isActive={type === 'withdraw'}
              activeColor='red'
              onClick={()=> setType('withdraw')}
            >
              <img src={outcomeImg} alt="Entradas" />
              <span>
               Saída
              </span>
            </RadioBox>
          </TransactionTypeContainer>   

       
           
       

          <input 
            placeholder="Categoria"
            value={category}
            onChange={event => setCategory(event.target.value)}
          />

          <button type="submit">Cadastrar</button>
        </Container>
       
      </Modal>
  )
}