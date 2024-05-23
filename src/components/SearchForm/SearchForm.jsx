import { useEffect } from "react";
import PropTypes from "prop-types";
import css from "./SearchForm.module.css";

/**
 * Form for search query.
 * @param {callback} props.submit Callback for form submittal.
 * @returns {React.Component}
 */
export const SearchForm = ({submit}) => {
  /**
   * At app load focus on imput element.
   */
  useEffect(() => {
    const input = document.getElementById("query");
    input.focus();
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    const searchQuery = event.target.query.value;
    submit(searchQuery);
  }

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <button type="submit" className={css.button}>
        <span className={css['button-label']}>Search</span>
      </button>
      
      <input
        id="query"
        className={css.input}
        name="query"
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
        required
      />
    </form>
  )
}

SearchForm.propTypes = {
  submit: PropTypes.func.isRequired,
};