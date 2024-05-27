import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from './store/store';
import { selectUsername } from './store/userSlice';

import { getBreedList, getBreedImage } from './api/useDataApi';
import { getFavoritedBreeds, saveFavoritedBreeds } from './api/useFireStore';

import {
  DashboardContainer,
  CheckboxGrid,
  CheckboxInput,
  CheckboxItem,
} from './Dashboard.styles';

import { PrimaryButton } from './button.styles';

import Feed from './Feed';

export const Dashboard = () => {
  const username = useSelector((state: RootState) => selectUsername(state));

  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [imageSources, setImageSources] = useState<string[]>([]);
  const [checkBoxFlag, setCheckBoxFlag] = useState(false);
  const [showSelection, setShowSelection] = useState(false);
  const [showFeed, setShowFeed] = useState(false);

  useEffect(() => {
    fetchBreeds();
  }, []);

  useEffect(() => {
    const fetchFavoritedBreeds = async (username: string) => {
      const favoritedBreeds = await getFavoritedBreeds(username);
      if (favoritedBreeds.length > 0) {
        setSelectedBreeds(favoritedBreeds);
        setShowFeed(true);
        setShowSelection(false);
      } else {
        setShowSelection(true);
      }
    };

    if (username) {
      fetchFavoritedBreeds(username);
    }
  }, [username]);

  useEffect(() => {
    const fetchImageSources = async () => {
      const sources = await Promise.all(
        selectedBreeds.map((breed) => fetchBreedImage(breed)),
      );
      setImageSources(sources);
    };

    const saveSelectedBreeds = async (username: string) => {
      await saveFavoritedBreeds(username, selectedBreeds);
      setShowFeed(true);
    };

    fetchImageSources();

    if (selectedBreeds.length < 3) {
      setCheckBoxFlag(false);
    } else {
      setCheckBoxFlag(true);
      if (username) saveSelectedBreeds(username);
    }
  }, [selectedBreeds]);

  const fetchBreeds = async () => {
    try {
      const data = await getBreedList();

      const breedsList = Object.keys(data);

      setBreeds(breedsList);
    } catch (error) {
      console.error('Error fetching breeds:', error);
    }
  };

  const fetchBreedImage = async (breed: string) => {
    const img = await getBreedImage(breed);

    return img;
  };

  const handleCheckboxChange = (breed: string) => {
    setSelectedBreeds((prevSelectedBreeds) =>
      prevSelectedBreeds.includes(breed)
        ? prevSelectedBreeds.filter((selectedBreed) => selectedBreed !== breed)
        : [...prevSelectedBreeds, breed],
    );
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
      <DashboardContainer>
        <PrimaryButton onClick={() => setShowSelection(!showSelection)}>
          Show Selection
        </PrimaryButton>
        {showSelection && (
          <div>
            <h2>Select dog breeds:</h2>
            <CheckboxGrid>
              {breeds.length > 0 &&
                breeds.map((option, index) => (
                  <CheckboxItem
                    key={index}
                    //onClick={() => handleCheckboxChange(option)}
                  >
                    <CheckboxInput
                      type="checkbox"
                      value={option}
                      checked={selectedBreeds.includes(option)}
                      onChange={() => handleCheckboxChange(option)}
                      disabled={
                        selectedBreeds.includes(option) ? false : checkBoxFlag
                      }
                    />
                    <label>{option}</label>
                  </CheckboxItem>
                ))}
            </CheckboxGrid>
          </div>
        )}

        {showFeed && <Feed selectedBreeds={selectedBreeds} />}
      </DashboardContainer>
    </>
  );
};

export default Dashboard;
