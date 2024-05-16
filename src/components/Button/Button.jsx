import { Loader } from "components";
import css from "./Button.module.css";

/**
 * Button to load the next batch of Images to render them with the previous ones.
 * The button is rendered only when there are some loaded images.
 * If the image array is empty, the button is not rendered.
 * @returns {React.Component}
 */
export const Button = ({ isLoading, onClick }) => (
  <>
  <div className={css["button-wrapper"]}>
    {isLoading ? <Loader /> : <button className={css.button} onClick={onClick}>Load more</button>}
  </div>
  </>
);