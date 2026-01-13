export interface Resource {
  title: string;
  type: 'Textbook' | 'Article' | 'Website' | 'PDF' | 'Documentation' | 'Tutorial' | 'Reference';
  category: string; // e.g., "Computer Science", "Mathematics", "Web Development", etc.
  status: 'completed' | 'in-progress' | 'to-read';
  author?: string;
  url?: string;
  description?: string;
  tags?: string[];
  rating?: number; // 1-5 stars (optional)
}

export const brainDump: Resource[] = [
  // Technical Textbooks
  {
    title: 'Introduction to Algorithms (CLRS)',
    type: 'Textbook',
    category: 'Computer Science',
    status: 'in-progress',
    author: 'Cormen, Leiserson, Rivest, Stein',
    description: 'The comprehensive guide to algorithms and data structures.',
    tags: ['Algorithms', 'Data Structures', 'Theory'],
    rating: 5
  },
  {
    title: 'Designing Data-Intensive Applications',
    type: 'Textbook',
    category: 'Databases',
    status: 'completed',
    author: 'Martin Kleppmann',
    description: 'Deep dive into distributed systems, databases, and data architecture.',
    tags: ['Databases', 'Distributed Systems', 'Architecture'],
    rating: 5
  },

  // Articles
  {
    title: 'The Twelve-Factor App',
    type: 'Website',
    category: 'Software Engineering',
    status: 'completed',
    url: 'https://12factor.net/',
    description: 'Methodology for building modern, scalable web applications.',
    tags: ['DevOps', 'Best Practices', 'Architecture'],
    rating: 5
  },
  {
    title: 'How to Write Good Documentation',
    type: 'Article',
    category: 'Software Engineering',
    status: 'completed',
    url: 'https://documentation.divio.com/',
    description: 'A systematic approach to technical documentation.',
    tags: ['Documentation', 'Technical Writing'],
    rating: 4
  },

  // PDFs and Papers
  {
    title: 'MapReduce: Simplified Data Processing',
    type: 'PDF',
    category: 'Distributed Systems',
    status: 'completed',
    author: 'Jeffrey Dean and Sanjay Ghemawat',
    url: 'https://research.google/pubs/mapreduce-simplified-data-processing-on-large-clusters/',
    description: 'Google\'s seminal paper on MapReduce programming model.',
    tags: ['Big Data', 'Google', 'Research Paper'],
    rating: 5
  },

  // Documentation
  {
    title: 'React Documentation',
    type: 'Documentation',
    category: 'Web Development',
    status: 'completed',
    url: 'https://react.dev/',
    description: 'Official React documentation and guides.',
    tags: ['React', 'Frontend', 'JavaScript'],
    rating: 5
  },
  {
    title: 'Go by Example',
    type: 'Tutorial',
    category: 'Programming Languages',
    status: 'in-progress',
    url: 'https://gobyexample.com/',
    description: 'Hands-on introduction to Go using annotated example programs.',
    tags: ['Go', 'Backend', 'Tutorial']
  },

  // Mathematics
  {
    title: 'Linear Algebra Done Right',
    type: 'Textbook',
    category: 'Mathematics',
    status: 'completed',
    author: 'Sheldon Axler',
    description: 'A comprehensive treatment of linear algebra with a focus on understanding.',
    tags: ['Linear Algebra', 'Theory', 'Proofs'],
    rating: 4
  },
  {
    title: 'The Art of Statistics',
    type: 'Textbook',
    category: 'Mathematics',
    status: 'to-read',
    author: 'David Spiegelhalter',
    description: 'How to learn from data and make better decisions.',
    tags: ['Statistics', 'Data Science']
  },

  // Interesting reads
  {
    title: 'The Mythical Man-Month',
    type: 'Textbook',
    category: 'Software Engineering',
    status: 'to-read',
    author: 'Frederick Brooks',
    description: 'Classic essays on software engineering and project management.',
    tags: ['Management', 'Software Development', 'Classic']
  },
  {
    title: 'Patterns of Enterprise Application Architecture',
    type: 'Reference',
    category: 'Software Engineering',
    status: 'to-read',
    author: 'Martin Fowler',
    description: 'Comprehensive catalog of enterprise architecture patterns.',
    tags: ['Design Patterns', 'Architecture', 'Enterprise']
  }
];