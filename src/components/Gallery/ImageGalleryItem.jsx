export const ImageGalleryItem = ({ images, onClick }) => {
  return images.map(image => {
    return (
      <li
        className="ImageGalleryItem"
        key={image.id}
        onClick={() => {
          onClick();
        }}
      >
        <img
          src={image.webformatURL}
          alt={image.tags}
          className="ImageGalleryItem-image"
          title="title"
        />
      </li>
    );
  });
};
