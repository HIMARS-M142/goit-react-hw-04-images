import React, { useEffect, useState } from 'react';

import { Searchbar } from './Searchbar/Searchbar';
import { getSearchApi } from 'api/apiGallery';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { RotatingLines } from 'react-loader-spinner';
import css from './Styles.module.css';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [modalImage, setModalImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [buttonShow, setButtonShow] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);
      try {
        const { hits, total } = await getSearchApi(searchValue, currentPage);
        setImages(prev => {
          return [...prev, ...hits];
        });
        setButtonShow(true);

        if (total < 12 || hits.length < 12) {
          setButtonShow(false);
        }
      } catch (error) {
        alert(error);
      } finally {
        setIsLoading(false);
      }
    };
    searchValue && currentPage && fetchImages();
  }, [searchValue, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
    setImages([]);
  }, [searchValue]);

  const onInputFind = value => {
    setSearchValue(value);
  };

  const onLoadMoreClick = () => {
    setCurrentPage(prev => {
      return prev + 1;
    });
  };
  const onImageClick = e => {
    if (e.target !== e.currentTarget) {
      setModalImage(e.target.alt);
      setModalIsOpen(true);
    }
  };
  const onBackdropClose = e => {
    if (e.target === e.currentTarget) {
      setModalIsOpen(false);
    }
  };
  const onEscClose = e => {
    if (e.code !== 'Escape') {
      return;
    }

    setModalIsOpen(false);
  };
  return (
    <div className={css.App}>
      {modalIsOpen && (
        <Modal
          onBackdropClose={onBackdropClose}
          modalImage={modalImage}
          onEscClose={onEscClose}
        />
      )}
      <Searchbar onFind={onInputFind} />
      <ImageGallery images={images} onImageClick={onImageClick} />
      {isLoading && (
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
      )}
      {buttonShow && <Button onLoadMoreClick={onLoadMoreClick} />}
    </div>
  );
};

// export class App extends Component {
//   state = {
//     isLoading: false,
//     images: [],
//     searchValue: '',
//     currentPage: 1,
//     modalImage: '',
//     buttonShow: false,
//   };
//   onInputFind = value => {
//     setState({ searchValue: value });
//   };

//   componentDidUpdate(_, prevState) {
//     if (prevState.searchValue !== this.state.searchValue) {
//       this.setState({ currentPage: 1, images: [] });
//     }
//     if (
//       prevState.searchValue !== this.state.searchValue ||
//       prevState.currentPage !== this.state.currentPage
//     ) {
//       this.fetchImages();
//     }
//   }

//   fetchImages = async () => {
//     this.setState({
//       isLoading: true,
//     });

//     try {
//       const { hits, total } = await getSearchApi(
//         this.state.searchValue,
//         this.state.currentPage
//       );

//       this.setState(prev => ({ images: [...prev.images, ...hits] }));
//       this.setState({
//         buttonShow: true,
//       });

//       if (total < 12 || hits.length < 12) {
//         this.setState({ buttonShow: false });
//       }
//     } catch (error) {
//       alert(error);
//     } finally {
//       this.setState({ isLoading: false });
//     }
//   };
//   onLoadMoreClick = () => {
//     this.setState(prev => ({
//       currentPage: prev.currentPage + 1,
//     }));
//   };
//   onImageClick = e => {
//     if (e.target !== e.currentTarget) {
//       this.setState({
//         modalImage: e.target.alt,
//         modalIsOpen: true,
//       });
//     }
//   };
//   onBackdropClose = e => {
//     if (e.target === e.currentTarget) {
//       this.setState({ modalIsOpen: false });
//     }
//   };
//   onEscClose = e => {
//     if (e.code !== 'Escape') {
//       return;
//     }

//     this.setState({ modalIsOpen: false });
//   };
//   render() {
//     return (
//       <div className={css.App}>
//         {this.state.modalIsOpen && (
//           <Modal
//             onBackdropClose={this.onBackdropClose}
//             modalImage={this.state.modalImage}
//             onEscClose={this.onEscClose}
//           />
//         )}
//         <Searchbar onFind={this.onInputFind} />
//         <ImageGallery
//           images={this.state.images}
//           onImageClick={this.onImageClick}
//         />
//         {this.state.isLoading && (
//           <RotatingLines
//             strokeColor="grey"
//             strokeWidth="5"
//             animationDuration="0.75"
//             width="96"
//             visible={true}
//           />
//         )}
//         {this.state.buttonShow && (
//           <Button onLoadMoreClick={this.onLoadMoreClick} />
//         )}
//       </div>
//     );
//   }
// }
