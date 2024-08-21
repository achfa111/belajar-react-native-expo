import { Image, StyleSheet, View, Text, Button } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import Constant from 'expo-constants';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A43333', dark: '#A43333' }}
      headerImage={
        <View style={styles.container}>
          <View>
            <Text styles={styles.titleText1}>Hi, Nama</Text>
            <Text styles={styles.titleText2}>Your Location</Text>
          </View>
          <View>
            <Image
              styles={styles.imageProfile}
              source={require('@/assets/images/orang24.png')}
            />
          </View>
        </View>
      }
    >
      <View styles={styles.banner}>
        <View styles={styles.bannerContainer}>
          <View styles={styles.bannerTextContainer}>
            <Text styles={styles.bannerText}>Sewa Mobil Berkualitas di kawasanmu</Text>
            <Button
              color='#3D7B3F'
              title="Sewa Mobil" />
          </View>
          <View>
            <Image
              source={require('@/assets/images/img_car.png')}
            />
          </View>
        </View>
      </View>
    </ParallaxScrollView >
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constant.statusBarHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },

  titleText1: {
    color: '#ffffff',
    fontFamily: 'PoppinsBold',
    fontSize: 12,
  },

  titleText2: {
    color: '#ffffff',
    fontFamily: 'PoppinsBold',
    fontSize: 14,
  },

  imageProfile: {
    height: 35,
    width: 35
  },

  banner: {
    backgroundColor: "#AF392F",
    marginTop: -140,
    overflow: 'hidden',
    paddingTop: 20,
    borderRadius: 5
  },

  bannerContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },

  bannerTextContainer: {
    width: '45%',
    padding: 10,
    paddingBottom: 25
  },

  bannerText: {
    color: '#ffffff',
    fontFamily: 'Poppins',
    fontSize: 16
  },



});
