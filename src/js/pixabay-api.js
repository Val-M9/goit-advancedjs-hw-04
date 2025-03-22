import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '33393016-2f1d389d0905d7f9551defc49';

export const fetchImages = async ({ inputValue, page, perPage }) => {
  const params = {
    key: API_KEY,
    q: inputValue,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: perPage,
    page,
  };

  const response = await axios.get(BASE_URL, { params });
  return response.data;
};
