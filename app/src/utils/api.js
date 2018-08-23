import axios from 'axios';

export {getQuestions, getImageUrls};

const baseUrl = 'https://script.google.com/macros/s/AKfycby1hluc6ua_hqyPGkIwbSgPcinAOLNoM1PJXgjxnzYG8_riWKIm/exec'

async function getQuestions() {
  let res = await axios.get(baseUrl)
  return res.data
}

async function getImageUrls(keyword, service = 'flickr') {
  let url = `${baseUrl}?keyword=${keyword}`,
    res = await axios.get(`${url}&service=${service}`),
    data = res.data,
    imageUrls = service === 'flickr' ?
      data.photos.photo.map((v) => {
        return v.url_n;
      }) :
      data.info.photo.map((v) => {
        return v.image_url
      })
  return imageUrls.filter(v => v).slice(0, 20);
}
