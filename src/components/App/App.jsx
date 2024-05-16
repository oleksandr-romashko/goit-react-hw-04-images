import React from "react";

import { getImagesApi } from "api";

import {
  Searchbar,
  ImageGallery,
  ApiReference,
  Message,
  Modal
} from "components";
import css from "./App.module.css";

import { loadCriticalImages } from "helpers/preloadedImages";
import imgError from "images/critical/error-bg.svg";
import imgNoImage from "images/critical/no-image.svg";
import { smoothScroll } from "helpers/smoothScroll";

const MESSAGE_ERROR = "Whoops, something went wrong:";

/**
 * Image Search Gallery Application root component.
 * @returns {React.Component}
 */
export class App extends React.Component {
  static IMG_PER_PAGE = 12;
  static SMOOTH_SCROLL_DURATION = 500;


  defaultState = {
    searchQuery: "",
    images: null,
    isLoading: false,
    hasLoadMore: false,
    page: 1,
    modal: {
      isShowModal: false,
      imageId: null,
      placeholderUrl: null,
      largeImageURL: null,
    },
    error: null,
    scrollOffsetOnLoadMore: null,
  };

  state = { ...this.defaultState };

  /**
   * Loads critically necessary images.
   */
  componentDidMount() {
    loadCriticalImages();
  }

  /**
   * Handles update
   * 
   * Condition 'this.state.error && prevState.error' helps to mitigate cases, 
   * when error occures and allow subsequent submit of the same search request again
   * (e.g. network error or unstable connection) without reloading the page.
   * @param {object} _ Blank for previous props.
   * @param {object} prevState Previous component state.
   */
  componentDidUpdate(_, prevState) {
    if (this.state.page !== prevState.page 
      || this.state.searchQuery !== prevState.searchQuery
      || (this.state.error && prevState.error)) {
      if (this.state.searchQuery !== prevState.searchQuery) {
        this.setState({ images: this.defaultState.images });
      }
      this.searchForImages();
    }
    
    const input = document.getElementById("query");
    if ((this.state.images && document.activeElement === input) 
        || this.state.error) {
      input.blur();
    }

    if (prevState.modal.isShowModal !== this.state.modal.isShowModal) {
      document.documentElement.style.overflowY = this.state.modal.isShowModal ? "hidden" : "";
    }
  }

  /**
   * Handles errors in child components.
   * @param {object} error The error that was thrown.
   */
  componentDidCatch(error) {
    this.setState({ error: error });
  }

  /**
   * Handles update of search query value.
   * @param {string} searchQuery Search query.
   */
  handleImageSearch = (searchQuery) => {
    this.setState({ searchQuery });
  }

  /**
   * Serches for images by invoking api.
   */
  searchForImages = async () => {
    try {
      this.setState({ isLoading: true, error: this.defaultState.error });
      const data = await getImagesApi(this.state.searchQuery, this.state.page, App.IMG_PER_PAGE);
      const images = this.state.images && this.state.images.length > 0 ? [...this.state.images, ...data.hits] : data.hits;
      const hasLoadMore = this.state.page < Math.ceil(data.totalHits / App.IMG_PER_PAGE);
      
      this.setState({
        images,
        hasLoadMore,
      });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  }

  /**
   * Handles load of more images.
   */
  handleLoadMore = () => {
    this.setState({
      page: this.state.page + 1,
      scrollOffsetOnLoadMore: document.getElementById("image-gallery").offsetHeight,
    });
  }

  /**
   * Scrolls to the start of newly loaded images.
   */
  scrollToNewImages = () => {
    if (document.documentElement.scrollTop > 0) {
      smoothScroll(App.SMOOTH_SCROLL_DURATION, this.state.scrollOffsetOnLoadMore + 16);
      this.setState({
        scrollOffsetOnLoadMore: null,
      });
    }
  }

  /**
   * Handles modal widnow opening.
   * @param {string} imageId Id of the image.
   */
  handleOpenModal = (imageId) => {
    const { webformatURL: placeholderUrl = imgNoImage,
            largeImageURL,
            tags: altText }
    = this.state.images.find(({ id }) => id === Number(imageId));

    this.setState({
      modal: {
        isShowModal: true,
        placeholderUrl,
        largeImageURL,
        altText
      },
    });
  }

  /**
   * Hadnles modal window close.
   */
  handleCloseModal = () => {
    this.setState({
      modal: {
      ...this.defaultState.modal,
    },
    });
  }

  render() {
    const { images, error, isLoading, hasLoadMore } = this.state;
    return (
      <div className={css.app}>
        <Searchbar onSearch={this.handleImageSearch} />
        {error && <Message>
                    <img className={css["image-error"]} src={imgError} alt="error background"></img>
                    <p>{MESSAGE_ERROR}</p>
                    <p>"{error.message}"</p>
                  </Message>
        }
        {!error && <ImageGallery
                      className="hello"
                      images={this.state.images}
                      page={this.state.page}
                      isLoading={isLoading}
                      hasLoadMore={hasLoadMore}
                      onLoadMore={this.handleLoadMore}
                      onUpdate={this.scrollToNewImages}
                      onImageClick={this.handleOpenModal}
                    />
        }
        {!error && images && images.length > 0 && <ApiReference />}
        {!error && this.state.modal.isShowModal && <Modal
                                                      objectFit={Modal.ObjectFit.CONTAIN}
                                                      placeholderUrl={this.state.modal.placeholderUrl}
                                                      largeImageURL={this.state.modal.largeImageURL}
                                                      altText={this.state.modal.altText}
                                                      oncloseModal={this.handleCloseModal}
                                                    />
        }
      </div>
    );
  }
};
