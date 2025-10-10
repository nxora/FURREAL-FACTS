// src/dog-interface.ts
export interface DogBreed {
  id: number;
  name: string;
  description: string;
  origin: string;
  country_code: string;
  life_span: string;
  temperament: string;
  wikipedia_url: string;
  weight: { imperial: string; metric: string };
  cat_friendly: number; // ⚠️ dogs have cat_friendly, NOT dog_friendly
  stranger_friendly: number;
  social_needs: number;
  intelligence: number;
  alt_names?: string;
  image: { url: string };
}