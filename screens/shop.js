import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import Constants from 'expo-constants';
import { Feather, Ionicons, Entypo, AntDesign } from '@expo/vector-icons';
import { remove, reset } from '../redux/action';
import { connect } from 'react-redux';
class App extends React.Component {
  removeTodo(id, item) {
    this.setState({ id: '', item: [] });
    this.props.removeTodo(id, item);
    return id, item;
  }
  buyProduct() {
    alert('The purchase is successful');
    this.props.resetTodo();
  }
  render() {
    const { navigation } = this.props;
    if (this.props.item.length > 0) {
      return (
        <ScrollView style={styles.container}>
          <View
            style={{
              paddingTop: Constants.statusBarHeight,
              backgroundColor: '#fff',
            }}></View>
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate('Store')}
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
            <Text style={styles.paragraph}>
              {'In the cart ' + this.props.item.length + ' product'}
            </Text>
            <FlatList
              data={this.props.item}
              renderItem={({ item }) => {
                return (
                  <View
                    style={{
                      backgroundColor: '#fff',
                      borderRadius: 10,
                      width: '95%',
                      height: 80,
                      padding: 5,
                      marginVertical: 5,
                      alignSelf: 'center',
                    }}>
                    <TouchableOpacity
                      style={{
                        justifyContent: 'space-around',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                      activeOpacity={0.8}
                      onPress={() => {
                        navigation.navigate('Post', {
                          title: item.title,
                          cosmetic: item,
                        });
                      }}>
                      <Image
                        source={{ uri: item.image_link }}
                        style={{ width: 64, height: 64, borderRadius: 10 }}
                      />
                      <View style={{ alignSelf: 'center' }}>
                        <Text
                          numberOfLines={1}
                          style={{ fontWeight: 'bold', width: 90 }}>
                          {item.name}
                        </Text>
                        <Text>{item.brand}</Text>
                        <View
                          style={{
                            justifyContent: 'flex-start',
                            flexDirection: 'row',
                            width: 55,
                            overflow: 'hidden',
                          }}>
                          {item.product_colors.map((color) => {
                            return (
                              <View
                                style={{
                                  width: 10,
                                  height: 10,
                                  borderRadius: 10,
                                  marginTop: 10,
                                  alignItems: 'center',
                                  marginHorizontal: 0.5,
                                  backgroundColor: color.hex_value,
                                }}></View>
                            );
                          })}
                        </View>
                      </View>
                      <View style={{ alignSelf: 'center' }}>
                        <Text
                          style={{
                            fontWeight: 'bold',
                            color: '#539a86',
                          }}>
                          {item.price == '0.0' || item.price == undefined
                            ? 10.99
                            : item.price}
                          <Text> $</Text>
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => this.removeTodo(item.id, item)}
                        style={{
                          backgroundColor: 'rgba(255, 0, 0, 0.62)',
                          alignItems: 'center',
                          justifyContent: 'center',
                          alignSelf: 'center',
                          width: 48,
                          height: 48,
                          borderRadius: 10,
                        }}>
                        <AntDesign name="delete" size={21} color="#fff" />
                      </TouchableOpacity>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
            <View
              style={{
                marginTop: 10,
                justifyContent: 'center',
                alignSelf: 'center',
                borderTopWidth: 2,
                borderColor: '#539a86',
                width: '95%',
              }}>
              <Text style={{ fontSize: 18, paddingTop: 10 }}>
                Total: {this.props.price.toFixed(2)} $
              </Text>
              <TouchableOpacity
                onPress={() => this.buyProduct()}
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
                    Buy
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
          </View>
          <View style={{ marginBottom: 15 }}></View>
        </ScrollView>
      );
    } else {
      return (
        <View style={styles.containerMiddle}>
          <Text style={styles.paragraph}>Go back and add product to cart.</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Store')}
            style={{
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
        </View>
      );
    }
  }
}
function mapStateToProps(state) {
  return {
    item: state.item,
    counter: state.counter,
    price: state.price,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    removeTodo: (id, item) => dispatch(remove(id, item)),
    resetTodo: (item) => dispatch(reset(item)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9EEEA',
  },
  containerMiddle: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#F9EEEA',
  },
  paragraph: {
    margin: 14,
    marginBottom: 24,
    fontSize: 18,
    textAlign: 'center',
    alignItems: 'center',
  },
});
