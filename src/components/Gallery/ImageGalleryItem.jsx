export const ImageGalleryItem = ({ images }) => {
  return images.map(image => {
    return (
      <li className="ImageGalleryItem" key={image.id}>
        <img
          src={image.webformatURL}
          alt={image.tags}
          className="ImageGalleryItem-image"
        />
      </li>
    );
  });
};
