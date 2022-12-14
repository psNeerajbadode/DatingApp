import { Image, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import React, { useRef } from 'react';
import HeaderImage_1 from '../../components/HeaderImage_1';
import { theme } from '../../utils/Constants';
import Header from '../../components/Header';
import Icon from 'react-native-vector-icons/Entypo';
import TextFormatted from '../../components/TextFormatted';
import RBSheet from 'react-native-raw-bottom-sheet';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const AboutUs = () => {
  const ThemeMode = useSelector(state => state.Theme);
  const navigation = useNavigation();
  const refRBSheet = useRef();
  return (
    <View style={{ flex: 1, backgroundColor: ThemeMode.selectedTheme ? theme.colors.primary : theme.colors.primaryBlack }}>
      <HeaderImage_1 height={155}>
        <Header marginTop={20} title={'About Us'} />
      </HeaderImage_1>
      <ScrollView>
        <ButtonRow title={'Rate us on Google Play'} />
        <ButtonRow title={'Follow us on Social Media'} onPress={() => refRBSheet.current.open()} />
        <ButtonRow title={'Privacy Policy'} />
        <ButtonRow onPress={() => navigation.navigate('TermCondition')} title={'Terms & Conditions'} />
        <ButtonRow title={'Licenses'} />
        <ButtonRow title={'Privacy Preferences'} />
        <ButtonRow title={'Contact Us'} />
        <ButtonRow title={'Share ...'} />
        <ButtonRow title={'Community guidelines'} />
      </ScrollView>
      <FollowUs refRBSheet={refRBSheet} />
    </View>
  );
};

const ButtonRow = ({ title, onPress }) => {
  const ThemeMode = useSelector(state => state.Theme);
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 30, paddingVertical: 5, marginVertical: 5 }}
    >
      <TextFormatted
        style={{ fontSize: 14, fontWeight: '600', color: ThemeMode.selectedTheme ? theme.colors.primaryBlack : theme.colors.primary, flex: 1 }}
      >
        {title}
      </TextFormatted>
      <Icon name="chevron-small-right" size={20} color={ThemeMode.selectedTheme ? theme.colors.primaryBlack : theme.colors.primary} />
    </TouchableOpacity>
  );
};

const FollowUs = ({ refRBSheet }) => {
  const dimension = useWindowDimensions();
  const ThemeMode = useSelector(state => state.Theme);
  return (
    <RBSheet
      ref={refRBSheet}
      height={450}
      closeOnDragDown={true}
      closeOnPressBack={true}
      customStyles={{
        draggableIcon: { backgroundColor: '#8490AE' },
        container: {
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          overflow: 'visible',
          backgroundColor: ThemeMode.selectedTheme ? theme.colors.primary : theme.colors.primaryBlack,
        },
      }}
    >
      <StatusBar backgroundColor={'#00000077'} translucent />
      <Fontisto
        name="close-a"
        size={14}
        color="#000"
        style={{ alignSelf: 'flex-end', marginRight: 20, marginTop: 5, paddingHorizontal: 10 }}
        onPress={() => refRBSheet.current.close()}
      />
      <TextFormatted
        style={{
          fontSize: 18,
          fontWeight: '600',
          color: ThemeMode.selectedTheme ? theme.colors.primaryBlack : theme.colors.primary,
          marginHorizontal: 25,
          marginTop: 0,
          marginBottom: 10,
        }}
      >
        Follow us on Social Media
      </TextFormatted>
      <TouchableOpacity style={{ alignSelf: 'center', marginTop: 20 }}>
        <ImageBackground
          source={require('../../assets/images/FB_Bg.png')}
          resizeMode="cover"
          imageStyle={{ borderRadius: 20 }}
          style={{ height: 85, width: dimension.width - 40, alignItems: 'center', flexDirection: 'row', paddingHorizontal: 20 }}
        >
          <Image source={require('../../assets/icons/facebook_1.png')} style={{ height: 50, width: 50, resizeMode: 'contain' }} />
          <View style={{ marginLeft: 15 }}>
            <TextFormatted style={{ fontSize: 14, fontWeight: '400', color: theme.colors.primary }}>Follow us on</TextFormatted>
            <TextFormatted style={{ fontSize: 30, fontWeight: '600', color: theme.colors.primary }}>Facebook</TextFormatted>
          </View>
        </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity style={{ alignSelf: 'center', marginTop: 20 }}>
        <ImageBackground
          source={require('../../assets/images/insta_Bg.png')}
          resizeMode="cover"
          imageStyle={{ borderRadius: 20 }}
          style={{ height: 85, width: dimension.width - 40, alignItems: 'center', flexDirection: 'row', paddingHorizontal: 20 }}
        >
          <Image source={require('../../assets/icons/instagram.png')} style={{ height: 50, width: 50, resizeMode: 'contain' }} />
          <View style={{ marginLeft: 15 }}>
            <TextFormatted style={{ fontSize: 14, fontWeight: '400', color: theme.colors.primary }}>Follow us on</TextFormatted>
            <TextFormatted style={{ fontSize: 30, fontWeight: '600', color: theme.colors.primary }}>Instagram</TextFormatted>
          </View>
        </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity style={{ alignSelf: 'center', marginTop: 20 }}>
        <ImageBackground
          source={require('../../assets/images/twitter_Bg.png')}
          resizeMode="cover"
          imageStyle={{ borderRadius: 20 }}
          style={{ height: 85, width: dimension.width - 40, alignItems: 'center', flexDirection: 'row', paddingHorizontal: 20 }}
        >
          <Image source={require('../../assets/icons/twitter.png')} style={{ height: 50, width: 50, resizeMode: 'contain' }} />
          <View style={{ marginLeft: 15 }}>
            <TextFormatted style={{ fontSize: 14, fontWeight: '400', color: theme.colors.primary }}>Follow us on</TextFormatted>
            <TextFormatted style={{ fontSize: 30, fontWeight: '600', color: theme.colors.primary }}>Twitter</TextFormatted>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </RBSheet>
  );
};

export default AboutUs;

const styles = StyleSheet.create({});
