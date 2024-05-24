import { forwardRef } from "react";
import PropTypes from "prop-types";

import { ImageItem } from "components";
import css from "./ImagesList.module.css";

/**
 * Component that renders list of image cards.
 * @param {object[]} props.images Image objects.
 * @param {number} props.page Current searched images page number.
 * @param {boolean} props.isLoading Current data loading status.
 * @param {boolean} props.hasLoadMore Flag if there are more available images available to load.
 * @param {callback} props.onClickLoadMore Callback function to load of more images.
 * @param {callback} props.onImageClick Callback function for click on image.
 * @param {callback} props.onUpdate Callback function for gallery update.
 * @returns {React.Component}
 */
export const ImagesList = forwardRef(({images, onImageClick}, ref) => {

  const handleGalleryImageClick = ({target}) => {
    // in case tab focus key press
    if (target.nodeName === "BUTTON") {
      onImageClick(target.firstElementChild.dataset.id, target.closest("li"));
    }

    // in case mouse click
    if (target.nodeName === "IMG") {
      onImageClick(target.dataset.id, target.closest("li"));
    }
  }

  return (
    <ul ref={ref} id="image-gallery" className={css.gallery} onClick={handleGalleryImageClick}>
      {images && images.length > 0 &&
        <>
          {images.map(({ id, previewURL, webformatURL, tags }, idx) => (
            <ImageItem
              key={`id${id}idx${idx}`}
              id={id}
              previewURL={previewURL}
              webformatURL={webformatURL}
              tags={tags}
            />
          ))}
        </>
      }
    </ul>
)
});

ImagesList.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
  onImageClick: PropTypes.func.isRequired,
}
