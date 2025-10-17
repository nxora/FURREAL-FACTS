// src/App.tsx
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

  // Normalize cat data
  const normalizeCat = (cat: CatBreed): PetBreed => ({
    ...cat,
    id: cat.id.toString(),
    image_url: `https://cdn2.thecatapi.com/images/${cat.reference_image_id}.jpg`,
    type: 'cat',
  });

  // Normalize dog data
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
  // 👇 Prioritize reference_image_id over image.url for reliability
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
          headers: { 'x-api-key': CAT_API_KEY }
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
          headers: { 'x-api-key': DOG_API_KEY }
        });
        if (!res.ok) throw new Error(`Dog API: ${res.status}`);
        const data: DogBreed[] = await res.json();
        console.log('First dog:', data[0]);
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
    ? currentBreeds.filter(breed =>
        breed.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : currentBreeds;

  const handleSelect = (breed: PetBreed) => {
    setSelectedBreed(breed);
    setSearchTerm(breed.name);
  };

  const clearSelection = () => {
    setSelectedBreed(null);
    setSearchTerm('');
  };

  if (loading) return <div className="text-blue-400 font-bold text-center p-8">Loading...</div>;
  if (error) return <div className="text-red-400 text-center font-bold p-8">{error}</div>;

  return (
    <div className="p-8 font-sans bg-gradient-to-bl from-gray-800 min-h-screen">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-blue-400 font-bold text-4xl mb-6">Furrreal Facts</h1>
        
        {/* Tabs */}
        <div className="flex mb-6">
          <button
            onClick={() => { setActiveTab('cat'); clearSelection(); }}
            className={`px-6 py-2 rounded-l-lg ${activeTab === 'cat' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            🐱 Cats
          </button>
          <button
            onClick={() => { setActiveTab('dog'); clearSelection(); }}
            className={`px-6 py-2 rounded-r-lg ${activeTab === 'dog' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            🐶 Dogs
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full max-w-2xl">
          <input
            className="w-full border-2 border-blue-300 rounded-full px-6 py-3 text-lg placeholder:text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
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
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {(selectedBreed ? [selectedBreed] : filteredBreeds).map((breed) => (
          <div key={breed.id} className="breed-card border rounded-xl p-4 shadow-md hover:shadow-lg transition bg-white">
            {breed.image_url && (
              <img
                src={breed.image_url}
                alt={breed.name}
                className="ml-[6em] h-[8em] w-[14em] object-cover rounded-[20px] bg-slate-200 mb-3"
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
            )}
            <h3 className="text-lg font-bold text-blue-700">{breed.name}</h3>
            <p className="text-gray-700"><strong>About:</strong> {breed.description}</p>
            
            {breed.dog_friendly !== undefined && (
              <p><strong>Dog Friendly:</strong> {breed.dog_friendly}/5</p>
            )}
            {breed.cat_friendly !== undefined && (
              <p><strong>Cat Friendly:</strong> {breed.cat_friendly}/5</p>
            )}
            
            {breed.alt_names && <p><strong>Other Names:</strong> {breed.alt_names}</p>}
            <p><strong>Intelligence:</strong> {breed.intelligence}/5</p>
            <p><strong>Life Span:</strong> {breed.life_span}</p>
            <p><strong>Origin:</strong> {breed.origin} ({breed.country_code})</p>
            <p><strong>Social Needs:</strong> {breed.social_needs}/5</p>
            <p><strong>Stranger Friendly:</strong> {breed.stranger_friendly}/5</p>
            <p><strong>Temperament:</strong> {breed.temperament}</p>
            <p><strong>Weight:</strong> {breed.weight.metric} kg / {breed.weight.imperial} lbs</p>
            
            {breed.wikipedia_url && (
              <a
                href={breed.wikipedia_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline mt-2 inline-block"
              >
                📚 Wikipedia
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;