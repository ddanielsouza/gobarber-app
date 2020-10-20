import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker, {
  AndroidEvent,
} from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  UserAvatar,
  ProviderContainer,
  ProvidersList,
  ProviderName,
  ProviderAvatar,
  ProvidersListContainer,
  Calendar,
  Title,
  OpenDatePickerButton,
  OpenDatePickerButtonText,
} from './styles';

interface RouteParams {
  providerId: string;
}

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const CreateAppointment: React.FC = () => {
  const route = useRoute();
  const { user } = useAuth();
  const { goBack } = useNavigation();

  const { providerId } = route.params as RouteParams;
  const [selectedProvider, setSelectedProvider] = useState(providerId);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    api.get('providers').then(response => {
      setProviders(response.data);
    });
  }, [setProviders]);

  const navigateBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const handleToggleOpenDatePicker = useCallback(() => {
    setShowDatePicker(state => !state);
  }, [setShowDatePicker]);

  const handleSelectProvider = useCallback(
    (providerIdSelected: string) => {
      setSelectedProvider(providerIdSelected);
    },
    [setSelectedProvider],
  );

  const handleDateChange = useCallback(
    (event: AndroidEvent, date: Date | undefined) => {
      if (Platform.OS === 'android') {
        setShowDatePicker(false);
      }

      if (date) {
        setSelectedDate(date);
      }
    },
    [setShowDatePicker, setSelectedDate],
  );

  return (
    <Container>
      <Header>
        <BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>

        <HeaderTitle>Cabeleireiros</HeaderTitle>

        <UserAvatar source={{ uri: user.avatar_url }} />
      </Header>
      <ProvidersListContainer>
        <ProvidersList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={providers}
          keyExtractor={provider => provider.id}
          renderItem={({ item: provider }) => (
            <ProviderContainer
              selected={provider.id === selectedProvider}
              onPress={() => handleSelectProvider(provider.id)}
            >
              <ProviderAvatar source={{ uri: provider.avatar_url }} />
              <ProviderName selected={provider.id === selectedProvider}>
                {provider.name}
              </ProviderName>
            </ProviderContainer>
          )}
        />
      </ProvidersListContainer>

      <Calendar>
        <Title> Escolha uma data </Title>

        <OpenDatePickerButton onPress={handleToggleOpenDatePicker}>
          <OpenDatePickerButtonText>
            Selecionar outra data
          </OpenDatePickerButtonText>
        </OpenDatePickerButton>

        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            onChange={handleDateChange}
            mode="date"
            display="calendar"
          />
        )}
      </Calendar>
    </Container>
  );
};
export default CreateAppointment;
