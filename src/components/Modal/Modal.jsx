export const Modal = image => {
  return (
    <div class="overlay">
      <div class="modal">
        <img src={image} alt={image.tags} />
      </div>
    </div>
  );
};
