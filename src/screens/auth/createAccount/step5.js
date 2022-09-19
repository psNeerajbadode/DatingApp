import { Image, ScrollView, StyleSheet, TouchableOpacity, View, PermissionsAndroid } from 'react-native';
import React, { useState } from 'react';
import Pagination from '../../../components/Pagination';
import HeaderImage_1 from '../../../components/HeaderImage_1';
import TextFormatted from '../../../components/TextFormatted';
import { theme } from '../../../utils/Constants';
import Button from '../../../components/Button';
import { check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import ButtonView from '../../../components/buttonView';
import { useDispatch, useSelector } from 'react-redux';
import { BluelightImage, GreenlightImage, PurplelightImage, RedlightImage, YellowlightImage } from '../../../utils/CustomImages';

const Step5 = ({ navigation }) => {
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  const ThemeMode = useSelector(state => state.Theme);

  async function requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
        title: 'Allow “...” to olso access your location even when you are not using the app?',
        message: 'Location will be used always.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      });
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
        setToggle(true);
      } else {
        console.log('Camera permission denied');
        setToggle(false);
      }
    } catch (err) {
      console.warn(err);
    }
  }
  return (
    <View style={{ flex: 1, backgroundColor: ThemeMode.selectedTheme ? theme.colors.primary : theme.colors.primaryBlack }}>
      <HeaderImage_1 height={170} marginBottom={15}>
        <Pagination title={'Create account'} subTitle={'Location'} position={5} />
      </HeaderImage_1>
      <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Image source={require('../../../assets/icons/maps.png')} style={{ height: 144, width: 144, resizeMode: 'contain', alignSelf: 'center' }} />
          <TextFormatted
            style={{
              fontSize: 14,
              color: ThemeMode.selectedTheme ? theme.colors.primaryBlack : theme.colors.primary,
              fontWeight: '300',
              marginHorizontal: 45,
              textAlign: 'center',
              marginTop: 20,
            }}
          >
            Please allow location in order to proceed
          </TextFormatted>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20, marginTop: 50, marginRight: 20, marginBottom: 20 }}>
            <TextFormatted
              style={{ fontSize: 14, fontWeight: '600', color: ThemeMode.selectedTheme ? theme.colors.primaryBlack : theme.colors.primary, flex: 1 }}
            >
              Allow location
            </TextFormatted>
            <View style={{ width: 20 }} />
            <TouchableOpacity style={{ alignItems: 'center', alignSelf: 'center', padding: 2 }} onPress={() => requestLocationPermission()}>
              <Image
                resizeMode="contain"
                style={{ width: 58, height: 33 }}
                source={
                  ThemeMode.themecolr == 'Red'
                    ? toggle
                      ? RedlightImage.On_switchs
                      : RedlightImage.Off_switchs
                    : ThemeMode.themecolr == 'Blue'
                    ? toggle
                      ? BluelightImage.On_switchs_blue
                      : BluelightImage.Off_switchs_blue
                    : ThemeMode.themecolr == 'Green'
                    ? toggle
                      ? GreenlightImage.On_switchs_green
                      : GreenlightImage.Off_switchs_green
                    : ThemeMode.themecolr == 'Purple'
                    ? toggle
                      ? PurplelightImage.On_switchs_purplle
                      : PurplelightImage.Off_switchs_purplle
                    : toggle
                    ? YellowlightImage.On_switchs_yellow
                    : YellowlightImage.Off_switchs_yellow
                }
              />
            </TouchableOpacity>
          </View>
        </View>
        <ButtonView>
          <Button marginTop={1} color={theme.colors.background} buttonName={'Next'} onPress={() => navigation.navigate('step6')} />
        </ButtonView>
      </ScrollView>
    </View>
  );
};

export default Step5;

const styles = StyleSheet.create({});
