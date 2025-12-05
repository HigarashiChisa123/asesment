// app/user/components/dashboard/data/booksData.js
export const recommendedBooks = [
  { title: "A Mind for Numbers: How to Excel at Math and Science", author: "Barbara Oakley PhD", image: null, category: "Self-Improvement" },
  { title: "The Science of Learning", author: "John Dunlosky", image: null, category: "Education" },
  { title: "Deep Work", author: "Cal Newport", image: null, category: "Productivity" },
  { title: "Atomic Habits", author: "James Clear", image: null, category: "Self-Improvement" },
  { title: "Thinking, Fast and Slow", author: "Daniel Kahneman", image: null, category: "Psychology" },
  { title: "Peak", author: "Anders Ericsson", image: null, category: "Self-Improvement" },
  { title: "Make It Stick", author: "Peter Brown", image: null, category: "Education" },
  { title: "Mindset", author: "Carol Dweck", image: null, category: "Psychology" },
  { title: "Range", author: "David Epstein", image: null, category: "Self-Improvement" },
  { title: "The Art of Learning", author: "Josh Waitzkin", image: null, category: "Education" },
  { title: "Grit", author: "Angela Duckworth", image: null, category: "Psychology" },
  { title: "Flow", author: "Mihaly Csikszentmihalyi", image: null, category: "Psychology" },
  { title: "Ultralearning", author: "Scott Young", image: null, category: "Education" },
  { title: "The Talent Code", author: "Daniel Coyle", image: null, category: "Self-Improvement" },
  { title: "Brain Rules", author: "John Medina", image: null, category: "Science" },
  { title: "Why We Sleep", author: "Matthew Walker", image: null, category: "Health" }
];

export const schoolBooks = [
  { title: "Mathematics Grade 11", author: "Ministry of Education", image: null, category: "Education" },
  { title: "Physics Fundamentals", author: "Dr. Richard Feynman", image: null, category: "Science" },
  { title: "Chemistry Today", author: "Prof. Ahmad Zaki", image: null, category: "Science" },
  { title: "Biology Advanced", author: "Dr. Sarah Johnson", image: null, category: "Science" },
  { title: "English Literature", author: "Cambridge Press", image: null, category: "Literature" },
  { title: "World History", author: "Oxford Publishers", image: null, category: "History" },
  { title: "Economics Principles", author: "N. Gregory Mankiw", image: null, category: "Business" },
  { title: "Geography Essentials", author: "National Geographic", image: null, category: "Geography" },
  { title: "Sociology Introduction", author: "Anthony Giddens", image: null, category: "Social Science" },
  { title: "Psychology Basics", author: "Philip Zimbardo", image: null, category: "Psychology" },
  { title: "Statistics for Students", author: "David Moore", image: null, category: "Mathematics" },
  { title: "Art History", author: "Marilyn Stokstad", image: null, category: "Art" },
  { title: "Music Theory", author: "Barbara Wharram", image: null, category: "Music" },
  { title: "Physical Education", author: "Robert Pangrazi", image: null, category: "Sports" },
  { title: "Civics and Government", author: "James Q. Wilson", image: null, category: "Politics" },
  { title: "Environmental Science", author: "G. Tyler Miller", image: null, category: "Science" }
];

export const computerBooks = [
  { title: "Computer Science Fundamentals", author: "Thomas H. Cormen", image: null, category: "Technology" },
  { title: "Python Programming", author: "Mark Lutz", image: null, category: "Programming" },
  { title: "Web Development Guide", author: "Jon Duckett", image: null, category: "Web Development" },
  { title: "Data Structures", author: "Robert Sedgewick", image: null, category: "Programming" },
  { title: "Artificial Intelligence", author: "Stuart Russell", image: null, category: "AI" },
  { title: "Clean Code", author: "Robert C. Martin", image: null, category: "Programming" },
  { title: "Introduction to Algorithms", author: "CLRS", image: null, category: "Programming" },
  { title: "The Pragmatic Programmer", author: "Andrew Hunt", image: null, category: "Programming" },
  { title: "Code Complete", author: "Steve McConnell", image: null, category: "Programming" },
  { title: "Design Patterns", author: "Gang of Four", image: null, category: "Programming" },
  { title: "Operating Systems", author: "Abraham Silberschatz", image: null, category: "Technology" },
  { title: "Computer Networks", author: "Andrew Tanenbaum", image: null, category: "Technology" },
  { title: "Database Systems", author: "Ramez Elmasri", image: null, category: "Database" },
  { title: "Software Engineering", author: "Ian Sommerville", image: null, category: "Technology" },
  { title: "Machine Learning", author: "Tom Mitchell", image: null, category: "AI" },
  { title: "Cybersecurity Essentials", author: "Charles J. Brooks", image: null, category: "Security" }
];

export const allBooks = [
  ...recommendedBooks,
  ...schoolBooks,
  ...computerBooks
];

