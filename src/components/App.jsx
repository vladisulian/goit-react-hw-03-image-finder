import { fetchImages } from './fetch';
import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGalleryList } from './Gallery/ImageGalleryList';
import { ImageGalleryItem } from './Gallery/ImageGalleryItem';
import { LoadMoreButton } from './LoadMoreButton/LoadMoreButton';
import { Modal } from './Modal/Modal';
import Notiflix from 'notiflix';
import { Audio } from 'react-loader-spinner';

let pageNumber = 1;

export class App extends Component {
  state = {
    images: [],
    currentSearch: '',
    isLoading: false,
    showModal: false,
    modalImage: null,
    page: 1,
  };

  async componentDidUpdate(prevState) {
    console.log('component did update');
    console.log(prevState.page);
    if (
      prevState.page !== this.state.page ||
      prevState.currentSearch !== this.state.currentSearch
    ) {
      fetchImages(this.state.currentSearch, this.state.page)
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
    }
  }
  onFormSubmitFetch = data => {
    this.setState({
      images: [],
      currentSearch: data,
      isLoading: false,
      showModal: false,
      modalImage: null,
      page: 1,
    });
  };

  loadMore = () => {
    this.setState(prevState => {
      prevState.page++;
    });
    const data = this.state.currentSearch;
    // console.log('search value now -', data);
    // fetchImages(data, pageNumber)
    //   .then(foundData => {
    //     pageNumber++;
    //     this.setState(prevState => ({
    //       images: [...prevState.images, ...foundData.hits],
    //       isLoading: false,
    //     }));
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
    // pageNumber++;
  };

  toggleModal = modalImage => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
      modalImage: null,
    }));
    if (modalImage) {
      this.setState({ modalImage });
      console.log(modalImage);
    }
  };

  render() {
    const loader = document.querySelector('[data-testid="audio-loading"]');
    if (loader) {
      console.log(loader);
      loader.classList.add('loader');
    }

    return (
      <div className="ImageGalleryFind">
        <Searchbar onSubmit={this.onFormSubmitFetch} />
        <ImageGalleryList>
          <ImageGalleryItem
            images={this.state.images}
            onClick={this.toggleModal}
          />
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
        {this.state.showModal && (
          <Modal
            onClose={this.toggleModal}
            children={
              <img
                src={this.state.modalImage.webformatURL}
                alt={this.state.modalImage.tags}
              />
            }
          ></Modal>
        )}
        {this.state.images.length >= 12 && (
          <LoadMoreButton loadMore={this.loadMore} />
        )}
      </div>
    );
  }
}
