export const ImageGalleryItem = ({ images }) => {
  return images.map(image => {
    return (
      <li className="ImageGalleryItem" key={image.id}>
        <a href={image.largeImageURL} loading="lazy" className="lightbox-a">
          <img
            src={image.webformatURL}
            alt={image.tags}
            className="ImageGalleryItem-image"
            title="title"
          />
        </a>
      </li>
    );
  });
};
