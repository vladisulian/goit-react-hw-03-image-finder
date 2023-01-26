import axios from 'axios';

async function fetchImages(value, pageNumber) {
  const responce = await axios.get(
    `https://pixabay.com/api/?q=${value}&page=1&key=31911886-b70f9395e6a878339225ca253&image_type=photo&orientation=horizontal&per_page=12`
  );
}
