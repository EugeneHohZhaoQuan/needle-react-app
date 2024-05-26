import { useEffect, useState } from 'react';

import { getBreedList, getBreedImage } from './api/useDataApi';
import { saveLike } from './api/useFireStore';

import { FeedContainer, ImageCard } from './Feed.styles';
import { PrimaryButton } from './button.styles';

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

  const handleLikeClicked = async (obj: ImageSource) => {
    if (username) await saveLike(username, obj.breed, obj.src);

    const src = await fetchBreedImage(obj.breed);

    setImageSources((prevSources) =>
      prevSources.map((source) =>
        source.breed === obj.breed ? { ...source, src: src } : source,
      ),
    );
  };

  return (
    <FeedContainer>
      {imageSources.map((obj, index) => (
        <ImageCard>
          <img
            key={index}
            src={obj.src}
            alt={`Image ${index + 1}`}
            height={200}
            width={200}
          />
          <PrimaryButton
            style={{ width: '100%' }}
            onClick={() => handleLikeClicked(obj)}
          >
            Like
          </PrimaryButton>
        </ImageCard>
      ))}
    </FeedContainer>
  );
};

export default Feed;
