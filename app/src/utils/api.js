import axios from 'axios';

export {getQuestions};

function getQuestions() {
  return axios
    .get('https://script.google.com/macros/s/AKfycby1hluc6ua_hqyPGkIwbSgPcinAOLNoM1PJXgjxnzYG8_riWKIm/exec')
    .then(response => response.data)
}
