import { useEffect, useState } from 'react';

import { getBreedList, getBreedImage } from './api/useDataApi';
import { saveLike } from './api/useFireStore';

import {
  FeedContainer,
  ImageContainer,
  ImageCard,
  FeedButtonContainer,
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
  src: string;
}

export const Feed = ({ selectedBreeds }: FeedProps) => {
  const username = useSelector((state: RootState) => selectUsername(state));

  const [imageSources, setImageSources] = useState<ImageSource[]>([]);
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

  const handleLikeClicked = async () => {
    const currentSource = imageSources[currentIndex];
    if (username)
      await saveLike(username, currentSource.breed, currentSource.src);

    const newSrc = await fetchBreedImage(currentSource.breed);

    setImageSources((prevSources) =>
      prevSources.map((source, index) =>
        index === currentIndex ? { ...source, src: newSrc } : source,
      ),
    );

    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageSources.length);
  };

  const handleUnlikeClicked = async () => {
    const currentSource = imageSources[currentIndex];

    const newSrc = await fetchBreedImage(currentSource.breed);

    setImageSources((prevSources) =>
      prevSources.map((source, index) =>
        index === currentIndex ? { ...source, src: newSrc } : source,
      ),
    );

    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageSources.length);
  };

  if (imageSources.length === 0) return null;

  return (
    <FeedContainer>
      {/* {imageSources.map((obj, index) => (
        <ImageContainer>
          <ImageCard>
            <img
              key={index}
              src={obj.src}
              alt={`Image ${index + 1}`}
              height={200}
              width={200}
              sizes="stretch"
            />
          </ImageCard>
          <PrimaryButton
            style={{ width: '100%' }}
            onClick={() => handleLikeClicked(obj)}
          >
            Like
          </PrimaryButton>
        </ImageContainer>
      ))} */}

      <ImageContainer>
        <ImageCard>
          <img
            src={imageSources[currentIndex].src}
            height={400}
            width={400}
            alt={`Breed: ${imageSources[currentIndex].breed}`}
          />
        </ImageCard>
        <h3>{imageSources[currentIndex].breed}</h3>

        <FeedButtonContainer>
          <SecondaryButton
            style={{ width: '40%' }}
            onClick={handleUnlikeClicked}
          >
            Nope
          </SecondaryButton>

          <PrimaryButton style={{ width: '40%' }} onClick={handleLikeClicked}>
            Like
          </PrimaryButton>
        </FeedButtonContainer>
      </ImageContainer>
    </FeedContainer>
  );
};

export default Feed;
