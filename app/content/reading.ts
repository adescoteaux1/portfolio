export interface Book {
  title: string;
  author: string;
  category: string; // "Technical", "Fiction", "Non-Fiction", etc.
  status: 'read' | 'reading' | 'want-to-read';
  rating?: number; // 1-5 stars (optional)
  description?: string;
}

export const readingList: Book[] = [
  {
    title: 'The Pragmatic Programmer',
    author: 'David Thomas & Andrew Hunt',
    category: 'Technical',
    status: 'read',
    rating: 5,
    description: 'A comprehensive guide to software craftsmanship and best practices in programming.'
  },
  {
    title: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    category: 'Technical',
    status: 'reading',
    description: 'Deep dive into the architecture of modern data systems and distributed databases.'
  },
  {
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    category: 'Fiction',
    status: 'read',
    rating: 5,
    description: 'A thrilling science fiction adventure about saving humanity.'
  },
  {
    title: 'Algorithms to Live By',
    author: 'Brian Christian & Tom Griffiths',
    category: 'Non-Fiction',
    status: 'want-to-read',
    description: 'How computer algorithms can solve human dilemmas.'
  }
];