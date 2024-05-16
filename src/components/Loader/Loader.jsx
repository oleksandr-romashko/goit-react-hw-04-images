import { ThreeDots } from "react-loader-spinner";
import css from "./Loader.module.css";

/**
 * Spinner component, displays while images are being loaded. 
 * @returns {React.Component}
 */

export const Loader = () => (
  <ThreeDots
    visible={true}
    height="40"
    width="100"
    color="#3f51b5"
    radius="9"
    ariaLabel="three-dots-loading"
    wrapperClass={css.loader}
  />
);