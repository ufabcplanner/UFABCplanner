import { useCallback, useRef, useState } from 'react';
import { Form } from '@unform/web'

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { InitialPageLayout } from '../../components/InitialPageLayout';

const LoginPage = () => {
  const formRef = useRef(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async (data: any) => {
    setLoading(true);

    setTimeout(() => { setLoading(false); alert(`mandando para a api: ${JSON.stringify(data)}`)}, 2000);

    // TODO timeout na verdade vai ser a chamada assincrona usando axios
  }, []);

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <InitialPageLayout
        title="Bem-vindo"
        subtitle="Esse é o MVP do UFABCplanner, aproveite!"
        subtext={{ question: 'Não tem conta?', linkLabel: 'Faça o cadastro', linkTo: '/signin' }}
      >
        <Input name="email" label="E-mail*" placeholder="Digite seu e-mail" />

        <Input name="password" label="Senha*" placeholder="Digite sua senha" />

        <Button type="submit" loading={loading}>Entrar</Button>
      </InitialPageLayout>
    </Form>
  );
}

export default LoginPage;
