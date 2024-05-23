import React, { useState, useEffect } from "react";

import { getImagesApi } from "api";

import {
  Searchbar,
  ImageGallery,
  ApiReference,
  Message,
  Modal,
  OBJECT_FIT
} from "components";
import css from "./App.module.css";

import { loadCriticalImages } from "helpers/preloadedImages";
import imgError from "images/critical/error-bg.svg";
import imgNoImage from "images/critical/no-image.svg";
import { smoothScroll } from "helpers/smoothScroll";

const MESSAGE_ERROR = "Whoops, something went wrong:";
const IMG_PER_PAGE = 12;
const SMOOTH_SCROLL_DURATION = 500;

/**
 * Image Search Gallery Application root component.
 * @returns {React.Component}
 */
export const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [images, setImages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoadMore, setHasLoadMore] = useState(false);
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState({
    isShowModal: false,
    imageId: null,
    placeholderUrl: null,
    largeImageURL: null,
  });
  const [error, setError] = useState(null);

  const [scrollOffsetOnLoadMore, setScrollOffsetOnLoadMore] = useState(null);
  const [lastImageElement, setLastImageElement] = useState(null);

  /**
   * Loads critically necessary images to cache them.
   */
  useEffect(()=> {
    loadCriticalImages();
  }, []);

  /**
   * Handles search query or page update.
   */
  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    /**
     * Serches for images using external api.
     */
    const searchForImages = async () => {
      try {
        setError(null);
        const data = await getImagesApi(searchQuery, page, IMG_PER_PAGE);
        setImages(prev => [...prev, ...data.hits]);
        const hasLoadMore = page < Math.ceil(data.totalHits / IMG_PER_PAGE);
        setHasLoadMore(hasLoadMore);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    searchForImages();
  }, [searchQuery, page]);

  /**
   * Handles modal window opening.
   */
  useEffect(() => {
    document.documentElement.style.overflowY = modal.isShowModal ? "hidden" : "";
  }, [modal.isShowModal]);

  /**
   * Handle on error occurance.
   * If error is occured - reset elements.
   */
  useEffect(() => {
    if (error) {
      setImages([]);
      setIsLoading(false);
      setPage(1);
      setModal({
        isShowModal: false,
        imageId: null,
        placeholderUrl: null,
        largeImageURL: null,
      });
    }
  }, [error]);

  /**
   * Unfocus from search input after seach executed.
   * 
   * Is useful in these cases:
   * - For User - focuses on loaded search results and allows subsequent tab focus on results.
   * - On mobile - hides keyboard after search or fully show error message prompt without keyboard overlapping.
   */
  const input = document.getElementById("query");
  if ((images && document.activeElement === input) || error) {
    input.blur();
  }

  /**
   * Handles update of search query value.
   * @param {string} searchQueryNew Search query.
   */
  const handleImageSearch = (searchQueryNew) => {
    if (searchQueryNew !== searchQuery) {
      setImages([]);
      setPage(1);
    }
    setIsLoading(true);
    setSearchQuery(searchQueryNew);
  };

  /**
   * Handles load of more images.
   */
  const handleLoadMore = (lastImage) => {
    setIsLoading(true);
    setPage(prev => prev + 1);
    setScrollOffsetOnLoadMore(document.getElementById("image-gallery").offsetHeight);
    if(lastImage) {
      setLastImageElement(lastImage);
    } else {
      setLastImageElement(null);
    }
  };

  /**
   * Handles focus after loading new images.
   * Scrolls to the start of newly loaded images.
   * Focuses on the first image gallery element of loaded images, if such element profided.
   */
  const handleLoadFocusOnNewImages = () => {
    if (scrollOffsetOnLoadMore) {
      smoothScroll(SMOOTH_SCROLL_DURATION, scrollOffsetOnLoadMore + 16);
    }
    if (lastImageElement) {
      const nextImage = lastImageElement.nextElementSibling;
      if (nextImage) {
        nextImage.firstElementChild.focus();
      }
    } else {
      document.activeElement.blur();
    }
    setScrollOffsetOnLoadMore(null);
  };

  /**
   * Handles modal widnow opening.
   * @param {string} imageId Id of the image.
   */
  const handleOpenModal = (imageId, tabFocusedElement) => {
    const { webformatURL: placeholderUrl = imgNoImage,
            largeImageURL,
            tags: altText }
      = images.find(({ id }) => id === Number(imageId));

    setModal(prev => (
      {
        ...prev, 
        ...{
            isShowModal: true, 
            placeholderUrl, 
            largeImageURL, 
            altText
           }
      }
    ));
  };

  /**
   * Hadnles modal window close.
   */
  const handleCloseModal = () => {
    setModal({
      isShowModal: false,
      imageId: null,
      placeholderUrl: null,
      largeImageURL: null,
    });
    if (lastImageElement) {
      setLastImageElement(null);
    }
  };

  return (
    <div className={css.app}>
      <Searchbar onSearch={handleImageSearch} />
      {error && <Message>
                  <img className={css["image-error"]} src={imgError} alt="error background"></img>
                  <p>{MESSAGE_ERROR}</p>
                  <p>"{error.message}"</p>
                </Message>
      }
      {!error && <ImageGallery
                    images={images}
                    page={page}
                    isLoading={isLoading}
                    hasLoadMore={hasLoadMore}
                    onClickLoadMore={handleLoadMore}
                    onDidLoadMore={handleLoadFocusOnNewImages}
                    onImageClick={handleOpenModal}
                  />
      }
      {!error && images && images.length > 0 && <ApiReference />}
      {!error && modal.isShowModal && <Modal
                                        objectFit={OBJECT_FIT.CONTAIN}
                                        placeholderUrl={modal.placeholderUrl}
                                        largeImageURL={modal.largeImageURL}
                                        altText={modal.altText}
                                        oncloseModal={handleCloseModal}
                                      />
      }
    </div>
  );
};
