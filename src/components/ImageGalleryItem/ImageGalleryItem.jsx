import css from "./ImageGalleryItem.module.css";

/**
 * A list item component with an image.
 * @returns {React.Component}
 */
export const ImageGalleryItem = ({ id, previewURL, webformatURL, tags }) => {

  const assignAltText = (event) => {
    event.target.alt = tags;
  }

  return (
    <li className={css["gallery-item"]}>
      <button className={css["item-button"]}>
        <img
          className={css.image}
          src={webformatURL}
          title={`Click to zoom-in`}
          alt=""
          data-id={id}
          style={{ backgroundImage: `url(${previewURL}`}}
          loading="lazy"
          onLoad={assignAltText}
        />
      </button>
    </li>
  )
};
