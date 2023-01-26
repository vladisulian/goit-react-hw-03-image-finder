import { fetchImages } from './fetch';
import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGalleryList } from './Gallery/ImageGalleryList';
import { ImageGalleryItem } from './Gallery/ImageGalleryItem';
import { LoadMoreButton } from './LoadMoreButton/LoadMoreButton';
import Notiflix from 'notiflix';
let pageNumber = 1;

export class App extends Component {
  state = {
    images: [],
    currentSearch: '',
  };

  onFormSubmitFetch = data => {
    if (data !== '') {
      this.setState({ currentSearch: data });

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
      pageNumber++;
    } else {
      Notiflix.Notify.warning('Please, enter text');
    }
  };

  loadMore = () => {
    const data = this.state.currentSearch;
    console.log('search value now -', data);
    fetchImages(data, pageNumber)
      .then(foundData => {
        Notiflix.Notify.success(`Hooray, we found ${foundData.total} images!`);

        pageNumber++;
        this.setState(prevState => ({
          images: prevState.images.concat(foundData.hits),
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
        {this.state.images.length >= 12 && (
          <LoadMoreButton loadMore={this.loadMore} />
        )}
      </div>
    );
  }
}
