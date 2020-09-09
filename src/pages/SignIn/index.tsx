import React from 'react';
import {
 Image, KeyboardAvoidingView, Platform, View
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { ScrollView } from 'react-native-gesture-handler';
import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText,
} from './styles';
import logoImg from '../../assets/logo.png';
import Input from '../../components/Input';
import Button from '../../components/Button';

const SignIn: React.FC = () => (
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
            <Title> Faça seu logon </Title>
          </View>
          <Input name="email" icon="mail" placeholder="E-mail" />
          <Input name="password" icon="lock" placeholder="Senha" />

          <Button
            onPress={() => {
              console.log('OK');
            }}
          >
            Entrar
          </Button>

          <ForgotPassword onPress={() => console.log('OK')}>
            <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
          </ForgotPassword>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
    <CreateAccountButton onPress={() => console.log('OK')}>
      <Icon name="log-in" size={20} color="#FF9000" />
      <CreateAccountButtonText> Criar uma conta</CreateAccountButtonText>
    </CreateAccountButton>
  </>
);
export default SignIn;
