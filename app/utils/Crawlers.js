const cheerio = require('cheerio-without-node-native');
const moment = require('moment');

export const getNotices = async (pageNumber, catagory) => {
  const url = `https://www.jbnu.ac.kr/kor/?menuID=139&pno=${pageNumber}&category=${catagory}`;
  const response = await fetch(url);
  const htmlString = await response.text();
  const $ = cheerio.load(htmlString);
  const $list = $('#print_area .page_list table tbody > tr');
  let result = [];
  $list.toArray().map(el => {
    const $aTag = $('.left > span > a', el);
    const $mview = $('.mview', el);
    const href = $aTag.attr('href');
    result.push({
      id: href.slice(-5),
      group: $('.group', el).text().trim(),
      link: 'https://www.jbnu.ac.kr/kor/index.php' + href,
      title: $aTag.text().trim(),
      author: $('span', $mview).attr('title'),
      date: $mview.eq(1).text(),
      views: $mview.eq(2).text(),
      isNew: $('td.left > span > img', el).length,
      isNotice: $('th > img', el).length,
    });
  });
  // console.log(result);
  return result;
};

export const getMenuFromDormitory = async (menuId, date) => {
  // 기존관 : B7100 , 참빛관 : B7200, 특성화캠퍼스 : B7300
  const url = `https://likehome.jbnu.ac.kr/home/main/inner.php?sMenu=${menuId}&date=${date}`;
  const response = await fetch(url);
  const htmlString = await response.text();
  const $ = cheerio.load(htmlString);
  const $list = $('#calendar table > tbody > tr > td');
  const urlDate = moment(response.url.slice(-10)).add(-1, 'd');
  let result = [];
  for (let i = 0; i < 7; ++i) {
    result.push({
      day: i,
      author: $('div.subreporttitle').text(),
      date: urlDate.add(1, 'days').format('MM월 DD일'),
      morning: $list.eq(i).text().trim(),
      launch: $list
        .eq(i + 7)
        .text()
        .trim(),
      dinner: $list
        .eq(i + 14)
        .text()
        .trim(),
    });
  }
  // console.log(result);
  return result;
};

export const getMenuFromJbnu = async (menuId, dummy) => {
  // eq(2): 진수원, eq(4): 의대, eq(6): 후생관, eq(8): 정담원,
  const url = 'http://sobi.chonbuk.ac.kr/chonbuk/m040101';
  const response = await fetch(url);
  const htmlString = await response.text();
  const $ = cheerio.load(htmlString);
  const $totalMenu = $('#sub_right > div');
  const $menu = $('table tbody tr td[bgcolor="#ffffff"]', $totalMenu.eq(2));
  const dateString = $('div > p > span > span').text();
  const month = dateString.slice(3, 5);
  const day = dateString.slice(7, 9);
  const date = moment(moment().year() + month + day).add(-2, 'd');
  let result = [];
  for (let i = 0; i < 7; ++i) {
    let launch = '';
    let dinner = '';
    if (i > 0 && i < 6) {
      let launchIndex = i - 1;
      let dinnerIndex = i + 4;
      launch = $($menu.eq(launchIndex).html().replace(/<br>/g, ' ')).text();
      dinner = $($menu.eq(dinnerIndex).html().replace(/<br>/g, ' ')).text();
    }
    result.push({
      author: '진수원',
      day: i,
      date: date.add(1, 'd').format('MM월 DD일'),
      morning: '',
      launch: launch.trim(),
      dinner: dinner.trim(),
    });
  }
  // console.log(result);
  return result;
};

export const numberToDay = number => {
  let day = ['(일)', '(월)', '(화)', '(수)', '(목)', '(금)', '(토)'];
  return day[number];
};

const getSchedule = async semester => {
  const url = `https://www.jbnu.ac.kr/kor/?menuID=19&category=2021&semester=${semester}`;
  const response = await fetch(url);
  const htmlString = await response.text();
  const $ = cheerio.load(htmlString);
  const $schedule = $('#print_area .page_list table > tbody > tr');
  let result = [];
  for (let i = 0; i < $schedule.length; ++i) {
    result.push({
      title: $('td', $schedule.eq(i)).last().text().trim(),
      description: $('td[scope=row]', $schedule.eq(i)).text().trim(),
    });
  }
  console.log(result);
  return result;
};

export const getMenuFromJeonju = async (menuId, dummy) => {
  const url = 'http://jeonju.jbdream.or.kr/bbs/board.php?bo_table=sub03_06';
  const response = await fetch(url);
  const htmlString = await response.text();
  const $ = cheerio.load(htmlString);
  const $menu = $('div.tbl_head01 td.td_board1');
  const date = moment().add(-1 * moment().days(), 'd');
  let result = [];
  for (let i = 0; i < 7; i++) {
    let idx = 3 * i;
    result.push({
      author: '장학숙',
      day: (i + 1) % 7,
      date: date.add(1, 'd').format('MM월 DD일'),
      morning: $menu.eq(idx).text().replace(/\//g, ' '),
      launch: $menu
        .eq(idx + 1)
        .text()
        .replace(/\//g, ' '),
      dinner: $menu
        .eq(idx + 2)
        .text()
        .replace(/\//g, ' '),
    });
  }
  return result;
};
