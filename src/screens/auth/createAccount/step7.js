import { Image, ScrollView, StyleSheet, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import HeaderImage_1 from '../../../components/HeaderImage_1';
import Pagination from '../../../components/Pagination';
import TextFormatted from '../../../components/TextFormatted';
import { theme } from '../../../utils/Constants';
import Button from '../../../components/Button';
import RBSheet from 'react-native-raw-bottom-sheet';
import Icon from 'react-native-vector-icons/Feather';
import ButtonView from '../../../components/buttonView';
import { useDispatch, useSelector } from 'react-redux';
import Statusbar from '../../../components/Statusbar';
import { BluelightImage, GreenlightImage, PurplelightImage, RedlightImage, YellowlightImage } from '../../../utils/CustomImages';

const Step7 = ({ navigation }) => {
  const [fingerPrint, setFingerPrint] = useState(false);

  const [pass, setPass] = useState(false);
  const refRBSheet = useRef();
  const refRBSheet1 = useRef();
  const dispatch = useDispatch();
  const ThemeMode = useSelector(state => state.Theme);
  console.log('theme=>', ThemeMode.themecolr);

  return (
    <View style={{ flex: 1, backgroundColor: ThemeMode.selectedTheme ? theme.colors.primary : theme.colors.primaryBlack }}>
      <HeaderImage_1 height={170} marginBottom={1}>
        <Pagination title={'Create account'} subTitle={'Safety'} position={7} />
      </HeaderImage_1>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flex: 5, justifyContent: 'center', marginVertical: 10 }}>
          <Image
            source={require('../../../assets/icons/clock.png')}
            style={{ height: 144, width: 144, resizeMode: 'contain', alignSelf: 'center' }}
          />
          <TextFormatted
            style={{
              fontSize: 14,
              fontWeight: '300',
              color: ThemeMode.selectedTheme ? theme.colors.primaryBlack : theme.colors.primary,
              marginHorizontal: 45,
              textAlign: 'center',
              marginTop: 20,
            }}
          >
            Enable the fingerprint for quick access to the app without entering the password
          </TextFormatted>
        </View>
        <View style={{ flex: 1 }}>
          <Switchbox name={'Enable fingerprint'} onPress={() => refRBSheet.current.open()} toggle={fingerPrint} />
          <Switchbox
            marginTop={0.5}
            name={'Enable passcode'}
            onPress={() => {
              pass ? setPass(false) : refRBSheet1.current.open();
            }}
            toggle={pass}
          />
          <BottomFingerPrint refRBSheet={refRBSheet} />
          <BottomPasscode refRBSheet={refRBSheet1} setPass={setPass} />
        </View>
      </ScrollView>
      <ButtonView style={{ backgroundColor: ThemeMode.selectedTheme ? theme.colors.primary : theme.colors.primaryBlack }}>
        <Button
          // buttonColor={theme.colors.primaryOn}
          buttonName={'Complete'}
          color={'#fff'}
          marginBottom={15}
          marginTop={15}
          onPress={() => navigation.navigate('step8')}
        />
      </ButtonView>
    </View>
  );
};

const Switchbox = ({ toggle, name, onPress, marginTop }) => {
  const ThemeMode = useSelector(state => state.Theme);
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 20, marginTop: marginTop || 50, marginRight: 20, marginBottom: 20 }}>
      <TextFormatted
        style={{ fontSize: 14, fontWeight: '600', color: ThemeMode.selectedTheme ? theme.colors.primaryBlack : theme.colors.primary, flex: 1 }}
      >
        {name}
      </TextFormatted>
      <View style={{ width: 20 }} />
      <TouchableOpacity
        style={{
          alignItems: 'center',
          alignSelf: 'center',
          padding: 2,
        }}
        onPress={onPress}
      >
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
              : ThemeMode.themecolr == 'Yellow'
              ? toggle
                ? YellowlightImage.On_switchs_yellow
                : YellowlightImage.Off_switchs_yellow
              : toggle
              ? RedlightImage.On_switchs
              : RedlightImage.Off_switchs
          }
        />
      </TouchableOpacity>
    </View>
  );
};

const BottomFingerPrint = ({ refRBSheet }) => {
  const dimension = useWindowDimensions();
  const ThemeMode = useSelector(state => state.Theme);
  return (
    <RBSheet
      ref={refRBSheet}
      height={dimension.height - 100}
      closeOnDragDown={true}
      dragFromTopOnly
      closeOnPressBack={true}
      customStyles={{
        draggableIcon: { backgroundColor: '#8490AE' },
        container: {
          borderTopRightRadius: 40,
          borderTopLeftRadius: 40,
          backgroundColor: ThemeMode.selectedTheme ? theme.colors.primary : theme.colors.primaryBlack,
        },
      }}
    >
      <Statusbar backgroundColor={'transparent'} hidden={false} barStyle={'light-content'} />
      <TextFormatted
        style={{
          fontSize: 16,
          fontWeight: '600',
          color: ThemeMode.selectedTheme ? theme.colors.primaryBlack : theme.colors.primary,
          textAlign: 'center',
          marginTop: 40,
        }}
      >
        Place your finger
      </TextFormatted>
      <TextFormatted
        style={{
          fontSize: 14,
          fontWeight: '300',
          color: ThemeMode.selectedTheme ? theme.colors.primaryBlack : theme.colors.primary,
          textAlign: 'center',
          marginTop: 15,
          marginHorizontal: 34,
        }}
      >
        Press firmly on the fingerprint icon below. When you feel a vibration, lift your finger then press again
      </TextFormatted>
      <Image
        source={require('../../../assets/icons/finger.png')}
        style={{ height: 213, width: 213, resizeMode: 'contain', alignSelf: 'center', marginTop: 35 }}
      />
      <Image
        source={ThemeMode.selectedTheme ? require('../../../assets/icons/Frame.png') : require('../../../assets/icons/Frame_dark.png')}
        style={{ height: 144, width: 107, resizeMode: 'contain', alignSelf: 'center', marginTop: 30 }}
      />
    </RBSheet>
  );
};

