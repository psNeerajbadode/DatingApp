import { ScrollView, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { theme } from '../../utils/Constants';
import HeaderImage from '../../components/HeaderImage';
import Header from '../../components/Header';
import Logo from '../../components/Logo';
import TextFormatted from '../../components/TextFormatted';
import TextInputFormat from '../../components/TextInputFormat';
import Button from '../../components/Button';
import { useSelector } from 'react-redux';

const validateEmail = email => {
  return String(email)
    .toLowerCase()
    .match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/);
};

const PasswordRecovery = ({ navigation }) => {
  const [email, setEmail] = useState();
  const ThemeMode = useSelector(state => state.Theme);
  const isPasscode = useSelector(state => state.isPasscode.isPasscode);
  return (
    <View style={{ flex: 1, backgroundColor: ThemeMode.selectedTheme ? theme.colors.primary : theme.colors.primaryBlack }}>
      <HeaderImage>
        <Header
          onPress={() => (isPasscode ? navigation.navigate('PassCode') : navigation.goBack())}
          title={isPasscode ? 'Passcode Recovery' : 'Password Recovery'}
        />
        <View style={{ height: 20 }} />
        <Logo />
      </HeaderImage>
      <ScrollView>
        <TextFormatted
          style={{
            fontSize: 14,
            fontWeight: '300',
            color: ThemeMode.selectedTheme ? theme.colors.primaryBlack : theme.colors.primary,
            textAlign: 'center',
            marginTop: 40,
          }}
        >
          Forgot {isPasscode ? 'Passcode?' : 'Password?'}
        </TextFormatted>
        <TextInputFormat
          label={'Email '}
          labelColor={
            email == '' || (email != null && !validateEmail(email))
              ? '#EA4A5A'
              : ThemeMode.selectedTheme
              ? theme.colors.primaryBlack
              : theme.colors.primary
          }
          placeholder={'Insert your email'}
          value={email}
          borderWidth={email == '' || (email != null && !validateEmail(email)) ? 1 : 0}
          onChangeText={setEmail}
          containerStyle={{ marginTop: 30 }}
          keyboardType="email-address"
          mess={'Not a valid email address'}
          showMess={email == '' || (email != null && !validateEmail(email)) ? true : false}
        />
        <Button
          opacity={validateEmail(email) ? 1 : 0.5}
          onPress={() => {
            navigation.navigate('EmailOtp');
          }}
          buttonName={'Recover'}
          color={'#fff'}
          disabled={validateEmail(email) ? false : true}
          marginTop={50}
        />
      </ScrollView>
    </View>
  );
};

export default PasswordRecovery;

const styles = StyleSheet.create({});
