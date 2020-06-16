import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  FlatList,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, Ionicons, AntDesign } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { add } from '../redux/action';
import { connect } from 'react-redux';
class Post extends React.Component {
  addTodo(item) {
    this.setState({ item: [] });
    this.props.addTodo(item);
    return item;
  }
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              position: 'absolute',
              top: 10,
              left: 10,
              height: 35,
              width: 35,
              backgroundColor: '#539a86',
              borderRadius: 35,
              justifyContent: 'center',
              alignSelf: 'center',
              alignItems: 'center',
              zIndex: 99,
            }}>
            <Feather
              name="arrow-left"
              size={24}
              color="#fff"
              style={{
                justifyContent: 'center',
                alignSelf: 'center',
                alignItems: 'center',
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Cart')}
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              height: 35,
              width: 80,
              backgroundColor: '#539a86',
              borderRadius: 35,
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 99,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <Feather
                name="shopping-cart"
                size={21}
                color="#fff"
                style={{
                  justifyContent: 'center',
                  alignSelf: 'center',
                  alignItems: 'center',
                }}
              />
              <Text
                style={{
                  color: '#fff',
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  fontWeight: 'bold',
                  marginLeft: 5,
                }}>
                {this.props.item.length}
              </Text>
            </View>
          </TouchableOpacity>
          <ImageBackground
            source={{ uri: this.props.route.params.cosmetic.image_link }}
            style={styles.image}
            imageStyle={{
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
            }}></ImageBackground>
          <View style={{ padding: 10 }}>
            <Text style={{ fontWeight: 'normal', fontSize: 19 }}>
              {this.props.route.params.cosmetic.name}
            </Text>
            <Text
              style={{ fontWeight: 'normal', fontSize: 17, paddingTop: 10 }}>
              <Text style={{ fontWeight: 'bold' }}>Brand: </Text>
              {this.props.route.params.cosmetic.brand}
            </Text>
            <Text style={{ fontWeight: 'normal', fontSize: 17 }}>
              <Text style={{ fontWeight: 'bold' }}>Price: </Text>
              {this.props.route.params.cosmetic.price == '0.0' ||
              this.props.route.params.cosmetic.price == undefined
                ? 10.99
                : this.props.route.params.cosmetic.price}
              <Text>$</Text>
            </Text>
            <View
              style={{
                flexDirection: 'row',
                overflow: 'hidden',
              }}>
              {this.props.route.params.cosmetic.product_colors.map((color) => {
                return (
                  <View
                    style={{
                      width: 15,
                      height: 15,
                      borderRadius: 10,
                      marginTop: 10,
                      alignItems: 'center',
                      marginHorizontal: 0.5,
                      backgroundColor: color.hex_value,
                    }}></View>
                );
              })}
            </View>
            <Text
              style={{ fontWeight: 'normal', fontSize: 15, paddingTop: 10 }}>
              {this.props.route.params.cosmetic.description
                .replace(/\s+/g, ' ')
                .trim()}
            </Text>
            <TouchableOpacity
              onPress={() => this.addTodo(this.props.route.params.cosmetic)}
              style={{
                height: 40,
                width: '100%',
                backgroundColor: '#539a86',
                borderRadius: 10,
                marginTop: 10,
                justifyContent: 'center',
                alignSelf: 'center',
                alignItems: 'center',
                padding: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignSelf: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#fff',
                    textTransform: 'uppercase',
                    alignItems: 'center',
                    fontWeight: 'bold',
                    fontSize: 19,
                  }}>
                  Add to cart
                </Text>
                <Ionicons
                  name="md-cart"
                  size={20}
                  color="#fff"
                  style={{ marginLeft: 10 }}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ marginBottom: 15 }}></View>
        </ScrollView>
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addTodo: (item) => dispatch(add(item)),
  };
}

function mapStateToProps(state) {
  return {
    item: state.item,
    counter: state.counter,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 350,
    justifyContent: 'flex-end',
    resizeMode: 'cover',
  },
});
