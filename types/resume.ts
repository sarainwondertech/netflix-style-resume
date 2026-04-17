export type Episode = {
  number: string;
  title: string;
};

export type Show = {
  id: string;
  title: string;
  subtitle: string;
  movieInspiration: string;
  synopsis: string;
  episodes: Episode[];
  timePeriod: string;
  locations: string[];
  genreTags: string[];
  accentColor: string;
  gradient: string;
  coverImage?: string;
  headerImage?: string;
  photos: string[];
};

export type CarouselRow = {
  id: string;
  title: string;
  badge?: string;
  showIds: string[];
};
