import { useState } from 'react'
import styled from 'styled-components'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import Input from './components/Input'
import Button from './components/Button'
import Balance from './components/Balance'

const Container = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  align-items: center;
`

const Section = styled.section`
  background-color: #eee;
  border-top: solid 2px palevioletred;
  padding: 20px 25px;
  width: 500px;
  box-shadow: 0px 2px 3px rgb(0,0,0,0.3);
`
const compoundInterest = (deposit, contribution, years, rate) => {
  let total = deposit
  for (let i = 0; i < years; i++) {
    total = (total + contribution) * (rate + 1)
  }

  return Math.round(total)
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

function App() {
  const [balance, setBalance] = useState('')
  const handleSubmit = ({ deposit, contribution, years, rate }) => {
    const val = compoundInterest(Number(deposit), Number(contribution), Number(years), Number(rate))
    setBalance(formatter.format(val))
  }
  return (
    <Container>
      <Section>
        <Formik
          initialValues={{
            deposit: '',
            contribution: '',
            years: '',
            rate: '',
          }}
          onSubmit={handleSubmit}
          validationSchema={Yup.object({
            deposit: Yup.number().required('Obligatorio').typeError('Debe ser un número'),
            contribution: Yup.number().required('Obligatorio').typeError('Debe ser un número'),
            years: Yup.number().required('Obligatorio').typeError('Debe ser un número'),
            rate: Yup.number().required('Obligatorio').typeError('Debe ser un número'),
          })}
        >
          <Form>
            <Input name="deposit" label="Depósito inicial" />
            <Input name="contribution" label="Contribución anual" />
            <Input name="years" label="Años" />
            <Input name="rate" label="Interés estimado"/>
            <Button>Calcular</Button>
          </Form>
        </Formik>
        
        {balance != '' ? <Balance>Balance final: {balance}</Balance> : null}
      </Section>
    </Container>
  );
}

export default App;
