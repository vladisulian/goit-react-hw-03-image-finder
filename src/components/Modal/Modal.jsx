export const Modal = image => {
  return (
    <div className="Overlay">
      <div className="Modal">
        <img src={image} alt={image.tags} />
      </div>
    </div>
  );
};
