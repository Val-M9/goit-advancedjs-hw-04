import { fetchImages } from './js/pixabay-api';
import {
  showError,
  showNotification,
  renderGallery,
  refs,
} from './js/render-functions';

const imagesOptions = {
  inputValue: '',
  page: 1,
  imagesLeft: 0,
  perPage: 15,
};

const handleInput = async (event) => {
  event.preventDefault();

  refs.gallery.innerHTML = '';
  imagesOptions.page = 1;
  imagesOptions.imagesLeft = 0;
  refs.loadMore.classList.add('hidden');

  const form = event.currentTarget;
  imagesOptions.inputValue = form.elements.search.value.trim();

  if (!imagesOptions.inputValue) {
    refs.gallery.innerHTML = '';
    return showError();
  }

  refs.loader.classList.add('active');

  try {
    const images = await fetchImages(imagesOptions);
    imagesOptions.imagesLeft =
      images.totalHits - imagesOptions.page * imagesOptions.perPage;

    renderGallery(images.hits);
    if (imagesOptions.imagesLeft > 0) {
      refs.loadMore.classList.remove('hidden');
    }
  } catch (error) {
    showError(error.message);
  } finally {
    form.reset();
    refs.loader.classList.remove('active');
  }
};

const handleLoadMore = async () => {
  refs.loadMore.classList.add('hidden');
  refs.loader.classList.add('active');
  imagesOptions.page += 1;

  try {
    const images = await fetchImages(imagesOptions);
    imagesOptions.imagesLeft =
      images.totalHits - imagesOptions.page * imagesOptions.perPage;
    renderGallery(images.hits);

    if (imagesOptions.imagesLeft <= 0) {
      showNotification(
        "We're sorry, but you've reached the end of search results."
      );
      return;
    }

    const cardHeight =
      refs.gallery.firstElementChild.getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 3,
      behavior: 'smooth',
    });

    refs.loadMore.classList.remove('hidden');
  } catch (error) {
    showError(error.message);
  } finally {
    refs.loader.classList.remove('active');
  }
};

refs.searchForm.addEventListener('submit', handleInput);
refs.loadMore.addEventListener('click', handleLoadMore);
