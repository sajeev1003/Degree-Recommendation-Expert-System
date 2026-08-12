/**
 * ============================================================
 * DEGREE FRAME PROFILES — Frame Representation
 * ============================================================
 *
 * Knowledge Representation Type: Frame Representation
 *
 * Each degree is modelled as a structured frame — a data structure
 * with predefined slots (attributes) that capture declarative knowledge
 * about the degree programme.
 *
 * Frame structure:
 * ┌──────────────────┬────────────────────────────────────────────────────┐
 * │ Slot             │ Description                                        │
 * ├──────────────────┼────────────────────────────────────────────────────┤
 * │ id               │ Unique degree identifier (used by inference engine)│
 * │ name             │ Display name of the degree programme               │
 * │ hollandTypes     │ Holland RIASEC personality types (from SME)        │
 * │ academicStrengths│ Key academic abilities required (from SME Section C)│
 * │ keySubjects      │ School subjects that are strong indicators (SME Cd)│
 * │ personalityFit   │ Personality traits that suit this degree (SME Cb) │
 * │ interests        │ Interests and hobbies that correlate (SME Cc)     │
 * │ redFlags         │ Warning signs — student types to avoid (SME Ce)   │
 * │ careers          │ Example career paths for this degree               │
 * └──────────────────┴────────────────────────────────────────────────────┘
 *
 * Source: Expert elicitation from a Senior Secondary School Counselor
 * (17 years experience), Section C of the elicitation document.
 */

