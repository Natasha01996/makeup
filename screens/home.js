import * as React from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Button,
  Image,
  ImageBackground,
  TouchableOpacity,
  TouchableHighlight,
  FlatList,
  Dimensions,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';
import { Feather, Ionicons, AntDesign } from '@expo/vector-icons';
import Constants from 'expo-constants';
const collection = {
  uri:
    'https://assets.bigcartel.com/account_images/2809838/IMG_6011.JPG?auto=format&fit=max&h=1200&w=1200',
};
const AppLoader = () => (
  <View style={styles.center}>
    <ActivityIndicator size="large" color="#28695e" style={{ marginTop: 10 }} />
  </View>
);
const { height } = Dimensions.get('window');
import { fetchCosmetics } from '../src/api';
import { cosmetics, iconCategory } from '../src/data';
import { connect } from 'react-redux';
import { add } from '../redux/action';
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cosmeticsAll: [],
      cosmetics: [],
      page: 0,
      posts: [],
      isLoading: true,
      count: 0,
      counter: 0,
    };
  }
  componentDidMount() {
    this.getSeacrhResult();
  }
  getSeacrhResult = async () => {
    const results = await fetchCosmetics();
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
    return (
      <View style={styles.container}>
        <ScrollView style={{ backgroundColor: '#F9EEEA' }}>
          <Text
            style={{
              marginTop: 20,
              fontWeight: 'normal',
              fontSize: 20,
              marginLeft: 10,
            }}>
            Category
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignSelf: 'center',
              width: '100%',
            }}>
            <FlatList
              data={iconCategory}
              horizontal={true}
              renderItem={({ item, index }) => {
                return (
                  <View
                    style={{
                      borderRadius: 10,
                      paddingVertical: 20,
                      justifyContent: 'center',
                      alignSelf: 'center',
                      paddingLeft: 4,
                      paddingRight: 4,
                    }}>
                    <TouchableOpacity
                      style={styles.categoryBlock}
                      onPress={() => {
                        navigation.navigate('Search', {
                          search: item,
                        });
                      }}>
                      <Image
                        source={item.src}
                        style={{
                          width: 50,
                          height: 50,
                          justifyContent: 'center',
                          alignItems: 'center',
                          alignSelf: 'center',
                          resizeMode: 'contain',
                        }}
                      />
                      <Text
                        style={{ fontSize: 14, color: '#000', marginTop: 5 }}>
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
          <Text
            style={{
              marginTop: 20,
              fontWeight: 'normal',
              fontSize: 20,
              marginLeft: 10,
            }}>
            New Collection
          </Text>
          <View>
            <FlatList
              data={cosmetics}
              horizontal={true}
              renderItem={({ item, index }) => {
                return (
                  <View
                    style={{
                      flex: 1,
                      marginHorizontal: 2,
                      marginTop: 10,
                      marginBottom: 10,
                      backgroundColor: '#fff',
                      borderRadius: 10,
                    }}>
                    <TouchableHighlight
                      style={{ borderRadius: 10 }}
                      underlayColor="#fff"
                      onPress={() => {
                        navigation.navigate('Post', {
                          title: item.title,
                          cosmetic: item,
                        });
                      }}>
                      <View>
                        <Image
                          style={styles.image}
                          source={{ uri: item.image_link }}
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
                              width: '100%',
                              fontSize: 15,
                              fontWeight: 'bold',
                            }}>
                            {item.name}
                          </Text>
                          <Text
                            numberOfLines={1}
                            style={{
                              width: 150,
                              fontSize: 15,
                            }}>
                            {item.brand}
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
                            <Text
                              numberOfLines={1}
                              style={{
                                fontSize: 15,
                                marginTop: 10,
                                fontWeight: 'bold',
                                color: '#539a86',
                              }}>
                              {item.price}$
                            </Text>
                          </View>
                        </View>
                      </View>
                    </TouchableHighlight>
                  </View>
                );
              }}
              keyExtractor={(item) => item.id}
            />
          </View>
          <Text
            style={{
              marginTop: 20,
              fontWeight: 'normal',
              fontSize: 20,
              marginLeft: 10,
            }}>
            All Collection
          </Text>
          {this.state.isLoading ? (
            <AppLoader />
          ) : (
            <FlatList
              data={this.state.posts}
              numColumns={2}
              renderItem={({ item, index }) => {
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
                                {item.price}$
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
              keyExtractor={(item) => item.id}
              onEndReached={this.onScrollHandler}
              onEndThreshold={0}
            />
          )}
          <View style={{ marginBottom: 10 }}></View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
  },
  categoryBlock: {
    width: 100,
    height: 100,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
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