export const genreBooks = {
  'All': allBooks,
  'Sci-Fi': [
    { title: "Dune", author: "Frank Herbert", image: null, category: "Sci-Fi" },
    { title: "Neuromancer", author: "William Gibson", image: null, category: "Sci-Fi" },
    { title: "Foundation", author: "Isaac Asimov", image: null, category: "Sci-Fi" },
    { title: "The Martian", author: "Andy Weir", image: null, category: "Sci-Fi" },
    { title: "Ender's Game", author: "Orson Scott Card", image: null, category: "Sci-Fi" },
    { title: "Snow Crash", author: "Neal Stephenson", image: null, category: "Sci-Fi" },
    { title: "Hyperion", author: "Dan Simmons", image: null, category: "Sci-Fi" },
    { title: "The Left Hand of Darkness", author: "Ursula K. Le Guin", image: null, category: "Sci-Fi" },
    { title: "Do Androids Dream of Electric Sheep?", author: "Philip K. Dick", image: null, category: "Sci-Fi" },
    { title: "The Forever War", author: "Joe Haldeman", image: null, category: "Sci-Fi" },
    { title: "Ringworld", author: "Larry Niven", image: null, category: "Sci-Fi" },
    { title: "The Time Machine", author: "H.G. Wells", image: null, category: "Sci-Fi" },
    { title: "Stranger in a Strange Land", author: "Robert A. Heinlein", image: null, category: "Sci-Fi" },
    { title: "2001: A Space Odyssey", author: "Arthur C. Clarke", image: null, category: "Sci-Fi" },
    { title: "The War of the Worlds", author: "H.G. Wells", image: null, category: "Sci-Fi" },
    { title: "I, Robot", author: "Isaac Asimov", image: null, category: "Sci-Fi" }
  ],
  'Fantasy': [
    { title: "The Hobbit", author: "J.R.R. Tolkien", image: null, category: "Fantasy" },
    { title: "Harry Potter", author: "J.K. Rowling", image: null, category: "Fantasy" },
    { title: "Name of the Wind", author: "Patrick Rothfuss", image: null, category: "Fantasy" },
    { title: "Mistborn", author: "Brandon Sanderson", image: null, category: "Fantasy" },
    { title: "The Way of Kings", author: "Brandon Sanderson", image: null, category: "Fantasy" },
    { title: "American Gods", author: "Neil Gaiman", image: null, category: "Fantasy" },
    { title: "The Lies of Locke Lamora", author: "Scott Lynch", image: null, category: "Fantasy" },
    { title: "Assassin's Apprentice", author: "Robin Hobb", image: null, category: "Fantasy" },
    { title: "The Eye of the World", author: "Robert Jordan", image: null, category: "Fantasy" },
    { title: "The Blade Itself", author: "Joe Abercrombie", image: null, category: "Fantasy" },
    { title: "Gardens of the Moon", author: "Steven Erikson", image: null, category: "Fantasy" },
    { title: "The Final Empire", author: "Brandon Sanderson", image: null, category: "Fantasy" },
    { title: "The Fifth Season", author: "N.K. Jemisin", image: null, category: "Fantasy" },
    { title: "The Poppy War", author: "R.F. Kuang", image: null, category: "Fantasy" },
    { title: "A Wizard of Earthsea", author: "Ursula K. Le Guin", image: null, category: "Fantasy" },
    { title: "The Chronicles of Narnia", author: "C.S. Lewis", image: null, category: "Fantasy" }
  ],
  'Mystery': [
    { title: "Sherlock Holmes", author: "Arthur Conan Doyle", image: null, category: "Mystery" },
    { title: "Gone Girl", author: "Gillian Flynn", image: null, category: "Mystery" },
    { title: "The Girl with the Dragon Tattoo", author: "Stieg Larsson", image: null, category: "Mystery" },
    { title: "Big Little Lies", author: "Liane Moriarty", image: null, category: "Mystery" },
    { title: "The Silent Patient", author: "Alex Michaelides", image: null, category: "Mystery" },
    { title: "The Da Vinci Code", author: "Dan Brown", image: null, category: "Mystery" },
    { title: "Murder on the Orient Express", author: "Agatha Christie", image: null, category: "Mystery" },
    { title: "The Woman in the Window", author: "A.J. Finn", image: null, category: "Mystery" },
    { title: "The Cuckoo's Calling", author: "Robert Galbraith", image: null, category: "Mystery" },
    { title: "In the Woods", author: "Tana French", image: null, category: "Mystery" },
    { title: "The Maltese Falcon", author: "Dashiell Hammett", image: null, category: "Mystery" },
    { title: "The Big Sleep", author: "Raymond Chandler", image: null, category: "Mystery" },
    { title: "And Then There Were None", author: "Agatha Christie", image: null, category: "Mystery" },
    { title: "The Hound of the Baskervilles", author: "Arthur Conan Doyle", image: null, category: "Mystery" },
    { title: "Rebecca", author: "Daphne du Maurier", image: null, category: "Mystery" },
    { title: "The Moonstone", author: "Wilkie Collins", image: null, category: "Mystery" }
  ]
};