import { ScrollView, StyleSheet, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import React, { useState } from 'react';
import { theme } from '../../utils/Constants';
import HeaderImage from '../../components/HeaderImage';
import Header from '../../components/Header';
import Logo from '../../components/Logo';
import TextFormatted from '../../components/TextFormatted';
import Button from '../../components/Button';

const RecoveryPassCode = ({ navigation }) => {
  const dimension = useWindowDimensions();
  const [passcode, setPasscode] = useState([]);
  const pass = [];

  console.log(pass);
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.primary }}>
      <View style={{ paddingBottom: 18 }}>
        <HeaderImage height={330}>
          <Header title={'Passcode Recovery'} />
          <View style={{ height: 20 }} />
          <Logo />
        </HeaderImage>
        <View
          style={{
            backgroundColor: '#fff',
            height: 60,
            position: 'absolute',
            bottom: 0,
            width: dimension.width - 40,
            alignSelf: 'center',
            borderRadius: 20,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
            elevation: 2,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {Array(4)
            .fill('')
            .map((_, i) => (
              <View
                style={{
                  height: 24,
                  width: 24,
                  backgroundColor: '#FAFAFA',
                  borderRadius: 20,
                  margin: 12.5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <TextFormatted style={{ fontSize: 26, fontWeight: '600', color: theme.colors.primaryBlack }}>{passcode[i]}</TextFormatted>
              </View>
            ))}
        </View>
      </View>
      <ScrollView>
        <View style={{ flexDirection: 'row', width: 300, flexWrap: 'wrap', alignSelf: 'center', marginTop: 10 }}>
          {Array(11)
            .fill('')
            .map((_, i) => (
              <TouchableOpacity
                onPress={() => {
                  setPasscode(prevState => [...prevState, i == 10 ? 0 : i + 1]);
                }}
                disabled={i == 9}
                style={{ width: 50, marginHorizontal: 25, marginVertical: 2 }}
              >
                <TextFormatted style={{ textAlign: 'center', color: '#1A1D25', fontSize: 26, fontWeight: '400', padding: 8 }}>
                  {i == 9 ? '  ' : i == 10 ? 0 : i + 1}
                </TextFormatted>
              </TouchableOpacity>
            ))}
        </View>
        <Button
          buttonColor={passcode.length > 3 ? theme.colors.primaryOn : theme.colors.primaryOff}
          buttonName={'Save passcode'}
          color={passcode.length > 3 ? '#fff' : '#A3ABBE'}
          onPress={() => {
            navigation.replace('SuccessPassword');
          }}
          disabled={passcode.length > 3 ? false : true}
          marginTop={10}
        />
        <TextFormatted style={{ fontSize: 14, fontWeight: '400', color: theme.colors.primaryBlack, alignSelf: 'center', marginTop: 20, padding: 5 }}>
          Cancel
        </TextFormatted>
      </ScrollView>
    </View>
  );
};

export default RecoveryPassCode;

const styles = StyleSheet.create({});
