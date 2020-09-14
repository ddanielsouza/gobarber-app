import React, { useCallback, useRef } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  View,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';
import { Container, Title, BackToSignIn, BackToSignInText } from './styles';
import logoImg from '../../assets/logo.png';
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';

const SignUp: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  interface SignUpFormDate {
    email: string;
    password: string;
    name: string;
  }

  const handleSignUp = useCallback(async (data: SignUpFormDate): Promise<
    void
  > => {
    const messageRequired = (fieldDescription: string) =>
      `${fieldDescription} é obrigatório(a)`;

    const messageInvalid = (fieldDescription: string) =>
      `${fieldDescription} está inválido(a), confira os dados preenchidos`;

    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required(messageRequired('Nome')),
        email: Yup.string()
          .required(messageRequired('E-mail'))
          .email(messageInvalid('E-mail')),
        password: Yup.string().min(
          6,
          'Preencha a senha com no mínimo 6 digitos',
        ),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      // await api.post('/users', data);

      // history.push('/');
    } catch (err) {
      const { ValidationError } = Yup;

      if (err instanceof ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
      } else {
        Alert.alert(
          'Erro ao cadastrar',
          'Verifique os dados preenchidos ou tente mais tarde',
        );
      }
    }
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        enabled
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Container>
            <Image source={logoImg} />
            <View>
              <Title> Crie sua conta </Title>
            </View>
            <Form onSubmit={handleSignUp} ref={formRef}>
              <Input
                autoCapitalize="words"
                name="name"
                icon="user"
                returnKeyType="next"
                placeholder="Nome"
                onSubmitEditing={() => emailInputRef.current?.focus()}
              />
              <Input
                ref={emailInputRef}
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />
              <Input
                ref={passwordInputRef}
                secureTextEntry
                name="password"
                icon="lock"
                placeholder="Senha"
                textContentType="newPassword"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />
            </Form>
            <Button onPress={() => formRef.current?.submitForm()}>
              Cadastrar
            </Button>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <BackToSignIn onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={20} color="#FFF" />
        <BackToSignInText> Voltar para o login</BackToSignInText>
      </BackToSignIn>
    </>
  );
};
export default SignUp;