const BottomPasscode = ({ refRBSheet, setPass }) => {
  const dimension = useWindowDimensions();
  const ThemeMode = useSelector(state => state.Theme);
  const [passcode, setPasscode] = useState([]);
  const p_length = passcode.length;
  const [_, refresh] = useState({});

  const remove_arr = () => {
    const removed = [...passcode];
    console.log(removed);
    removed.pop();
    console.log(removed);
    setPasscode(removed);
    refresh({});
  };

  return (
    <RBSheet
      ref={refRBSheet}
      height={dimension.height - 100}
      closeOnDragDown={true}
      closeOnPressBack={true}
      dragFromTopOnly
      customStyles={{
        draggableIcon: { backgroundColor: '#8490AE' },
        container: {
          borderTopRightRadius: 40,
          borderTopLeftRadius: 40,
          backgroundColor: ThemeMode.selectedTheme ? theme.colors.primary : theme.colors.primaryBlack,
        },
      }}
    >
      <Statusbar backgroundColor={'transparent'} hidden={false} barStyle={'light-content'} />
      <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, marginTop: 30 }}>
        <Icon
          onPress={() => refRBSheet.current.close()}
          name="arrow-left"
          size={19}
          color={ThemeMode.selectedTheme ? theme.colors.primaryBlack : theme.colors.primary}
          style={{
            backgroundColor: ThemeMode.selectedTheme ? theme.colors.primary : theme.colors.primaryBlack,
            height: 40,
            width: 40,
            textAlign: 'center',
            textAlignVertical: 'center',
            borderRadius: 12,
          }}
        />
        <TextFormatted
          style={{
            fontSize: 16,
            fontWeight: '600',
            color: ThemeMode.selectedTheme ? theme.colors.primaryBlack : theme.colors.primary,
            textAlign: 'center',
            flex: 1,
            marginRight: 40,
          }}
        >
          Add passcode
        </TextFormatted>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View
          style={{
            backgroundColor: ThemeMode.selectedTheme ? theme.colors.primary : theme.colors.primaryBlack,
            borderRadius: 20,
            height: 60,
            marginHorizontal: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            marginTop: 50,
          }}
        >
          {/* {Array(4)
            .fill('')
            .map((it, i) => ( */}
          <TextFormatted
            style={{
              height: 29,
              width: 290,
              backgroundColor: ThemeMode.selectedTheme ? theme.colors.primary : theme.colors.searchbar,
              marginHorizontal: 12.5,
              borderRadius: 30,
              fontSize: 22,
              fontWeight: '600',
              color: ThemeMode.selectedTheme ? theme.colors.primaryBlack : theme.colors.primary,
              textAlign: 'center',
              textAlignVertical: 'center',
              // backgroundColor: '#000',
            }}
          >
            {passcode.join('      ')}
          </TextFormatted>
          {/* ))} */}
        </View>
        <View style={{ flexDirection: 'row', width: 300, flexWrap: 'wrap', alignSelf: 'center', marginTop: 40 }}>
          {Array(11)
            .fill('')
            .map((v, i) => (
              <TouchableOpacity
                onPress={() => {
                  // pass.push(i == 9 ? null : i == 10 ? 0 : i + 1);
                  if (i == 9) remove_arr();
                  else setPasscode(prevState => [...prevState, i == 10 ? 0 : i + 1]);
                }}
                //disabled={i == 9}
                disabled={p_length == 4 && i != 9 ? true : false}
                style={{ width: 50, marginHorizontal: 25, marginVertical: 5 }}
              >
                <TextFormatted
                  style={{
                    textAlign: 'center',
                    color: ThemeMode.selectedTheme ? theme.colors.primaryBlack : theme.colors.primary,
                    fontSize: 26,
                    fontWeight: '400',
                    padding: 8,
                  }}
                >
                  {i == 9 ? (
                    <Icon
                      name="arrow-left"
                      size={30}
                      color={ThemeMode.selectedTheme ? theme.colors.primaryBlack : theme.colors.primary}
                      // style={{ position: 'absolute', left: '20%', bottom: '5%' }}
                    />
                  ) : i == 10 ? (
                    0
                  ) : (
                    i + 1
                  )}
                </TextFormatted>
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>
      <ButtonView height={100}>
        <TextFormatted
          style={{ fontSize: 18, fontWeight: '700', color: '#8490AE', width: dimension.width / 2 - 20, textAlign: 'center' }}
          onPress={() => {
            refRBSheet.current.close();
            setPasscode([]);
          }}
        >
          Cancel
        </TextFormatted>
        <Button
          opacity={passcode.length >= 4 ? 1 : 0.5}
          buttonName={'Save'}
          color={theme.colors.primary}
          marginTop={1}
          disabled={passcode.length >= 4 ? false : true}
          marginBottom={1}
          width={dimension.width / 2 - 20}
          onPress={() => {
            setPass(true);
            refRBSheet.current.close();
            setPasscode([]);
          }}
        />
      </ButtonView>
    </RBSheet>
  );
};
export default Step7;

const styles = StyleSheet.create({});
