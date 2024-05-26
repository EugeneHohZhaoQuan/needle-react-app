import { MainContainer } from './main.styles';

import { getBreedList, getBreedImage } from './api/useDataApi';
import { useEffect, useState } from 'react';

import {
  BreedCheckbox,
  Dropdown,
  DropdownButton,
  DropdownContent,
  CheckboxGrid,
  CheckboxInput,
  CheckboxItem,
} from './Dashboard.styles';
import { PrimaryButton } from './button.styles';
import Feed from './Feed';

export const Dashboard = () => {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [imageSources, setImageSources] = useState<string[]>([]);
  const [checkBoxFlag, setCheckBoxFlag] = useState(false);
  const [showFeed, setShowFeed] = useState(false);

  useEffect(() => {
    fetchBreeds();
  }, []);

  useEffect(() => {
    const fetchImageSources = async () => {
      const sources = await Promise.all(
        selectedBreeds.map((breed) => fetchBreedImage(breed)),
      );
      setImageSources(sources);
    };

    fetchImageSources();

    if (selectedBreeds.length < 3) {
      setCheckBoxFlag(false);
    } else {
      setCheckBoxFlag(true);
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
    <MainContainer>
      {!showFeed && (
        <div>
          {
            <PrimaryButton
              disabled={selectedBreeds.length === 3 ? false : true}
              onClick={() => setShowFeed(!showFeed)}
            >
              {' '}
              Go to Feed
            </PrimaryButton>
          }
          <h2>Select dog breeds:</h2>
          {/* <Dropdown>
        <DropdownButton onClick={toggleDropdown}>Select Breeds</DropdownButton>
        <DropdownContent isOpen={dropdownOpen}>
          {breeds.length > 0 &&
            breeds.map((breed) => (
              <BreedCheckbox
                key={breed}
                onClick={() => handleCheckboxChange(breed)}
              >
                <label>
                  <input
                    type="checkbox"
                    value={breed}
                    checked={selectedBreeds.includes(breed)}
                    onChange={() => {}}
                  />
                  {breed}
                </label>
              </BreedCheckbox>
            ))}
        </DropdownContent>
      </Dropdown>
      {selectedBreeds.length > 0 && (
        <>
          <div>
            <h3>Selected Breeds:</h3>
            <ul>
              {selectedBreeds.map((breed) => (
                <li key={breed}>{breed}</li>
              ))}
            </ul>
          </div>
          <div>
            {imageSources.map((src, index) => (
              <img key={index} src={src} alt={`Image ${index + 1}`} />
            ))}
          </div>
        </>
      )} */}

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
          {selectedBreeds.length > 0 && (
            <>
              <div>
                <h3>Selected Breeds:</h3>
                <ul>
                  {selectedBreeds.map((breed) => (
                    <li key={breed}>{breed}</li>
                  ))}
                </ul>
              </div>
              <div>
                {imageSources.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`Image ${index + 1}`}
                    height={200}
                    width={200}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}
      {showFeed && <Feed selectedBreeds={selectedBreeds} />}
    </MainContainer>
  );
};

export default Dashboard;
