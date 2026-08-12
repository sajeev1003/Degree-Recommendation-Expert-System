/**
 * Questionnaire Questions
 * Maps directly to student attributes used by the inference engine.
 * Categories: academic | interest | personality | subject
 */

export const QUESTIONS = [
  // ─── Academic Skills ────────────────────────────────────────────────────────
  {
    id: 'q_math',
    category: 'academic',
    text: 'How would you rate your ability in Mathematics?',
    type: 'scale',
    options: [
      { id: 'weak', label: 'Weak' },
      { id: 'average', label: 'Average' },
      { id: 'strong', label: 'Strong' },
    ],
  },
  {
    id: 'q_science',
    category: 'academic',
    text: 'How would you rate your ability in Science (Biology / Chemistry / Physics)?',
    type: 'scale',
    options: [
      { id: 'weak', label: 'Weak' },
      { id: 'average', label: 'Average' },
      { id: 'strong', label: 'Strong' },
    ],
  },
  {
    id: 'q_communication',
    category: 'academic',
    text: 'How would you rate your verbal and written communication skills?',
    type: 'scale',
    options: [
      { id: 'weak', label: 'Weak' },
      { id: 'average', label: 'Average' },
      { id: 'strong', label: 'Strong' },
    ],
  },
  {
    id: 'q_creativity',
    category: 'academic',
    text: 'How would you rate your creativity and artistic ability?',
    type: 'scale',
    options: [
      { id: 'weak', label: 'Weak' },
      { id: 'average', label: 'Average' },
      { id: 'strong', label: 'Strong' },
    ],
  },
  {
    id: 'q_problem_solving',
    category: 'academic',
    text: 'How good are you at solving logical or analytical problems?',
    type: 'scale',
    options: [
      { id: 'weak', label: 'Weak' },
      { id: 'average', label: 'Average' },
      { id: 'strong', label: 'Strong' },
    ],
  },

  // ─── Interests ──────────────────────────────────────────────────────────────
  {
    id: 'q_interest',
    category: 'interest',
    text: 'Which activity do you enjoy the most?',
    type: 'single',
    options: [
      { id: 'technology', label: 'Working with technology and computers' },
      { id: 'design', label: 'Drawing, designing, or creating visuals' },
      { id: 'business', label: 'Planning, managing, or leading projects' },
      { id: 'helping', label: 'Helping or advising people' },
      { id: 'media', label: 'Writing, presenting, or creating content' },
    ],
  },
  {
    id: 'q_career_goal',
    category: 'interest',
    text: 'Which career field interests you most?',
    type: 'single',
    options: [
      { id: 'tech', label: 'Technology / Engineering' },
      { id: 'health', label: 'Healthcare / Medicine' },
      { id: 'commerce', label: 'Business / Finance' },
      { id: 'creative', label: 'Arts / Media / Design' },
      { id: 'social', label: 'Education / Counselling / Social Work' },
    ],
  },
  {
    id: 'q_free_time',
    category: 'interest',
    text: 'What do you enjoy doing in your free time?',
    type: 'single',
    options: [
      { id: 'coding', label: 'Coding, gaming, or exploring gadgets' },
      { id: 'art', label: 'Drawing, photography, or crafting' },
      { id: 'reading', label: 'Reading, debating, or writing' },
      { id: 'volunteering', label: 'Volunteering or community service' },
      { id: 'finance', label: 'Tracking budgets or business ideas' },
    ],
  },

  // ─── Personality ────────────────────────────────────────────────────────────
  {
    id: 'q_personality',
    category: 'personality',
    text: 'Which statement best describes you?',
    type: 'single',
    options: [
      { id: 'analytical', label: 'I like analysing data and solving puzzles' },
      { id: 'creative', label: 'I prefer expressing ideas visually or through writing' },
      { id: 'social', label: 'I enjoy working with and helping people' },
      { id: 'detail', label: 'I am careful, precise, and detail-oriented' },
      { id: 'leader', label: 'I like taking charge and leading teams' },
    ],
  },
  {
    id: 'q_work_style',
    category: 'personality',
    text: 'How do you prefer to work?',
    type: 'single',
    options: [
      { id: 'independent', label: 'Independently on focused tasks' },
      { id: 'team', label: 'In a team with discussion and collaboration' },
      { id: 'hands_on', label: 'Hands-on, building or experimenting' },
      { id: 'structured', label: 'Following clear rules and processes' },
    ],
  },

  // ─── Subject Performance ────────────────────────────────────────────────────
  {
    id: 'q_best_subject',
    category: 'subject',
    text: 'Which school subjects do you perform best in? (Select all that apply)',
    type: 'multi',
    options: [
      { id: 'add_math', label: 'Additional Mathematics' },
      { id: 'physics', label: 'Physics' },
      { id: 'biology', label: 'Biology' },
      { id: 'chemistry', label: 'Chemistry' },
      { id: 'accounts', label: 'Accounts' },
      { id: 'art', label: 'Art & Design' },
      { id: 'bm_english', label: 'Bahasa Malaysia / English' },
    ],
  },
  {
    id: 'q_enjoyed_subject',
    category: 'subject',
    text: 'Which subject did you enjoy the most in school?',
    type: 'single',
    options: [
      { id: 'math', label: 'Mathematics' },
      { id: 'science', label: 'Science' },
      { id: 'language', label: 'Languages / Literature' },
      { id: 'art_design', label: 'Art / Design' },
      { id: 'social_studies', label: 'History / Moral / Social Studies' },
    ],
  },
];
