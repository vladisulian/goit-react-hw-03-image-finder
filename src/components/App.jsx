import { fetchImages } from './fetch';
import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
export class App extends Component {
  onFormSubmitFetch = data => {
    let pageNumber = 1;
    console.log('data from APP', data);
    fetchImages(data, 1);
  };
  render() {
    return (
      <>
        <Searchbar onSubmit={this.onFormSubmitFetch} />;
        <ImageGallery />
      </>
    );
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
