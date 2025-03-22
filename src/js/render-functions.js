import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  searchForm: document.querySelector('.form'),
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
  loadMore: document.querySelector('.load-more-btn'),
};

const lightbox = new SimpleLightbox('.gallery-link', {
  captionsData: 'alt',
  captionDelay: 250,
});

const showError = (message) => {
  return iziToast.error({
    title: 'Error',
    message:
      message ||
      'Sorry, there are no images matching your search query. Please try again!',
    position: 'topRight',
    transitionIn: 'fadeInDown',
  });
};

const showNotification = (message) => {
  return iziToast.info({
    title: 'Info',
    message: message,
    position: 'topRight',
    transitionIn: 'fadeInDown',
  });
};

const createImageElement = ({
  webformatURL,
  largeImageURL,
  likes,
  views,
  comments,
  downloads,
  tags,
}) => {
  return `
    <li class="gallery-item">
      <a class="gallery-link" href=${largeImageURL}>
        <img
          class="gallery-image"
          src=${webformatURL}
          alt=${tags}
      
        />
        <div class="image-info">
          <div class="info-section">
            <p class="info-title">Likes</p>
            <p class="info-text">${likes}</p>
          </div>
          <div class="info-section">
            <p class="info-title">Views</p>
            <p class="info-text">${views}</p>
          </div>
          <div class="info-section">
            <p class="info-title">Comments</p>
            <p class="info-text">${comments}</p>
          </div>
          <div class="info-section">
            <p class="info-title">Downloads</p>
            <p class="info-text">${downloads}</p>
          </div>
        </div>
      </a>
    </li>
    `;
};

const renderGallery = (images) => {
  if (!images.length) {
    refs.gallery.innerHTML = '';
    showError();
  }

  const markup = images.map((image) => createImageElement(image)).join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);

  lightbox.refresh();
};

export { showError, showNotification, createImageElement, renderGallery, refs };
