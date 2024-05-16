import React from "react";
import css from "./SearchForm.module.css";

/**
 * Form to submit search query.
 * @returns {React.Component}
 */
export class SearchForm extends React.Component {

  componentDidMount() { 
    const input = document.getElementById("query");
    input.focus();
   }

  handleSubmit = (event) => {
    event.preventDefault();
    const searchQuery = event.target.query.value;
    this.props.submit(searchQuery);
  }
  
  render() {
    return (
    <form className={css.form} onSubmit={this.handleSubmit}>
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
  )}
}
