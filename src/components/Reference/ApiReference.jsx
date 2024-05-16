import pixabayLogo from "images/pixabay-logo.svg";
import css from "./ApiReference.module.css";

/**
 * API reference information.
 * @returns {React.Component}
 */
export const ApiReference = () => (
  <section className={css["reference-bar"]}>
    Powered by:
    <PixabayRef />
  </section>
);

/**
 * Reference to Pixabay API as requested in return for free API usage.
 * https://pixabay.com/api/docs/
 * @returns {React.Component}
 */
const PixabayRef = () => (
    <div className={css["reference-wrapper"]}>
    <a
      className={css.pixabay}
      href="https://pixabay.com/api/docs/"
      title="Pixabay royalty-free content"
      target="_blank"
      rel="noopener noreferrer"
    >
        <i className={css["image-wrapper"]}>
          <img className={css.logo} src={pixabayLogo} alt="pixabay logo" />
        </i>
        Free Images
    </a>
    </div>
);
