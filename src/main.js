import { fetchImages } from './js/pixabay-api';
import { showError, renderGallery, refs } from './js/render-functions';

const handleInput = (event) => {
  event.preventDefault();

  const form = event.currentTarget;
  const inputValue = form.elements.search.value.trim();

  if (!inputValue) {
    refs.gallery.innerHTML = '';
    return showError();
  }

  refs.loader.classList.add('active');
  fetchImages(inputValue)
    .then((images) => {
      renderGallery(images.hits);
    })
    .catch((error) => {
      showError(error.message);
    })
    .finally(() => {
      form.reset();
      refs.loader.classList.remove('active');
    });
};

refs.searchForm.addEventListener('submit', handleInput);
