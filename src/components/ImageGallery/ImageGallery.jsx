import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

import { ImagesList, Button, Loader, Message } from "components";
import errorImg from "images/critical/error-bg.svg";

const MESSAGE_NOT_FOUND = "Sorry, no results found for your search. Try refining your search terms.";
const MESSAGE_END_OF_SEARCH_RESULTS = "You've reached the end of the search results. Feel free to adjust your search criteria or explore more amazing pictures."

/**
 * Gallery of images with a list of image cards.
 * @param {object[]} props.images Image objects.
 * @param {number} props.page Current searched images page number.
 * @param {boolean} props.isLoading Current data loading status.
 * @param {boolean} props.hasLoadMore Flag if there are more available images available to load.
 * @param {callback} props.onClickLoadMore Callback function to load of more images.
 * @param {callback} props.onImageClick Callback function for click on image.
 * @param {callback} props.onUpdate Callback function for gallery update.
 * @returns {React.Component}
 */
export const ImageGallery = ({images, page, isLoading, hasLoadMore, onClickLoadMore, onDidLoadMore, onImageClick}) => {
  const galleryRef = useRef(null);

  /**
   * Handles component update on change in number of provided images.
   * @param {object} prevProps Previous component properties. 
   */
  useEffect(() => onDidLoadMore, [images, onDidLoadMore]);

  /**
   * Handles click on button for loading more images. 
   * @param {SyntheticEvent} event.detail Event property showing number of clicks.
   */
  const handleLoadMoreClick = ({detail}) => {
    // check whenever mouse click or tab focus click
    if (detail !== 0) {
      // mouse click on button
      onClickLoadMore();
    } else {
      // tab focus click using space or enter
      const lastImageElement = galleryRef.current.lastElementChild;
      onClickLoadMore(lastImageElement);
    }
  }

  return (
    <div>
      <ImagesList ref={galleryRef} images={images} onImageClick={onImageClick} />
      {page === 1 && isLoading && <Loader />}
      {images && !images.length && !isLoading && <Message>
                                                    <img src={errorImg} alt="error bg"></img>
                                                    <p>{MESSAGE_NOT_FOUND}</p>
                                                  </Message>}
      {!isLoading && images && images.length > 0 && !hasLoadMore && <Message><p>{MESSAGE_END_OF_SEARCH_RESULTS}</p></Message>}
      {isLoading && page === 1 ? null : images && hasLoadMore && <Button isLoading={isLoading} onClick={handleLoadMoreClick} />}
    </div>
  )
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
  page: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasLoadMore: PropTypes.bool.isRequired,
  onClickLoadMore: PropTypes.func.isRequired,
  onDidLoadMore: PropTypes.func.isRequired,
  onImageClick: PropTypes.func.isRequired,
}
