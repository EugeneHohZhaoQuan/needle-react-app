import { useEffect, useState } from 'react';

import {
  getBreedList,
  getBreedImage,
  getBreedOnlyImage,
} from './api/useDataApi';
import { saveLike } from './api/useFireStore';

import {
  FeedContainer,
  ImageContainer,
  ImageCard,
  FeedButtonContainer,
  LikeButton,
  ImageOverlay,
  Description,
  ImageElement,
} from './Feed.styles';
import { PrimaryButton, SecondaryButton } from './button.styles';

import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import { selectUsername } from './store/userSlice';

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
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchImageSources = async () => {
      const sources = await Promise.all(
        selectedBreeds.map(async (breed) => ({
          breed,
          src: await fetchBreedImage(breed),
        })),
      );

      setImageSources(sources);
    };

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

    const result = imageSources.flatMap((item, index) =>
      item.src.map((src) => ({
        no: i++,
        breed: item.breed,
        src: src,
      })),
    );

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
      prev.map((prevData, index) =>
        prevData.no === data.no ? { ...prevData, src: newSrc } : prevData,
      ),
    );

    // setImageSources((prevSources) =>
    //   prevSources.map((source, index) =>
    //     index === currentIndex ? { ...source, src: newSrc } : source,
    //   ),
    // );

    // setCurrentIndex((prevIndex) => (prevIndex + 1) % imageSources.length);
  };

  return (
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
                Like
              </LikeButton>
            </ImageOverlay>
          </ImageCard>
        </ImageContainer>
      ))}
    </FeedContainer>
  );
};

export default Feed;
