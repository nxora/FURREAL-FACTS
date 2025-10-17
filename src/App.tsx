import React, { useEffect, useState } from 'react';
import './App.css';
import { CatBreed } from './cat-interface';
import { DogBreed } from './dog-interface';
import { PetBreed } from './PetBreed';

function App() {
  type PetType = 'cat' | 'dog';

  const [activeTab, setActiveTab] = useState<PetType>('cat');
  const [catBreeds, setCatBreeds] = useState<PetBreed[]>([]);
  const [dogBreeds, setDogBreeds] = useState<PetBreed[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<PetBreed | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const ITEMS_PER_PAGE = 8;

  const normalizeCat = (cat: CatBreed): PetBreed => ({
    ...cat,
    id: cat.id.toString(),
    image_url: `https://cdn2.thecatapi.com/images/${cat.reference_image_id}.jpg`,
    type: 'cat',
  });

  const normalizeDog = (dog: DogBreed): PetBreed => ({
    id: dog.id.toString(),
    name: dog.name,
    description: dog.description || 'No description available.',
    origin: dog.origin,
    country_code: dog.country_code,
    life_span: dog.life_span,
    temperament: dog.temperament,
    wikipedia_url: dog.wikipedia_url || '',
    weight: dog.weight,
    image_url: dog.reference_image_id
      ? `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`
      : dog.image?.url || '',
    cat_friendly: dog.cat_friendly,
    stranger_friendly: dog.stranger_friendly,
    social_needs: dog.social_needs,
    intelligence: dog.intelligence,
    alt_names: dog.alt_names,
    type: 'dog',
  });

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const CAT_API_KEY = process.env.REACT_APP_CAT_API_KEY;
        if (!CAT_API_KEY) throw new Error('Cat API key missing');
        const res = await fetch('https://api.thecatapi.com/v1/breeds', {
          headers: { 'x-api-key': CAT_API_KEY },
        });
        if (!res.ok) throw new Error(`Cat API: ${res.status}`);
        const data: CatBreed[] = await res.json();
        setCatBreeds(data.map(normalizeCat));
      } catch (err) {
        console.error('Cat fetch error:', err);
        setError('Failed to load cat breeds');
      }
    };

    const fetchDogs = async () => {
      try {
        const DOG_API_KEY = process.env.REACT_APP_DOG_API_KEY;
        if (!DOG_API_KEY) throw new Error('Dog API key missing');
        const res = await fetch('https://api.thedogapi.com/v1/breeds', {
          headers: { 'x-api-key': DOG_API_KEY },
        });
        if (!res.ok) throw new Error(`Dog API: ${res.status}`);
        const data: DogBreed[] = await res.json();
        setDogBreeds(data.map(normalizeDog));
      } catch (err) {
        console.error('Dog fetch error:', err);
        setError('Failed to load dog breeds');
      }
    };

    fetchCats();
    fetchDogs().finally(() => setLoading(false));
  }, []);

  const currentBreeds = activeTab === 'cat' ? catBreeds : dogBreeds;
  const filteredBreeds = searchTerm
    ? currentBreeds.filter((breed) =>
        breed.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : currentBreeds;

  // If a breed is selected, always show it (full detail)
  const displayBreeds = selectedBreed
    ? [selectedBreed]
    : showAll
    ? filteredBreeds
    : filteredBreeds.slice(0, ITEMS_PER_PAGE);

  const handleSelect = (breed: PetBreed) => {
    setSelectedBreed(breed);
    setSearchTerm(breed.name);
    setShowAll(false); // Reset when selecting
  };

  const clearSelection = () => {
    setSelectedBreed(null);
    setSearchTerm('');
    setShowAll(false);
  };

  if (loading)
    return (
      <div className="text-blue-400 font-bold text-center p-6 md:p-8">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="text-red-400 text-center font-bold p-6 md:p-8">
        {error}
      </div>
    );

  return (
    <div className="p-2 sm:p-4 md:p-8 font-sans bg-gradient-to-bl from-gray-800 min-h-screen text-white">
      <div className="flex flex-col items-center mb-6 sm:mb-8">
        <h1 className="text-blue-400 font-bold text-3xl sm:text-4xl mb-4 sm:mb-6">
          Furrreal Facts
        </h1>

        {/* Tabs */}
        <div className="flex w-full max-w-xs mb-4 sm:mb-6">
          <button
            onClick={() => {
              setActiveTab('cat');
              clearSelection();
            }}
            className={`flex-1 px-3 py-2 sm:px-6 sm:py-2 text-sm sm:text-base rounded-l-lg ${
              activeTab === 'cat'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            🐱 Cats
          </button>
          <button
            onClick={() => {
              setActiveTab('dog');
              clearSelection();
            }}
            className={`flex-1 px-3 py-2 sm:px-6 sm:py-2 text-sm sm:text-base rounded-r-lg ${
              activeTab === 'dog'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            🐶 Dogs
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full max-w-2xl">
          <input
            className="w-full border-2 border-blue-300 rounded-full px-4 py-2 sm:px-6 sm:py-3 text-base sm:text-lg placeholder:text-center focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
            type="text"
            placeholder={`Search ${activeTab} breeds...`}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setSelectedBreed(null);
            }}
          />
        </div>
      </div>

      {/* Breed Grid */}
      <div className="p-2 sm:p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {displayBreeds.map((breed) => (
          <div
            key={breed.id}
            onClick={() => handleSelect(breed)}
            className="breed-card border rounded-xl p-3 sm:p-4 shadow-md hover:shadow-lg transition bg-white text-gray-900 cursor-pointer"
          >
            {breed.image_url && (
              <img
                src={breed.image_url}
                alt={breed.name}
                className="w-full max-w-[14em] h-auto mx-auto object-cover rounded-xl bg-slate-200 mb-3"
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
            )}
            <h3 className="text-lg font-bold text-blue-700">{breed.name}</h3>
            <p className="text-gray-700 text-sm mb-2">
              <strong>About:</strong> {breed.description}
            </p>

            {breed.dog_friendly !== undefined && (
              <p className="text-sm">
                <strong>Dog Friendly:</strong> {breed.dog_friendly}/5
              </p>
            )}
            {breed.cat_friendly !== undefined && (
              <p className="text-sm">
                <strong>Cat Friendly:</strong> {breed.cat_friendly}/5
              </p>
            )}

            {breed.alt_names && (
              <p className="text-sm">
                <strong>Other Names:</strong> {breed.alt_names}
              </p>
            )}
            <p className="text-sm">
              <strong>Intelligence:</strong> {breed.intelligence}/5
            </p>
            <p className="text-sm">
              <strong>Life Span:</strong> {breed.life_span}
            </p>
            <p className="text-sm">
              <strong>Origin:</strong> {breed.origin} ({breed.country_code})
            </p>
            <p className="text-sm">
              <strong>Social Needs:</strong> {breed.social_needs}/5
            </p>
            <p className="text-sm">
              <strong>Stranger Friendly:</strong> {breed.stranger_friendly}/5
            </p>
            <p className="text-sm">
              <strong>Temperament:</strong> {breed.temperament}
            </p>
            <p className="text-sm">
              <strong>Weight:</strong> {breed.weight.metric} kg /{' '}
              {breed.weight.imperial} lbs
            </p>

            {breed.wikipedia_url && (
              <a
                href={breed.wikipedia_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline mt-2 inline-block text-sm"
                onClick={(e) => e.stopPropagation()}
              >
                📚 Wikipedia
              </a>
            )}
          </div>
        ))}
      </div>

      {/* See More / See Less */}
      {!selectedBreed && filteredBreeds.length > ITEMS_PER_PAGE && (
        <div className="text-center mt-6">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            {showAll ? 'See Less' : 'See More'}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;