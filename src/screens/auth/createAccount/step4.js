import { Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import React, { useState } from 'react';
import HeaderImage_1 from '../../../components/HeaderImage_1';
import Pagination from '../../../components/Pagination';
import SearchBar from '../../../components/SearchBar';
import ButtonView from '../../../components/buttonView';
import Button from '../../../components/Button';
import { theme } from '../../../utils/Constants';
import TextFormatted from '../../../components/TextFormatted';
import Icon from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as ImagePicker from 'react-native-image-picker';
import { createThumbnail } from 'react-native-create-thumbnail';
import { useDispatch, useSelector } from 'react-redux';

const Step4 = ({ navigation }) => {
  const dimension = useWindowDimensions();
  const [media, setMedia] = useState([]);
  const [vid, setVid] = useState(false);
  const dispatch = useDispatch();
  const ThemeMode = useSelector(state => state.Theme);

  const selectImage = async () => {
    await ImagePicker.launchImageLibrary(
      {
        mediaType: 'mixed',
        videoQuality: 'high',
        selectionLimit: 5,
        quality: 1,
      },
      response => {
        if (!response.didCancel) {
          console.log('media', media.concat(...response.assets));
          if (
            media.concat(...response.assets).filter(v => v.type.includes('video')).length < 2 &&
            media.concat(...response.assets).filter(v => !v.type.includes('video')).length < 6
          ) {
            setMedia(media.concat(...response.assets));
            // generateThumbnail(
            //   media
            //     .concat(...response.assets)
            //     .filter(v => v.type.includes('video'))
            //     .map(v => v.uri),
            // );
            // setVid(media.concat(...response.assets).filter(v => v.type.includes('video')) ? true : false);
          } else {
            alert('Select a minimum of 2 media to proceed and a maximum of 5 pictures and 1 video');
          }
        }
      },
    );
  };
  const selectCamera = async () => {
    await ImagePicker.launchImageLibrary(
      {
        mediaType: 'mixed',
        maxHeight: 200,
        maxWidth: 200,
        videoQuality: 'high',
        selectionLimit: 5,
        //  quality: 1,
      },
      response => {
        console.log(response.assets);
        if (!response.didCancel) {
          console.log('media', media.concat(...response.assets));
          if (
            media.concat(...response.assets).filter(v => v.type.includes('video')).length < 2 &&
            media.concat(...response.assets).filter(v => !v.type.includes('video')).length < 6
          ) {
            setMedia(media.concat(...response.assets));
          } else {
            alert('Select a minimum of 2 media to proceed and a maximum of 5 pictures and 1 video');
          }
        }
      },
    );
  };
  // async function generateThumbnail(uri) {
  //   if (!uri) {
  //     return;
  //   }
  //   try {
  //     const response = await createThumbnail({
  //       url: uri,
  //     });
  //     setThumb(response.path);
  //   } catch (err) {
  //     console.error(err);
  //   } finally {
  //   }
  // }
  return (
    <View style={{ flex: 1, backgroundColor: ThemeMode.selectedTheme ? theme.colors.primary : theme.colors.primaryBlack }}>
      <HeaderImage_1 height={170} marginBottom={1}>
        <Pagination title={'Create account'} subTitle={'Add media'} position={4} />
      </HeaderImage_1>

      <ScrollView>
        <View style={{ flexDirection: 'row', marginHorizontal: 20, alignItems: 'center', marginTop: 10 }}>
          <Icon name="alert-circle" size={30} color={'#8490AE'} style={{ transform: [{ rotate: '180deg' }] }} />
          <TextFormatted style={{ fontSize: 14, fontWeight: '600', color: '#8490AE', flex: 1, marginLeft: 10, marginTop: 10 }}>
            Select a minimum of 2 media to proceed and a maximum of 5 pictures and 1 video
          </TextFormatted>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <View style={{ width: '50%', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => selectImage()}
              style={{
                width: (dimension.width - 60) / 2,
                height: 158,
                backgroundColor: ThemeMode.selectedTheme ? theme.colors.primary : theme.colors.primaryBlack,
                borderRadius: 40,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 10,
              }}
            >
              <AntDesign
                name="pluscircle"
                color={
                  ThemeMode.themecolr == 'Red'
                    ? theme.colors.red
                    : ThemeMode.themecolr == 'Blue'
                    ? theme.colors.Blue
                    : ThemeMode.themecolr == 'Green'
                    ? theme.colors.Green
                    : ThemeMode.themecolr == 'Purple'
                    ? theme.colors.Purple
                    : theme.colors.Yellow
                }
                size={25}
                style={{ position: 'absolute', zIndex: 1, top: '15%', right: '22%' }}
              />
              <Image source={require('../../../assets/icons/add_media.png')} style={{ width: '50%', height: '50%', resizeMode: 'contain' }} />

              <TextFormatted
                style={{
                  fontSize: 12,
                  color: ThemeMode.selectedTheme ? theme.colors.primaryBlack : theme.colors.primary,
                  fontWeight: '600',
                  marginTop: 10,
                }}
              >
                Add media
              </TextFormatted>
            </TouchableOpacity>
            {setVid ? (
              <View>
                {media?.map(
                  (it, i) =>
                    i == 1 && (
                      <Image
                        source={{ uri: it.uri }}
                        style={{ width: (dimension.width - 60) / 2, height: 261, resizeMode: 'cover', borderRadius: 20, marginTop: 10 }}
                      />
                    ),
                )}
              </View>
            ) : (
              <ImageBackground
                source={{ uri: thumb }}
                style={{ width: (dimension.width - 50) / 2, height: 253, justifyContent: 'center', alignItems: 'center' }}
                resizeMode="cover"
                imageStyle={{ borderRadius: 20 }}
              >
                <Image
                  source={require('../../../assets/icons/play_video.png')}
                  style={{ height: 60, width: 60, resizeMode: 'contain', position: 'absolute' }}
                />
              </ImageBackground>
            )}
          </View>
          <View style={{ width: '50%', alignItems: 'center' }}>
            {media?.map((it, i) =>
              i == 0 || i == 2 ? (
                <Image
                  source={{ uri: it.uri }}
                  style={{
                    width: (dimension.width - 60) / 2,
                    height: i == 0 ? 281 : 130,
                    resizeMode: 'cover',
                    borderRadius: 20,
                    marginTop: 20,
                  }}
                />
              ) : (
                <View />
              ),
            )}
          </View>
        </View>
        {media?.map((it, i) =>
          i == 3 || i == 4 ? (
            <Image
              source={{ uri: it.uri }}
              style={{
                width: dimension.width - 40,
                height: 223,
                resizeMode: 'cover',
                borderRadius: 20,
                marginTop: 20,
                alignSelf: 'center',
              }}
            />
          ) : (
            <View />
          ),
        )}
      </ScrollView>
      <ButtonView>
        <Button
          opacity={media?.length >= 2 && media?.length <= 6 ? 1 : 0.5}
          buttonName={'Next'}
          marginTop={1}
          disabled={media?.length >= 2 && media?.length <= 6 ? false : true}
          color={'#fff'}
          onPress={() => navigation.navigate('step5')}
        />
      </ButtonView>
    </View>
  );
};

export default Step4;

const styles = StyleSheet.create({});
