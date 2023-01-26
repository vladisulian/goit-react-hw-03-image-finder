import { fetchImages } from './fetch';
import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
export class App extends Component {
  state = {
    searchbar: '',
  };
  handleChange = e => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };
  render() {
    return <Searchbar />;
  }
}

{
  /* <div>
<input
  type="text"
  name="searchbar"
  value={this.state.searchbar}
  onChange={this.handleChange}
/>
<button
  type="submit"
  onClick={() => {
    fetchImages(this.state.searchbar);
  }}
>
  Send request
</button>
</div> */
}
