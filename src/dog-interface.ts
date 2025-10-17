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
  cat_friendly: number;
  stranger_friendly: number;
  social_needs: number;
  intelligence: number;
  alt_names?: string;
  image?: { url: string }; // optional
  reference_image_id?: string; 
}