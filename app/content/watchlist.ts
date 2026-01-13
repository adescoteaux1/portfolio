export interface WatchItem {
  title: string;
  type: 'Movie' | 'TV Show';
  year?: string;
  genres: string[];
  status: 'watched' | 'watching' | 'want-to-watch';
  rating?: number; // 1-5 stars (optional)
  description?: string;
}

export const watchList: WatchItem[] = [
  {
    title: 'The Social Network',
    type: 'Movie',
    year: '2010',
    genres: ['Drama', 'Biography'],
    status: 'watched',
    rating: 5,
    description: 'The story of Facebook\'s creation and the legal battles that followed.'
  },
  {
    title: 'Silicon Valley',
    type: 'TV Show',
    year: '2014-2019',
    genres: ['Comedy', 'Tech'],
    status: 'watched',
    rating: 4,
    description: 'A comedy series about startup culture in Silicon Valley.'
  },
  {
    title: 'Severance',
    type: 'TV Show',
    year: '2022-Present',
    genres: ['Sci-Fi', 'Thriller', 'Drama'],
    status: 'watching',
    rating: 5,
    description: 'A mind-bending thriller about work-life balance taken to the extreme.'
  },
  {
    title: 'Ex Machina',
    type: 'Movie',
    year: '2014',
    genres: ['Sci-Fi', 'Thriller'],
    status: 'want-to-watch',
    description: 'A programmer is invited to administer the Turing test to an AI.'
  }
];