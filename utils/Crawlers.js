const cheerio = require('cheerio-without-node-native');

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

const getMenuFromDormitory = async (menuId, date) => {
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
      date: urlDate.add(1, 'days').format('M.D'),
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
  console.log(result);
};
