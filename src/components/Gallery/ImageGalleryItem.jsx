export const ImageGalleryItem = ({ images }) => {
  images.map(image => {
    // console.log(image);
    return (
      <li class="gallery-item" key={image.id}>
        <img src={image.tag} alt="" />
      </li>
    );
  });
};
