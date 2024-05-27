import { useEffect, useState } from 'react';

import { getBreedList, getBreedImage } from './api/useDataApi';
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

export const Feed = ({ selectedBreeds }: FeedProps) => {
  const username = useSelector((state: RootState) => selectUsername(state));

  const [imageSources, setImageSources] = useState<ImageSource[]>([]);
  const [sources, setSources] = useState<string[]>([]);
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

    console.log(selectedBreeds);
    fetchImageSources();
  }, [selectedBreeds]);

  useEffect(() => {
    {
      imageSources.map((obj) =>
        obj.src.map((data, index) => console.log(data)),
      );
    }
  }, [imageSources]);

  const fetchBreedImage = async (breed: string) => {
    const img = await getBreedImage(breed);

    return img;
  };

  // const handleLikeClicked = async (obj: ImageSource) => {
  //   if (username) await saveLike(username, obj.breed, obj.src);

  //   const src = await fetchBreedImage(obj.breed);

  //   setImageSources((prevSources) =>
  //     prevSources.map((source) =>
  //       source.breed === obj.breed ? { ...source, src: src } : source,
  //     ),
  //   );
  // };

  const handleLikeClicked = async (breed: string, src: string) => {
    const currentSource = imageSources[currentIndex];
    if (username) await saveLike(username, breed, src);

    const newSrc = await fetchBreedImage(currentSource.breed);

    setImageSources((prevSources) =>
      prevSources.map((source, index) =>
        index === currentIndex ? { ...source, src: newSrc } : source,
      ),
    );

    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageSources.length);
  };

  // const handleUnlikeClicked = async () => {
  //   const currentSource = imageSources[currentIndex];

  //   const newSrc = await fetchBreedImage(currentSource.breed);

  //   setImageSources((prevSources) =>
  //     prevSources.map((source, index) =>
  //       index === currentIndex ? { ...source, src: newSrc } : source,
  //     ),
  //   );

  //   setCurrentIndex((prevIndex) => (prevIndex + 1) % imageSources.length);
  // };

  // if (imageSources.length === 0) return null;

  return (
    <FeedContainer>
      {imageSources.map((obj) =>
        obj.src.map((data, index) => (
          <ImageContainer key={index}>
            <ImageCard>
              <ImageElement
                src={data}
                alt={`Image ${index + 1}`}
                sizes="stretch"
              />
              <ImageOverlay className="image-overlay">
                <Description className="description">{obj.breed}</Description>
                <LikeButton
                  className="like-button"
                  onClick={() => handleLikeClicked(obj.breed, data)}
                >
                  Like
                </LikeButton>
              </ImageOverlay>
            </ImageCard>
          </ImageContainer>
        )),
      )}
    </FeedContainer>
  );
};

export default Feed;
