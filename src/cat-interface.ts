// src/cat-interface.ts
export interface CatBreed {
  id: string;
  name: string;
  description: string;
  origin: string;
  country_code: string;
  life_span: string;
  temperament: string;
  wikipedia_url: string;
  weight: { imperial: string; metric: string };
  dog_friendly: number;
  stranger_friendly: number;
  social_needs: number;
  intelligence: number;
  alt_names: string; // often ""
  reference_image_id: string;
}