const cheerio = require('cheerio-without-node-native');

export const getNotices = async (pageNumber, catagory) => {
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
  // console.log(result);
  return result;
};
