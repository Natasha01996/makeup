import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import { Feather, Ionicons, AntDesign } from '@expo/vector-icons';
import Constants from 'expo-constants';
import Counter from '../Counter';
const AppLoader = () => (
  <View style={styles.center}>
    <ActivityIndicator size="large" color="#28695e" style={{ marginTop: 10 }} />
  </View>
);
const { height } = Dimensions.get('window');
import { fetchCosmeticsType } from '../src/api';
import { connect } from 'react-redux';
import { add } from '../redux/action';
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cosmeticsAll: [],
      cosmetics: [],
      page: 0,
      posts: [],
      isLoading: true,
    };
  }
  componentDidMount() {
    this.getSeacrhResult(this.props.route.params.search.name);
  }
  getSeacrhResult = async (type) => {
    const results = await fetchCosmeticsType(type);
    this.setState({
      cosmeticsAll: results,
    });
    this.addRecords(0);
  };
  addRecords = (page) => {
    const newRecords = [];
    for (
      var i = page * 10, il = i + 10;
      i < il && i < this.state.cosmeticsAll.length;
      i++
    ) {
      newRecords.push(this.state.cosmeticsAll[i]);
    }
    this.setState({
      posts: [...this.state.posts, ...newRecords],
      isLoading: false,
    });
  };
  onScrollHandler = () => {
    this.setState(
      {
        page: this.state.page + 1,
      },
      () => {
        this.addRecords(this.state.page);
      }
    );
  };
  addTodo(item) {
    this.setState({ item: [] });
    this.props.addTodo(item);
    return item;
  }
  render() {
    const { navigation } = this.props;
    if (this.props.route.params !== undefined) {
      return (
        <View style={styles.container}>
          <View
            style={{
              paddingTop: Constants.statusBarHeight,
              backgroundColor: '#fff',
            }}></View>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                position: 'relative',
                top: 10,
                left: 10,
                height: 35,
                width: 35,
                backgroundColor: '#539a86',
                borderRadius: 35,
                justifyContent: 'center',
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
                position: 'relative',
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
          </View>
          <Text
            style={{
              marginTop: 20,
              fontWeight: 'normal',
              fontSize: 20,
              marginLeft: 10,
            }}>
            {this.props.route.params.search.name}
          </Text>
          {this.state.isLoading ? (
            <AppLoader />
          ) : (
            <View
              style={{ width: '100%', marginTop: 20, flex: 1, height: height }}>
              <FlatList
                data={this.state.posts}
                numColumns={2}
                renderItem={({ item }) => {
                  if (item.price !== '0') {
                    return (
                      <View
                        style={{
                          borderRadius: 10,
                          justifyContent: 'center',
                          alignSelf: 'center',
                          marginVertical: 10,
                          width: '48%',
                          backgroundColor: '#fff',
                          margin: 4,
                        }}>
                        <TouchableOpacity
                          activeOpacity={0.8}
                          onPress={() => {
                            navigation.navigate('Post', {
                              title: item.title,
                              cosmetic: item,
                            });
                          }}>
                          <Image
                            source={{ uri: item.image_link }}
                            style={{
                              width: '100%',
                              height: 150,
                              justifyContent: 'center',
                              alignItems: 'center',
                              alignSelf: 'center',
                              resizeMode: 'contain',
                            }}
                          />
                          <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.btnAdd}
                            underlayColor="#ff6200"
                            onPress={() => this.addTodo(item)}>
                            <AntDesign
                              name="plus"
                              size={20}
                              color="#fff"
                              style={{
                                justifyContent: 'center',
                                alignSelf: 'center',
                                alignItems: 'center',
                              }}
                            />
                          </TouchableOpacity>
                          <View style={{ padding: 10 }}>
                            <Text
                              numberOfLines={1}
                              style={{
                                color: '#000',
                                marginTop: 5,
                                fontSize: 15,
                                fontWeight: 'bold',
                              }}>
                              {item.name.replace(/Maybelline/g, '').substr(1)}
                            </Text>
                            <View
                              style={{
                                width: '100%',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                              }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  width: '100%',
                                  overflow: 'hidden',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  numberOfLines={1}
                                  style={{
                                    fontSize: 15,
                                    marginTop: 10,
                                    fontWeight: 'bold',
                                    color: '#539a86',
                                  }}>
                                  {item.price == '0.0' ||
                                  item.price == undefined
                                    ? 10.99
                                    : item.price}
                                  $
                                </Text>
                                <View
                                  style={{
                                    justifyContent: 'flex-end',
                                    flexDirection: 'row',
                                    width: 64,
                                    overflow: 'hidden',
                                  }}>
                                  {item.product_colors.map((color) => {
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
                              </View>
                            </View>
                          </View>
                        </TouchableOpacity>
                      </View>
                    );
                  }
                }}
                onEndReached={this.onScrollHandler}
                onEndThreshold={0}
              />
            </View>
          )}
        </View>
      );
    } else {
      return (
        <View style={styles.containerMiddle}>
          <Text style={styles.paragraph}>
            Go back and select the category to search.
          </Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(Search);
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
    margin: 24,
    fontSize: 18,
    textAlign: 'center',
  },
  btnAdd: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: '#539a86',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    zIndex: 99,
  },
});
