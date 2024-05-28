import { useEffect, useState } from 'react';
import { getUserLikes } from './api/useFireStore';

import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import { selectUsername } from './store/userSlice';

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

interface Source {
  breed: string;
  src: string;
}

export const Favourite = () => {
  const username = useSelector((state: RootState) => selectUsername(state));

  const [sources, setSources] = useState<Source[]>([]);

  useEffect(() => {
    fetchLikedImages();
  }, []);

  const fetchLikedImages = async () => {
    const result = await getUserLikes(username ?? '');

    if (result) {
      const formattedData: Source[] = result.map((item: any) => ({
        breed: item.breed,
        src: item.src,
      }));
      setSources(formattedData);
    }
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
            </ImageOverlay>
          </ImageCard>
        </ImageContainer>
      ))}
    </FeedContainer>
  );
};

export default Favourite;
