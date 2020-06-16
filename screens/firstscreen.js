import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import { Feather } from '@expo/vector-icons';
const recentImage = {
  uri: 'https://i.ibb.co/WGHkMZ8/70d937e2a46a7776439ab2e42c547c8f.png',
};
export default class FirstScreen extends React.Component {
  render() {
    const { navigation } = this.props;
    setTimeout(() => {
      this.props.navigation.navigate('Home');
    }, 3000);
    return (
      <View style={styles.container}>
        <Image
          source={recentImage}
          style={{
            width: '100%',
            height: 400,
            alignSelf: 'center',
            position: 'relative',
          }}
        />
        <ActivityIndicator size="large" color="#28695e" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#F9EEEA',
    padding: 8,
  },
});
