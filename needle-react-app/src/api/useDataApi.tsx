import axios from 'axios';

const getBreedList = async () => {
  try {
    const response = await axios.get('https://dog.ceo/api/breeds/list/all');

    return response.data.message;
  } catch (err: any) {
    console.log(err);
  }
};

const getBreedImage = async (breed: string) => {
  try {
    const response = await axios.get(
      `https://dog.ceo/api/breed/${breed}/images/random`,
    );

    return response.data.message;
  } catch (err: any) {
    console.log(err);
  }
};

export { getBreedList, getBreedImage };
