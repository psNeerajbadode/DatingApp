import { FlatList, Text, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { theme } from '../../utils/Constants';
import HeaderImage_1 from '../../components/HeaderImage_1';
import TextFormatted from '../../components/TextFormatted';
import Button from '../../components/Button';
import SearchBar from '../../components/SearchBar';
import { useSelector } from 'react-redux';
import { BluelightImage, GreenlightImage, PurplelightImage, ReddarkImage, RedlightImage, YellowlightImage } from '../../utils/CustomImages';
const LanguageSelection = ({ navigation }) => {
  const [select, setSelect] = useState('English');
  const [search, setSearch] = useState('');
  const ThemeMode = useSelector(state => state.Theme);
  const languages = [
    { name: 'English', img: require('../../assets/icons/united_kingdom.png') },
    { name: '简体中文', img: require('../../assets/icons/china.png') },
  ];
  return (
    <View style={{ flex: 1, backgroundColor: ThemeMode.selectedTheme ? theme.colors.primary : theme.colors.primaryBlack }}>
      <View style={{}}>
        <HeaderImage_1>
          <TextFormatted style={{ fontSize: 16, fontWeight: '700', color: theme.colors.background, marginTop: 30, textAlign: 'center' }}>
            Select language
          </TextFormatted>
        </HeaderImage_1>
        <SearchBar value={search} onChangeText={setSearch} onPress={() => setSearch('')} placeholder={'Search language'} />
      </View>
      <View style={{ marginTop: 20, flex: 1 }}>
        <FlatList
          data={languages.filter(item => {
            return item.name.toLowerCase().includes(search.toLowerCase());
          })}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setSelect(item.name)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 20,
                paddingHorizontal: 20,
                marginVertical: 2,
                paddingVertical: 7,
              }}
            >
              <Image source={item.img} style={{ height: 32, width: 32, resizeMode: 'contain' }} />
              <TextFormatted
                style={{
                  fontSize: 16,
                  color:
                    select == item.name
                      ? ThemeMode.selectedTheme
                        ? theme.colors.primaryBlack
                        : theme.colors.primary
                      : ThemeMode.selectedTheme
                      ? theme.colors.darkGrey
                      : theme.colors.darkGrey,
                  fontWeight: '400',
                  flex: 1,
                  marginLeft: 10,
                }}
              >
                {item.name}
              </TextFormatted>
              <Image
                source={
                  select == item.name
                    ? ThemeMode.themecolr == 'Red'
                      ? RedlightImage.check_red
                      : ThemeMode.themecolr == 'Blue'
                      ? BluelightImage.check_blue
                      : ThemeMode.themecolr == 'Green'
                      ? GreenlightImage.check_green
                      : ThemeMode.themecolr == 'Purple'
                      ? PurplelightImage.check_purple
                      : ThemeMode.themecolr == 'Yellow'
                      ? YellowlightImage.check_yellow
                      : RedlightImage.check_red
                    : require('../../assets/icons/check.png')
                }
                style={{ height: 29, width: 29, resizeMode: 'contain' }}
              />
            </TouchableOpacity>
          )}
        />
      </View>

      <Button
        opacity={select ? 1 : 0.5}
        buttonName="Continue"
        disabled={select ? false : true}
        color={'#fff'}
        marginTop={20}
        marginBottom={30}
        onPress={() => navigation.navigate('Login')}
        // onPress={() => navigation.navigate('step1')}
      />
    </View>
  );
};
export default LanguageSelection;

const styles = StyleSheet.create({});
