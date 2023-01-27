import { fetchImages } from './fetch';
import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGalleryList } from './Gallery/ImageGalleryList';
import { ImageGalleryItem } from './Gallery/ImageGalleryItem';
import { LoadMoreButton } from './LoadMoreButton/LoadMoreButton';

import { Audio } from 'react-loader-spinner';

import Notiflix from 'notiflix';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
let gallerySimpleLightbox = new SimpleLightbox('.lightbox-a', {});
let pageNumber = 1;

export class App extends Component {
  state = {
    images: [],
    currentSearch: '',
    isLoading: false,
  };

  onFormSubmitFetch = data => {
    this.setState({ currentSearch: data });
    pageNumber = 1;

    fetchImages(data, pageNumber)
      .then(foundData => {
        if (foundData.hits === 0) {
          Notiflix.Notify.failure('There is no images');
        } else {
          Notiflix.Notify.success(
            `Hooray, we found ${foundData.total} images!`
          );
          console.log(foundData);
          gallerySimpleLightbox.refresh();

          this.setState({ images: foundData.hits });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  loadMore = () => {
    const data = this.state.currentSearch;
    // console.log('search value now -', data);
    fetchImages(data, pageNumber)
      .then(foundData => {
        pageNumber++;
        this.setState(prevState => ({
          images: [...prevState.images, ...foundData.hits],
        }));
      })
      .catch(error => {
        console.log(error);
      });
    pageNumber++;
  };

  render() {
    return (
      <div className="ImageGalleryFind">
        <Searchbar onSubmit={this.onFormSubmitFetch} />;
        <ImageGalleryList>
          <ImageGalleryItem images={this.state.images} />;
        </ImageGalleryList>
        {this.state.isLoading && (
          <Audio
            height="80"
            width="80"
            radius="9"
            color="orange"
            ariaLabel="loading"
            wrapperStyle
            wrapperClassName
          />
        )}
        {this.state.images.length >= 12 && (
          <LoadMoreButton loadMore={this.loadMore} />
        )}
      </div>
    );
  }
}
