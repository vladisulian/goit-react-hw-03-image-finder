import { fetchImages } from './fetch';
import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGalleryList } from './Gallery/ImageGalleryList';
import { ImageGalleryItem } from './Gallery/ImageGalleryItem';
import Notiflix from 'notiflix';
export class App extends Component {
  state = {
    images: [],
  };

  // async componentDidUpdate() {
  //   try {
  //     const images = await fetchImages();
  //     this.setState({ images });
  //     console.log('state is updated');
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  onFormSubmitFetch = data => {
    console.log('data from APP', data);
    let pageNumber = 1;
    fetchImages(data, pageNumber).then(foundData => {
      this.setState({ images: foundData });
    });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.onFormSubmitFetch} />;
        <ImageGalleryList>
          <ImageGalleryItem />
        </ImageGalleryList>
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
