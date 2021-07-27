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

const data = [
  {
    day: 0,
    author: '참빛관',
    date: '5월 9일',
    morning: '쌀밥 꽃게해물탕 볼어묵조림 된장깻잎 김치',
    launch: '김치볶음밥 콩나물국 김말이튀김 단무지 깍두기',
    dinner: '쌀밥 닭개장 미니돈까스 혼합콩자반 세발나물유자소스무침 김치',
  },
  {
    day: 1,
    author: '참빛관',
    date: '5월 10일',
    morning:
      '쌀밥 순두부김치국 너비아니데리조림 명엽채조림 상추무침 깍두기 (간편식) 애플파이 양송이스프 깐감자버터구이 단호박샐러드 우유',
    launch:
      '흑미밥 배추된장국 돈육간장불고기 양배추쌈 혼합콩자반 김치 (누들식) 김치우동 명란군만두 단무지 김치',
    dinner:
      '쌀밥 동태찌개 미니돈까스 알감자조림 오이양파&쌈장 깍두기 (일품식) 닭살카레볶음밥 미소일식장국 동그랑땡야채조림 단무지 김치',
  },
  {
    day: 2,
    author: '참빛관',
    date: '5월 11일',
    morning:
      '쌀밥 고추장찌개 해물완자전 맛김구이 배추나물 깍두기 (간편식) 식빵&치즈데니쉬&사과잼 계란후라이 사과푸딩 씨리얼 우유',
    launch:
      '쌀밥 돼지등뼈감자탕 옛날소세지전 한국식샐러드 무말랭이오징어젓무침 깍두기 (누들식) 까르보나라 모닝빵&딸기잼 오이피클 김치',
    dinner:
      '쌀밥 시금치된장국 닭살탕수 매운두부조림 샐러리장아찌 김치 (일품식) 돈육하이라이스 우동국물 돈까스 단무지채무침 김치',
  },
  {
    day: 3,
    author: '참빛관',
    date: '5월 12일',
    morning:
      '쌀밥 닭개장 미트볼조림 동부묵무침 쑥갓나물 깍두기 (간편식) 버섯야채죽 미트볼조림 양파오이생채 락교 김치',
    launch:
      '기장밥 삼겹살김치찌개 녹두빈대떡 무조림 양상추샐러드&오리엔탈소스 무생채 (누들식) 메밀소바 짬뽕군만두 단무지 김치',
    dinner:
      '쌀밥 콩나물국 소불고기 실치볶음 치커리무침 김치 (일품식) 추억의도시락 유부일식장국 고구마샐러드 건강야채무침 무생채',
  },
  {
    day: 4,
    author: '참빛관',
    date: '5월 13일',
    morning:
      '쌀밥 북어수제비국 돈육장조림 새송이버섯볶음 돌나물초무침 김치 (간편식) 소보루빵 계란볶음 푸실리샐러드 양배추샐러드&파인애플소스 우유',
    launch:
      '쌀밥 열무된장국 고등어무조림 감자햄볶음 건파래볶음 배추겉절이 (누들식) 유부잔치국수 두부도너츠 양파초간장 요구르트 김치',
    dinner:
      '버섯콩나물밥 들깨무국 타코야끼&데리야끼소스 볼어묵조림 양념깻잎 김치 (일품식) 치킨커틀렛 추가밥 양파크림스프 감자튀김&케찹 오이피클 김치',
  },
  {
    day: 5,
    author: '참빛관',
    date: '5월 14일',
    morning:
      '쌀밥 근대된장국 참치야채볶음 매운어묵볶음 청경채나물 김치 (간편식) 식빵&적고구마데니쉬&딸기잼 반달감자튀김&케찹 양상추샐러드&요거트드레싱 씨리얼 우유',
    launch:
      '수수밥 불고기순두부찌개 치킨너겟 브로컬리&초장 시래기된장나물 김치 (누들식) 꼬꼬면 야채튀김 단무지 김치',
    dinner:
      '쌀밥 부대찌개 떡볶이 다시마채무침 콩나무무침 깍두기 (일품식) 햄야채볶음밥 어묵국 고구마튀김 단무지 김치',
  },
  {
    day: 6,
    author: '참빛관',
    date: '5월 15일',
    morning: '쌀밥 오징어무국 계란말이 실곤약무침 김치',
    launch: '돈육카레라이스 유부장국 한입치킨까스 단무지 김치',
    dinner: '쌀밥 얼큰만두찌개 두부구이 삼색냉채 된장고추무침 깍두기',
  },
];

const MenuScreen = ({route}) => {
  const flatListRef = useRef();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    flatListRef.current.scrollToIndex({animated: true, index: moment().days()});
  }, []);
  
  const renderItem = ({item, index}) => {
    let isToday = item.day == moment().days();
    return (
      <View style={styles.listContainer}>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>
            {item.date} {numberToDay(item.day)}
          </Text>
          {isToday && <Text style={styles.totayText}>오늘의 학식</Text>}
        </View>
        <View style={styles.menuContainer}>
          <View style={[styles.badge, isToday && styles.selectedBadge]}>
            <Text
              style={[styles.menuTitle, isToday && styles.selectedMenuTitle]}>
              아침
            </Text>
          </View>
          <Text>{item.morning}</Text>
        </View>
        <View style={styles.menuContainer}>
          <View style={styles.badge}>
            <Text style={styles.menuTitle}>점심</Text>
          </View>
          <Text>{item.launch}</Text>
        </View>
        <View style={styles.menuContainer}>
          <View style={styles.badge}>
            <Text style={styles.menuTitle}>저녁</Text>
          </View>
          <Text>{item.dinner}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
