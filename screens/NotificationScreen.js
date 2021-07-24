import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';
import Icon from '../components/SquareNIcon';

const cheerio = require('cheerio-without-node-native');
const width = Dimensions.get('window').width;

const data = [
  {
    author: '정보전산원',
    date: '2021.07.22',
    group: '학사',
    id: '47262',
    isNew: 0,
    link: 'https://www.jbnu.ac.kr/kor/index.php?menuID=139&pno=1&mode=view&no=47262',
    title: '전북대학교 수강신청 영문 서비스 안내',
    views: '308',
  },
  {
    author: '교무처 학사관리과',
    date: '2021.07.02',
    group: '학사',
    id: '47080',
    isNew: 0,
    link: 'https://www.jbnu.ac.kr/kor/index.php?menuID=139&pno=1&mode=view&no=47080',
    title: '2021학년도 2학기 수업운영 방안',
    views: '3737',
  },
  {
    author: '교무처 교무과',
    date: '2021.05.12',
    group: '학사',
    id: '46554',
    isNew: 0,
    link: 'https://www.jbnu.ac.kr/kor/index.php?menuID=139&pno=1&mode=view&no=46554',
    title: '전공진로설계 교과목 주요 내용 안내',
    views: '13729',
  },
  {
    author: '정보전산원',
    date: '2021.07.23',
    group: '학사',
    id: '47281',
    isNew: 1,
    link: 'https://www.jbnu.ac.kr/kor/index.php?menuID=139&pno=1&mode=view&no=47281',
    title: '수강신청시스템 사용법 안내',
    views: '244',
  },
  {
    author: '학생처 취업지원과',
    date: '2021.07.23',
    group: '교육',
    id: '47276',
    isNew: 1,
    link: 'https://www.jbnu.ac.kr/kor/index.php?menuID=139&pno=1&mode=view&no=47276',
    title: '2021학년도 2차 직무역량 UP 프로그램(인사교육 직무) 참가자 모집',
    views: '252',
  },
  {
    author: '대학원교학부',
    date: '2021.07.23',
    group: '학사',
    id: '47275',
    isNew: 1,
    link: 'https://www.jbnu.ac.kr/kor/index.php?menuID=139&pno=1&mode=view&no=47275',
    title: '2021학년도 2학기 일반대학원 재입학 허가 알림',
    views: '91',
  },
  {
    author: '전북국제개발협력센터',
    date: '2021.07.23',
    group: '취업',
    id: '47274',
    isNew: 1,
    link: 'https://www.jbnu.ac.kr/kor/index.php?menuID=139&pno=1&mode=view&no=47274',
    title: '[전북국제개발협력센터] KOICA 국제기구 진출 지원사업 소개',
    views: '172',
  },
  {
    author: '학생처 학생과',
    date: '2021.07.23',
    group: '기타',
    id: '47273',
    isNew: 0,
    link: 'https://www.jbnu.ac.kr/kor/index.php?menuID=139&pno=1&mode=view&no=47273',
    title: '2021학년도 하계 자기설계 도전활동 공모전 결과발표회 일정 안내',
    views: '207',
  },
  {
    author: '학생처 학생과',
    date: '2021.07.23',
    group: '기타',
    id: '47272',
    isNew: 0,
    link: 'https://www.jbnu.ac.kr/kor/index.php?menuID=139&pno=1&mode=view&no=47272',
    title:
      '개방형 클라우드 플랫폼 파스-타 기반 서비스 개발 및 아이디어 공모전 안내',
    views: '156',
  },
];

const NotificationScreen = ({route}) => {
  const getNotices = async (pageNumber, catagory) => {
    const url = `https://www.jbnu.ac.kr/kor/?menuID=139&pno=${pageNumber}&category=${catagory}`;
    const response = await fetch(url);
    const htmlString = await response.text();
    const $ = cheerio.load(htmlString);
    const $list = $('#print_area .page_list table tbody > tr').toArray();
    let result = [];
    $list.map(el => {
      const $aTag = $('.left > span > a', el);
      const $mview = $('.mview', el);
      const href = $aTag.attr('href');
      result.push({
        id: href.slice(-5, href.length),
        group: $('.group', el).text().trim(),
        link: 'https://www.jbnu.ac.kr/kor/index.php' + href,
        title: $aTag.text().trim(),
        author: $('span', $mview).attr('title'),
        date: $mview.eq(1).text(),
        views: $mview.eq(2).text(),
        isNew: $('td.left > span > img', el).length,
      });
    });
    // setData(result);
    // console.log(result);
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.listContainer}>
        <TouchableOpacity>
          <Text style={styles.titleText}>{item.title}</Text>
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
            <Text style={styles.viewsText}>{item.views}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  // const [data, setData] = useState([]);
  useEffect(() => {
    // getNotices(1, route.params.catagory);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  listContainer: {
    height: 'auto',
    marginHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
  },
  titleText: {
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
    fontSize: 12,
    color: '#aaaaaa',
  },
  viewsText: {
    fontSize: 10,
    color: '#aaaaaa',
  },
});

export default NotificationScreen;
