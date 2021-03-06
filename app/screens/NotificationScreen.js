import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
} from 'react-native';
import Icon from '../components/SquareNIcon';
import {windowWidth, windowHeight} from '../utils/Dimentions';
import {getNotices} from '../utils/Crawlers';

const NotificationScreen = ({route, navigation}) => {
  const [noticeData, setNoticeData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    console.log(page);
    const data = await getNotices(page, '');
    setNoticeData([...noticeData, ...data]);
    setPage(page + 1);
    setLoading(false);
  };

  const onEndReached = () => {
    if (loading == false) {
      fetchData();
    }
    return;
  };

  const renderItem = ({item}) => (
    <View style={styles.listContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate('세부사항', {uri: item.link})}>
        <View style={styles.titleContainer}>
          {item.isNotice == 1 ? (
            <Image
              source={require('../assets/icon_notice.png')}
              style={{marginRight: 5}}
            />
          ) : (
            <View></View>
          )}
          <Text style={styles.titleText}>{item.title}</Text>
        </View>
        <View style={styles.otherContainer}>
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>{item.group}</Text>
            <Text style={styles.infoText}> | </Text>
            <Text style={styles.infoText}>{item.date}</Text>
            <Text style={styles.infoText}> | </Text>
            <Text style={styles.infoText}>{item.author}</Text>
            {item.isNew == 1 ? (
              <Icon name="n_box" size={14} color={'#56286E'} />
            ) : (
              <View></View>
            )}
          </View>
          <Text style={styles.viewsText}>{item.views}회</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={noticeData}
        renderItem={renderItem}
        onEndReached={onEndReached}
        onEndReachedThreshold={0}
        ListFooterComponent={
          loading && <ActivityIndicator size="large" color="#56286E" />
        }
        ListFooterComponentStyle={styles.listFooter}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  listContainer: {
    height: 'auto',
    marginHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#56286E',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    flex: 1,
    fontSize: 14,
  },
  otherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    marginRight: 5,
    fontSize: 10,
    color: '#aaaaaa',
  },
  viewsText: {
    fontSize: 10,
    color: '#aaaaaa',
  },
  listFooter: {
    paddingVertical: 15,
  },
});

export default NotificationScreen;
