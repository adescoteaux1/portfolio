// content/interests.ts
export interface Interest {
  title: string;
  description: string;
  tags: string[];
  icon: string; // Icon name from lucide-react
}

export const interests: Interest[] = [
  {
    title: 'Puzzles & Problem Solving',
    description: 'I love tackling logic puzzles, riddles, and brain teasers that challenge my analytical thinking. From crosswords to complex algorithmic problems, I find joy in the process of breaking down complex challenges into solvable pieces.',
    tags: ['Logic Puzzles', 'Sudoku', 'Chess', 'Coding Challenges'],
    icon: 'Puzzle'
  },
  {
    title: 'Reading & Literature',
    description: 'Exploring diverse genres from speculative fiction to technical books about software engineering and mathematics. I especially enjoy stories that blend technology with humanity and non-fiction that challenges my perspective.',
    tags: ['Sci-Fi', 'Fantasy', 'Technical Books', 'Philosophy'],
    icon: 'BookOpen'
  },
  {
    title: 'Baking & Cooking',
    description: 'Experimenting with recipes and techniques from different cuisines serves as both a creative outlet and a way to share joy with others. I love the precision of baking and the creativity of cooking without strict recipes.',
    tags: ['Baking', 'International Cuisine', 'Recipe Development', 'Meal Planning'],
    icon: 'ChefHat'
  },
  {
    title: 'Outdoor Activities',
    description: 'Hiking trails and exploring nature provides a perfect way to disconnect from technology and recharge. There\'s something refreshing about the challenge of a difficult trail and the reward of a beautiful view.',
    tags: ['Hiking', 'Nature Photography', 'Trail Running', 'Camping'],
    icon: 'Mountain'
  },
  {
    title: 'Continuous Learning',
    description: 'Pursuing new knowledge and skills across various domains keeps me curious and growing. Whether it\'s a new programming language, mathematical concept, or completely unrelated skill, I believe in lifelong learning.',
    tags: ['Online Courses', 'Tech Articles', 'Documentaries', 'Workshops'],
    icon: 'Lightbulb'
  },
  {
    title: 'Volunteer Work',
    description: 'Contributing to community organizations including Habitat for Humanity, Stow Council on Aging, and Friends of Assabet River National Wildlife Refuge. Giving back to the community is important to me.',
    tags: ['Community Service', 'Environmental Conservation', 'Mentorship', 'Local Organizations'],
    icon: 'Heart'
  }
];