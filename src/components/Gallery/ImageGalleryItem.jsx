export const ImageGalleryItem = ({ images }) => {
  return images.map(image => {
    // console.log('log from ImageGalleryItem', image);
    return (
      <li className="ImageGalleryItem" key={image.id}>
        <img
          src={image.webformatURL}
          alt="image"
          className="ImageGalleryItem-image"
        />
      </li>
    );
  });
};
