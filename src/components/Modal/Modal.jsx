import React from "react";
import PropTypes from "prop-types";

import css from "./Modal.module.css";
import noImage from "images/critical/no-image.svg"

/**
 * Modal window with overlay which displays a larger version of image.
 * 
 * @param {Modal.ObjectFit = Modal.ObjectFit.COVER} objectFit Type of image fit.
 * @param {string = noImage} placeholderUrl Link to placeholder image to be shown before large image.
 * @param {string = noImage} largeImageURL Large image with better quality.
 * @param {string} altText Alternative text for the large image.
 * @package {callback} oncloseModal Callback function for modal window close

* @returns {React.Component}
 */
export class Modal extends React.Component {
  /**
   * Enum for image object fit.
   * @readonly
   * @enum {string}
   */
  static ObjectFit = Object.freeze({
    COVER:   "cover",       // shows image that will filled im and part of it will be cropped to maintain aspect ratio
    CONTAIN:  "contain",    // shows image with original aspect ratio
  });

  componentDidMount() {
    window.addEventListener("keyup", this.handleKeyPress);
  }
  
  componentWillUnmount() {
    window.removeEventListener("keyup", this.handleKeyPress);
  }

  /**
   * Handles keyboard press.
   * @param {React.SyntheticEvent} event Occured event.
   */
  handleKeyPress = event => {
    if (event.code === "Escape") {
      this.props.oncloseModal();
    }
  };

  /**
   * Handle modal window close.
   * @param {React.SyntheticEvent} event Occured event.
   */
  handleModalClose = event => {
    if(event.target === event.currentTarget) {
      this.props.oncloseModal();
    }
  }

  render() {
    const {
      objectFit = Modal.ObjectFit.COVER,
      placeholderUrl = noImage,
      largeImageURL = noImage,
      altText = "large image",
    } = this.props;
    return (
      <div className={css.overlay} onClick={this.handleModalClose} title={`Click to zoom-out`}>
        <div className={css[`modal-${objectFit}`]}>
          <img
            id="image"
            className={css.image}
            src={largeImageURL}
            alt={altText}
            title={altText}
            style={{ backgroundImage: `url(${placeholderUrl}), url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAmklEQVR42u3QMREAMAgAMVCKNVDa1kFXhryCv+R5xeJmZvNeJECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQ4BLA7l4NWFUAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAA/13d5oqYpYEYIgAAAABJRU5ErkJggg==)` }}
          />
        </div>
      </div>
    )
  }
}

Modal.propTypes = {
  objectFit: PropTypes.string,
  placeholderUrl: PropTypes.string, 
  largeImageURL: PropTypes.string,
  altText: PropTypes.string,
  oncloseModal: PropTypes.func.isRequired,
}