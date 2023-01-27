import { fetchImages } from './fetch';
import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGalleryList } from './Gallery/ImageGalleryList';
import { ImageGalleryItem } from './Gallery/ImageGalleryItem';
import { LoadMoreButton } from './LoadMoreButton/LoadMoreButton';
import Notiflix from 'notiflix';
import { Audio } from 'react-loader-spinner';

let pageNumber = 1;

export class App extends Component {
  state = {
    images: [],
    currentSearch: '',
    isLoading: false,
  };

  onFormSubmitFetch = data => {
    this.setState({ currentSearch: data, isLoading: true });

    fetchImages(data, pageNumber)
      .then(foundData => {
        if (foundData.hits == 0) {
          Notiflix.Notify.failure('There is no images');
        } else {
          Notiflix.Notify.success(
            `Hooray, we found ${foundData.total} images!`
          );
          pageNumber++;
          this.setState({ images: foundData.hits, isLoading: false });
        }
      })
      .catch(error => {
        console.log(error);
      });
    pageNumber++;
  };

  loadMore = () => {
    this.setState({ isLoading: true });
    const data = this.state.currentSearch;
    // console.log('search value now -', data);
    fetchImages(data, pageNumber)
      .then(foundData => {
        pageNumber++;
        this.setState(prevState => ({
          images: [...prevState.images, ...foundData.hits],
          isLoading: false,
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
          <ImageGalleryItem images={this.state.images} />
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