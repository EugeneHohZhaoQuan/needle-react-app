import { useEffect, useState } from 'react';

import { getBreedImage, getBreedOnlyImage } from '../../api/useDataApi';
import { saveLike } from '../../api/useFireStore';

import {
  FeedContainer,
  ImageContainer,
  ImageCard,
  LikeButton,
  ImageOverlay,
  Description,
  ImageElement,
  ToggleContainer,
  ToggleButton,
  ListContainer,
  TextContainer,
} from './Feed.styles';

import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { selectUsername } from '../../store/userSlice';

import gridIcon from '../../assets/grid.svg';
import flatIcon from '../../assets/flat.svg';
import heartIcon from '../../assets/heart.svg';

interface FeedProps {
  selectedBreeds: string[];
}

interface ImageSource {
  breed: string;
  src: string[];
}

interface Source {
  no: string;
  breed: string;
  src: string;
}

export const Feed = ({ selectedBreeds }: FeedProps) => {
  const username = useSelector((state: RootState) => selectUsername(state));

  const [imageSources, setImageSources] = useState<ImageSource[]>([]);

  const [sources, setSources] = useState<Source[]>([]);
  const [listSources, setListSources] = useState<Source[]>([]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const [type, setType] = useState('grid');

  const fetchImageSources = async () => {
    const sources = await Promise.all(
      selectedBreeds.map(async (breed) => ({
        breed,
        src: await fetchBreedImage(breed),
      })),
    );

    setImageSources(sources);
  };

  useEffect(() => {
    fetchImageSources();
  }, [selectedBreeds]);

  useEffect(() => {
    let i = 0;

    function shuffleArray(array: any) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    const result = imageSources.flatMap((item) =>
      item.src.map((src) => ({
        no: i++,
        breed: item.breed,
        src: src,
      })),
    );

    let flattenedResult = imageSources.flatMap((item: any) =>
      item.src.map((src: string) => ({
        breed: item.breed,
        src: src,
      })),
    );
    // Shuffle the array to mix breeds
    flattenedResult = flattenedResult.sort(() => Math.random() - 0.5);

    let j = 1;
    const sourcesWithNo = flattenedResult.map((item) => ({
      no: j++,
      ...item,
    }));

    setListSources(sourcesWithNo);
    setSources(shuffleArray(result));
  }, [imageSources]);

  const fetchBreedImage = async (breed: string) => {
    const img = await getBreedImage(breed);

    return img;
  };

  const fetchOnlyBreedImage = async (breed: string) => {
    const img = await getBreedOnlyImage(breed);

    return img;
  };

  const handleLikeClicked = async (
    breed: string,
    src: string,
    data: Source,
  ) => {
    const currentSource = imageSources[currentIndex];
    if (username) await saveLike(username, breed, src);

    const newSrc = await fetchOnlyBreedImage(currentSource.breed);

    setSources((prev) =>
      prev.map((prevData) =>
        prevData.no === data.no ? { ...prevData, src: newSrc } : prevData,
      ),
    );
  };

  const handleListLike = async () => {
    if (username)
      await saveLike(
        username,
        listSources[currentIndex].breed,
        listSources[currentIndex].src,
      );

    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  useEffect(() => {
    if (type === 'list' && currentIndex === listSources.length) {
      setCurrentIndex(0);
      fetchImageSources();
    }
  }, [currentIndex]);

  const handleReload = () => {
    // e.preventDefault();
    fetchImageSources();
    window.scrollTo(0, 0);
  };

  return (
    <>
      <ToggleContainer>
        <ToggleButton active={type === 'grid'} onClick={() => setType('grid')}>
          <img src={gridIcon} alt="Settings Icon" />
        </ToggleButton>
        <ToggleButton active={type === 'list'} onClick={() => setType('list')}>
          <img src={flatIcon} alt="Settings Icon" />
        </ToggleButton>
      </ToggleContainer>

      {type === 'grid' && (
        <div>
          <FeedContainer>
            {sources.map((obj, index) => (
              <ImageContainer key={index}>
                <ImageCard>
                  <ImageElement
                    src={obj.src}
                    alt={`Image ${index + 1}`}
                    sizes="stretch"
                  />
                  <ImageOverlay className="image-overlay">
                    <Description
                      className="description"
                      style={{ cursor: 'default' }}
                    >
                      {obj.breed}
                    </Description>
                    <LikeButton
                      className="like-button"
                      onClick={() => handleLikeClicked(obj.breed, obj.src, obj)}
                    >
                      <img src={heartIcon} alt="Heart Icon" />
                    </LikeButton>
                  </ImageOverlay>
                </ImageCard>
              </ImageContainer>
            ))}
          </FeedContainer>
          <TextContainer>
            you have reached the end, click
            <a href="#" onClick={handleReload} style={{ margin: '0 5px' }}>
              {' '}
              reload{' '}
            </a>
            to load more
          </TextContainer>
        </div>
      )}
      {type === 'list' && listSources.length > 0 && (
        <ListContainer>
          <ImageContainer>
            <ImageCard>
              <ImageElement
                style={{ height: '400px' }}
                src={listSources[currentIndex]?.src}
                alt={`Image ${currentIndex + 1}`}
                sizes="fill"
              />
              <LikeButton
                className="like-button"
                style={{ left: '20%' }}
                onClick={() => setCurrentIndex((prevIndex) => prevIndex + 1)}
              >
                Next
              </LikeButton>
              <LikeButton
                className="like-button"
                onClick={() => handleListLike()}
              >
                <img src={heartIcon} alt="Heart Icon" />
              </LikeButton>
            </ImageCard>
          </ImageContainer>
        </ListContainer>
      )}
    </>
  );
};

export default Feed;
