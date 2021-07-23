import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';
import Icon from '../components/SquareNIcon';

const cheerio = require('cheerio-without-node-native');

const getNotices = async () => {
  const url = 'https://www.jbnu.ac.kr/kor/?menuID=139&pno=1';
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
      date: $mview.next().first().text(),
    });
  });
  console.log(result);
};

const HomeScreen = () => {
  useEffect(() => {
    getNotices();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Text>공지사항 화면</Text>
      <Icon name="n_box" size={20} color={'#56286E'} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