export const DEGREES = [

  // ─── Computer Science / Information Technology ───────────────────────────────
  // SME (C1): "Analytical and critical thinking skills, problem solving ability
  //            and language proficiency have to be strong."
  // Holland: Conventional (C), Realistic (R), Investigative (I)
  {
    id: 'computer_science',
    name: 'Computer Science',
    hollandTypes: ['Conventional (C)', 'Realistic (R)', 'Investigative (I)'],
    academicStrengths: ['Analytical & critical thinking', 'Problem-solving ability', 'Language proficiency'],
    keySubjects: ['Mathematics', 'Science', 'English'],
    personalityFit: ['Analytical', 'Detail-oriented', 'Independent worker'],
    interests: ['Computer skills (programming, IT, gadgets)', 'Technology and innovation'],
    redFlags: ['Weak in Mathematics or English', 'Weak analytical skills', 'Dislikes routine work'],
    careers: ['Software Engineer', 'Data Scientist', 'Cybersecurity Analyst', 'Systems Developer'],
  },

  // ─── Engineering (Civil / Electrical / Mechanical) ───────────────────────────
  // SME (C2): "Mathematical or logical ability, Realistic, Investigative, Conventional.
  //            Students who prefer hands-on work and can complete tasks independently."
  // Holland: Realistic (R), Investigative (I), Conventional (C)
  {
    id: 'engineering',
    name: 'Engineering',
    hollandTypes: ['Realistic (R)', 'Investigative (I)', 'Conventional (C)'],
    academicStrengths: ['Mathematical / logical ability', 'Analytical thinking', 'Strong learning attitude'],
    keySubjects: ['Physics', 'Modern Mathematics', 'Additional Mathematics', 'English'],
    personalityFit: ['Hands-on and practical', 'Analytical', 'Independent worker'],
    interests: ['Hands-on construction and building', 'Problem-solving with physical systems'],
    redFlags: ['Students not enrolled in the STEM stream', 'Weak in Physics and Mathematics'],
    careers: ['Civil Engineer', 'Mechanical Engineer', 'Electrical Engineer', 'Structural Engineer'],
  },

  // ─── Business Administration / Management ─────────────────────────────────────
  // SME (C3): "Problem solving ability, able to work in a group. Social, Enterprising,
  //            Conventional. Able to give a speech in front of many people."
  // Holland: Social (S), Enterprising (E), Conventional (C)
  {
    id: 'business',
    name: 'Business Administration',
    hollandTypes: ['Social (S)', 'Enterprising (E)', 'Conventional (C)'],
    academicStrengths: ['Problem-solving ability', 'Group-work and collaboration', 'Learning attitude'],
    keySubjects: ['Language subjects (BM / English)', 'Mathematics'],
    personalityFit: ['Social and people-oriented', 'Leadership-driven', 'Team player', 'Open to change'],
    interests: ['Public speaking and presentations', 'Joining clubs and activities', 'Leadership roles'],
    redFlags: ['Students not ready to accept changes or adapt to new environments'],
    careers: ['Business Analyst', 'Manager', 'Entrepreneur', 'Marketing Executive', 'HR Manager'],
  },

  // ─── Accounting / Finance ─────────────────────────────────────────────────────
  // SME (C4): "Mathematical or logical ability, problem solving. Conventional, Realistic,
  //            Investigative. Interested in solving mathematical problems."
  // Holland: Conventional (C), Realistic (R), Investigative (I)
  {
    id: 'accounting',
    name: 'Accounting',
    hollandTypes: ['Conventional (C)', 'Realistic (R)', 'Investigative (I)'],
    academicStrengths: ['Mathematical / logical ability', 'Problem-solving ability', 'Attention to detail'],
    keySubjects: ['English', 'Modern Mathematics', 'Additional Mathematics', 'Accounts'],
    personalityFit: ['Detail-oriented and precise', 'Structured and process-driven', 'Analytical'],
    interests: ['Solving mathematical problems', 'Working with numbers on a personal schedule'],
    redFlags: ['Weak in Mathematics', 'Lack of motivation or discipline'],
    careers: ['Accountant', 'Auditor', 'Financial Analyst', 'Tax Consultant', 'Finance Manager'],
  },

  // ─── Psychology / Counseling ──────────────────────────────────────────────────
  // SME (C5): "Problem solving ability, Logical thinking. Social, Enterprising, Artistic.
  //            Like to make friends, listening to others."
  // Holland: Social (S), Enterprising (E), Artistic (A)
  {
    id: 'psychology',
    name: 'Psychology',
    hollandTypes: ['Social (S)', 'Enterprising (E)', 'Artistic (A)'],
    academicStrengths: ['Problem-solving ability', 'Logical thinking', 'Strong learning attitude'],
    keySubjects: ['English', 'Malay Language', 'Science'],
    personalityFit: ['Social and people-oriented', 'Empathetic and caring', 'Creative and expressive'],
    interests: ['Making friends and socialising', 'Listening to others', 'Understanding human behaviour'],
    redFlags: ['Aggressive and impatient students', 'Poor interpersonal and communication skills'],
    careers: ['Psychologist', 'Counsellor', 'HR Specialist', 'Social Worker', 'Research Psychologist'],
  },

  // ─── Mass Communication / Media Studies ──────────────────────────────────────
  // SME (C6): "Learning attitude, willing to work in group, language proficiency.
  //            Artistic, Social, Enterprising. Enjoys writing articles, likes to perform."
  // Holland: Artistic (A), Social (S), Enterprising (E)
  {
    id: 'mass_communication',
    name: 'Mass Communication',
    hollandTypes: ['Artistic (A)', 'Social (S)', 'Enterprising (E)'],
    academicStrengths: ['Language proficiency', 'Teamwork and collaboration', 'Creative thinking'],
    keySubjects: ['Language subjects (BM / English / other languages)'],
    personalityFit: ['Creative and expressive', 'Social and outgoing', 'Leadership-oriented', 'Open to change'],
    interests: ['Writing articles or blogs', 'Performing (acting, presenting)', 'Creative production'],
    redFlags: ['Students not ready to accept change', 'Weak language skills and low creativity'],
    careers: ['Journalist', 'Public Relations Officer', 'Content Creator', 'Broadcaster', 'Media Producer'],
  },

  // ─── Multimedia Design / Graphic Design / Creative Arts ──────────────────────
  // SME (C7): "Creative and innovative thinking, independent learning. Artistic, Investigative,
  //            Realistic. Likes drawing, good in IT, likes doing handicrafts."
  // Holland: Artistic (A), Investigative (I), Realistic (R)
  {
    id: 'multimedia_design',
    name: 'Multimedia Design',
    hollandTypes: ['Artistic (A)', 'Investigative (I)', 'Realistic (R)'],
    academicStrengths: ['Creative and innovative thinking', 'Independent learning ability', 'Digital/IT skills'],
    keySubjects: ['Arts Education', 'Art & Design'],
    personalityFit: ['Creative and expressive', 'Analytical and curious', 'Hands-on and practical'],
    interests: ['Drawing and illustration', 'Digital tools and IT', 'Handicrafts and making things'],
    redFlags: ['Students who are not interested in arts', 'No creative or artistic inclination'],
    careers: ['Graphic Designer', 'UI/UX Designer', 'Animator', 'Digital Artist', 'Art Director'],
  },

  // ─── Medicine / Pharmacy / Biomedical Science / Dentistry ────────────────────
  // SME (C8): "Analytical and critical thinking, language proficiency, mathematical/logical ability.
  //            Investigative, Realistic, Conventional. Likes to solve critical thinking problems."
  // Holland: Investigative (I), Realistic (R), Conventional (C)
  // SME (E3): Non-negotiable academic threshold — STEM stream required
  {
    id: 'medicine',
    name: 'Medicine',
    hollandTypes: ['Investigative (I)', 'Realistic (R)', 'Conventional (C)'],
    academicStrengths: ['Analytical & critical thinking', 'Language proficiency', 'Mathematical / logical ability'],
    keySubjects: ['Biology', 'Chemistry', 'Physics', 'Additional Mathematics', 'English'],
    personalityFit: ['Analytical and investigative', 'Detail-oriented', 'Structured and disciplined'],
    interests: ['Solving critical thinking problems', 'Reading informative and scientific books'],
    redFlags: ['Students not enrolled in the STEM stream', 'Weak in Science subjects', 'Weak analytical skills'],
    careers: ['Doctor', 'Pharmacist', 'Biomedical Scientist', 'Dentist', 'Medical Researcher'],
  },
];
