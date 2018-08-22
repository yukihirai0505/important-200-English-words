import axios from 'axios';

export {getQuestions, getPhotos};

const baseUrl = 'https://script.google.com/macros/s/AKfycby1hluc6ua_hqyPGkIwbSgPcinAOLNoM1PJXgjxnzYG8_riWKIm/exec'

async function getQuestions() {
  let res = await axios.get(baseUrl)
  return res.data
}

async function getPhotos(keyword) {
  let res = await axios.get(`${baseUrl}?keyword=${keyword}`)
  return res.data
}
