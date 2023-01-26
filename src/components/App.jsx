import { fetchImages } from './fetch';
import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGalleryList } from './Gallery/ImageGalleryList';
import { ImageGalleryItem } from './Gallery/ImageGalleryItem';
import { LoadMoreButton } from './LoadMoreButton/LoadMoreButton';
import Notiflix from 'notiflix';
export class App extends Component {
  state = {
    images: [],
  };

  onFormSubmitFetch = data => {
    console.log('data from APP', data);
    let pageNumber = 1;
    if (data !== '') {
      fetchImages(data, pageNumber)
        .then(foundData => {
          if (foundData.hits == 0) {
            Notiflix.Notify.failure('There is no images');
          } else {
            Notiflix.Notify.success(
              `Hooray, we found ${foundData.total} images!`
            );
            pageNumber++;
            this.setState({ images: foundData.hits });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.onFormSubmitFetch} />;
        <ImageGalleryList>
          <ImageGalleryItem images={this.state.images} />
        </ImageGalleryList>
        {this.state.images.length >= 12 && <LoadMoreButton />}
      </>
    );
  }
}
