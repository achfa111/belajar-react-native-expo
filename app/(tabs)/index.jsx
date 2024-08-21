import { Image, StyleSheet, Platform } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import Constant from 'expo-constants';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A43333', dark: '#A43333' }}
      headerImage={
        <View>
          <View style={styles.container}>

            <View>
              <Text styles={styles.titleText}>Hi, Nama</Text>
              <Text styles={styles.titleText}>Your Location</Text>
            </View>

            <View>
              <Image
                styles={styles.imageProfile}
                source={require('@assets/images/Ellipse_24.png')} />
            </View>
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

        </View>
      </View>

<View>
  <Image source={require('@assets/images/img_car.png'/>
</View>


    </ParallaxScrollView >
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constant.statusBarHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  titleText: {
    color: '#ffffff',
    fontFamily: 'PoppinsBold'
  },

  imageProfile: {
    height: 35,
    width: 35
  },

  banner: {
    flex: 1,
    height: 250,
    marginTop: -180, // Untuk menaikkan banner ke atas
    backgroundColor: '#f6f6f6'
  },

  bannerTextContainer: {
    width: 45 %,
    padding: 10,
    paddingBottom: 25
  },

  bannerText: {
    color: '#ffffff',
    fontFamily: 'Poppins',
    fontSize: 16
  },


});
