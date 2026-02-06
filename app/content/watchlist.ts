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
    title: '28 Years Later: The Bone Temple',
    type: 'Movie',
    year: '2026',
    genres: ['Horror', 'Sci-Fi', 'Thriller'],
    status: 'watched',
    description: 'The fourth installment in the 28 Days Later franchise, set several decades after the original outbreak.'
  },
  {
    title: '28 Days Later',
    type: 'Movie',
    year: '2002',
    genres: ['Horror', 'Sci-Fi', 'Thriller'],
    status: 'want-to-watch',
    description: 'Four weeks after a mysterious, incurable virus spreads throughout the UK, a handful of survivors try to find sanctuary.'
  },
  {
    title: '28 Weeks Later',
    type: 'Movie',
    year: '2007',
    genres: ['Horror', 'Sci-Fi', 'Thriller'],
    status: 'want-to-watch',
    description: 'Six months after the rage virus was inflicted on the population of Great Britain, the US Army helps to secure a small area of London for the survivors to repopulate and start again.'
  },
  {
    title: '28 Years Later',
    type: 'Movie',
    year: '2025',
    genres: ['Horror', 'Sci-Fi', 'Thriller'],
    status: 'want-to-watch',
    description: 'The third installment in the 28 Days Later franchise, nearly three decades after the original outbreak.'
  },
  {
    title: 'The Social Network',
    type: 'Movie',
    year: '2010',
    genres: ['Drama', 'Biography'],
    status: 'want-to-watch',
    description: 'The story of Facebook\'s creation and the legal battles that followed.'
  },
  {
    title: 'Severance',
    type: 'TV Show',
    year: '2022-Present',
    genres: ['Sci-Fi', 'Thriller', 'Drama'],
    status: 'want-to-watch',
    description: 'A mind-bending thriller about work-life balance taken to the extreme.'
  },
  {
    title: 'Mr. Robot',
    type: 'TV Show',
    year: '2015-2019',
    genres: ['Drama', 'Thriller', 'Crime'],
    status: 'want-to-watch',
    description: 'A cybersecurity engineer and hacker with social anxiety disorder becomes a vigilante hacker, joining a mysterious anarchist group.'
  },
  {
    title: 'Succession',
    type: 'TV Show',
    year: '2018-2023',
    genres: ['Drama'],
    status: 'want-to-watch',
    description: 'The Roy family fights for control of their media conglomerate as the patriarch\'s health declines.'
  },
  {
    title: 'The Accountant',
    type: 'Movie',
    year: '2016',
    genres: ['Action', 'Thriller', 'Crime'],
    status: 'want-to-watch',
    description: 'A math savant with autism uncooks the books for criminal clients while the Treasury Department closes in on his activities.'
  },
  {
    title: 'Brooklyn Nine-Nine',
    type: 'TV Show',
    year: '2013-2021',
    genres: ['Comedy', 'Crime'],
    status: 'want-to-watch',
    description: 'A talented but carefree detective and his diverse colleagues navigate the hilarious challenges of working at a New York precinct.'
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