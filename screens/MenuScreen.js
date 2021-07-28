import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {
  getMenuFromDormitory,
  getMenuFromJbnu,
  numberToDay,
} from '../utils/Crawlers';
const moment = require('moment');

const MenuScreen = ({route}) => {
  const flatListRef = useRef();
  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    let getData = getMenuFromDormitory;
    if (route.params.menuID == 2) {
      getData = getMenuFromJbnu;
    }
    setMenuData(
      await getData(route.params.menuID, moment().format('YYYY-MM-DD')),
    );
    flatListRef.current.scrollToIndex({animated: true, index: moment().days()});
    setLoading(false);
  };

  const renderItem = ({item, index}) => {
    let isToday = item.day == moment().days();
    let isMorning = false;
    let isLaunch = false;
    let isDinner = false;
    let hour = moment().hours();
    if (hour < 11) {
      isMorning = true;
    } else if (hour < 16) {
      isLaunch = true;
    } else {
      isDinner = true;
    }
    if (item.morning == '') item.morning = '등록된 학식 정보가 없어요';
    if (item.launch == '') item.launch = '등록된 학식 정보가 없어요';
    if (item.dinner == '') item.dinner = '등록된 학식 정보가 없어요';
    return (
      <View style={styles.listContainer}>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>
            {item.date} {numberToDay(item.day)}
          </Text>
          {isToday && <Text style={styles.totayText}>오늘의 학식</Text>}
        </View>
        <View style={styles.menuContainer}>
          <View
            style={[
              styles.badge,
              isMorning && isToday && styles.selectedBadge,
            ]}>
            <Text
              style={[
                styles.menuTitle,
                isMorning && isToday && styles.selectedMenuTitle,
              ]}>
              아침
            </Text>
          </View>
          <Text>{item.morning}</Text>
        </View>
        <View style={styles.menuContainer}>
          <View
            style={[styles.badge, isLaunch && isToday && styles.selectedBadge]}>
            <Text
              style={[
                styles.menuTitle,
                isLaunch && isToday && styles.selectedMenuTitle,
              ]}>
              점심
            </Text>
          </View>
          <Text>{item.launch}</Text>
        </View>
        <View style={styles.menuContainer}>
          <View
            style={[styles.badge, isDinner && isToday && styles.selectedBadge]}>
            <Text
              style={[
                styles.menuTitle,
                isDinner && isToday && styles.selectedMenuTitle,
              ]}>
              저녁
            </Text>
          </View>
          <Text>{item.dinner}</Text>
        </View>
      </View>
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={menuData}
        renderItem={renderItem}
        ListFooterComponent={
          loading && <ActivityIndicator size="large" color="#56286E" />
        }
        ListFooterComponentStyle={styles.listFooter}
        keyExtractor={item => item.day}
        ref={flatListRef}
        onScrollToIndexFailed={info => {
          const wait = new Promise(resolve => setTimeout(resolve, 500));
          wait.then(() => {
            flatListRef.current.scrollToIndex({
              index: moment().days(),
              animated: true,
            });
          });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  listFooter: {
    paddingVertical: 15,
  },
  listContainer: {
    flex: 1,
    height: 'auto',
    marginHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#56286E',
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateText: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  totayText: {
    color: '#56286E',
    fontWeight: 'bold',
  },
  menuContainer: {
    marginTop: 5,
  },
  badge: {
    marginBottom: 3,
    borderWidth: 1,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderColor: '#555555',
    paddingVertical: 2,
  },
  menuTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#555555',
  },
  selectedBadge: {
    borderColor: '#56286E',
    backgroundColor: '#56286E',
  },
  selectedMenuTitle: {
    color: 'white',
  },
});

export default MenuScreen;
