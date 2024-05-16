import PropTypes from "prop-types";

import { SearchForm } from "components/SearchForm/SearchForm";
import css from "./Searchbar.module.css";

/**
 * Searchbar that contains form to search for images.
 * @param {callback} props.onSearch Function to handle search.
 * @returns {React.Component}
 */
export const Searchbar = ({onSearch}) => (
  <header className={css.searchbar}>
    <SearchForm submit={onSearch} />
  </header>
);

Searchbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
}