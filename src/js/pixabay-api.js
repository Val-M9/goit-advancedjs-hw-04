const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '33393016-2f1d389d0905d7f9551defc49';

export const fetchImages = (query) => {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 9,
  });

  return fetch(`${BASE_URL}?${params}`).then((response) => {
    if (!response.ok) {
      throw new Error(response);
    }

    return response.json();
  });
};
