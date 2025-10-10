// src/PetBreed.ts
export interface PetBreed {
  id: string;
  name: string;
  description: string;
  origin: string;
  country_code: string;
  life_span: string;
  temperament: string;
  wikipedia_url: string;
  weight: {
    imperial: string;
    metric: string;
  };
  image_url: string;
  type: 'cat' | 'dog';

  // Optional shared trait fields (cats and dogs both have these, but may be missing in some responses)
  dog_friendly?: number;
  cat_friendly?: number;
  intelligence?: number;
  social_needs?: number;
  stranger_friendly?: number;
  energy_level?: number;
  affection_level?: number;
  child_friendly?: number;
  grooming?: number;
  health_issues?: number;
  shedding_level?: number;
  vocalisation?: number;

  // Other optional fields
  alt_names?: string;
}