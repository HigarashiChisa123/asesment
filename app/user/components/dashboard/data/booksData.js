// app/user/components/dashboard/data/booksData.js
// AUTO-GENERATED FILE - DO NOT EDIT MANUALLY
// Last sync: ${new Date().toISOString()}

// Fungsi untuk mengambil data dari API
export async function fetchBooksFromAPI() {
  try {
    console.log('📡 Fetching books from API...');
    const response = await fetch('/api/books?limit=30');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.success && data.books) {
      console.log(`✅ Successfully fetched ${data.books.length} books from API`);
      return data.books.slice(0, 30); // Ambil maksimal 30 buku
    } else {
      console.warn('⚠️ API returned no books, using static data');
      return getStaticBooks();
    }
    
  } catch (error) {
    console.error('❌ Error fetching from API:', error);
    console.log('🔄 Falling back to static data...');
    return getStaticBooks();
  }
}

// Data statis 30 buku lengkap
export function getStaticBooks() {
  console.log('📚 Loading static books data (30 books)...');
  
  const staticBooks = [
    // =========== SUBJECT BOOKS (10 buku) ===========
    {
      id: 1,
      title: "English Grammar in Use",
      author: "Raymond Murphy",
      rating: 4.8,
      description: "Dianggap sebagai 'kitab suci' tata bahasa Inggris untuk pelajar mandiri tingkat menengah.",
      category: "Subject Books",
      image: "/uploads/covers/English Grammar In Use.jpg",
      coverUrl: "/uploads/covers/English Grammar In Use.jpg",
      publisher: "Cambridge University Press",
      pages: 380,
      year: 2019,
      language: "English",
      available: true,
      featured: true,
      popular: true,
      newArrival: false,
      format: "digital"
    },
    {
      id: 2,
      title: "Practical English Usage",
      author: "Michael Swan",
      rating: 4.7,
      description: "Lebih dari sekadar buku grammar, ini adalah panduan komprehensif untuk menggunakan bahasa Inggris dengan benar.",
      category: "Subject Books",
      image: "/uploads/covers/Practical English Usage.png",
      coverUrl: "/uploads/covers/Practical English Usage.png",
      publisher: "Oxford University Press",
      pages: 688,
      year: 2017,
      language: "English",
      available: true,
      featured: true,
      popular: true,
      newArrival: false,
      format: "digital"
    },
    {
      id: 3,
      title: "Word Power Made Easy",
      author: "Norman Lewis",
      rating: 4.6,
      description: "Buku ini bukan tentang menghafal daftar kata. Ini adalah sistem yang menyenangkan dan efektif untuk memperluas kosakata.",
      category: "Subject Books",
      image: "/uploads/covers/Word Power Made Easy.jpg",
      coverUrl: "/uploads/covers/Word Power Made Easy.jpg",
      publisher: "Anchor Books",
      pages: 528,
      year: 2014,
      language: "English",
      available: true,
      featured: true,
      popular: true,
      newArrival: false,
      format: "digital"
    },
    {
      id: 4,
      title: "How to Win Friends and Influence People",
      author: "Dale Carnegie",
      rating: 4.8,
      description: "Meski bukan buku teknis bahasa, buku ini adalah masterclass dalam komunikasi interpersonal yang efektif.",
      category: "Subject Books",
      image: "/uploads/covers/How to Win Friends and Influence People.jpg",
      coverUrl: "/uploads/covers/How to Win Friends and Influence People.jpg",
      publisher: "Gallery Books",
      pages: 320,
      year: 1998,
      language: "English",
      available: true,
      featured: true,
      popular: true,
      newArrival: false,
      format: "digital"
    },
    {
      id: 5,
      title: "The Elements of Style",
      author: "William Strunk Jr. dan E.B. White",
      rating: 4.7,
      description: "Buku tipis yang sangat berpengaruh ini adalah manual untuk menulis bahasa Inggris yang jernih, ringkas, dan kuat.",
      category: "Subject Books",
      image: "/uploads/covers/The Elements of Style.jpg",
      coverUrl: "/uploads/covers/The Elements of Style.jpg",
      publisher: "Pearson",
      pages: 105,
      year: 1999,
      language: "English",
      available: true,
      featured: true,
      popular: true,
      newArrival: false,
      format: "digital"
    },
    {
      id: 6,
      title: "1984",
      author: "George Orwell",
      rating: 4.9,
      description: "Membaca novel klasik adalah cara terbaik untuk mengalami bahasa Inggris dalam bentuknya yang paling kuat dan puitis.",
      category: "Subject Books",
      image: "/uploads/covers/1984.jpg",
      coverUrl: "/uploads/covers/1984.jpg",
      publisher: "Secker & Warburg",
      pages: 328,
      year: 1949,
      language: "English",
      available: true,
      featured: true,
      popular: true,
      newArrival: false,
      format: "digital"
    },
    {
      id: 7,
      title: "English for Everyone: Level 4 Advanced",
      author: "DK Publishing",
      rating: 4.5,
      description: "Seri ini merevolusi cara belajar bahasa dengan pendekatan visual yang sangat intuitif.",
      category: "Subject Books",
      image: "/uploads/covers/English for Everyone.jpeg",
      coverUrl: "/uploads/covers/English for Everyone.jpeg",
      publisher: "DK",
      pages: 264,
      year: 2016,
      language: "English",
      available: true,
      featured: true,
      popular: true,
      newArrival: false,
      format: "digital"
    },
    {
      id: 8,
      title: "English Collocations in Use",
      author: "Michael McCarthy & Felicity O'Dell",
      rating: 4.6,
      description: "Buku ini mengatasi kesenjangan antara 'bahasa Inggris yang benar secara gramatikal' dan 'bahasa Inggris yang terdengar alami'.",
      category: "Subject Books",
      image: "/uploads/covers/English Collocations in Use.jpg",
      coverUrl: "/uploads/covers/English Collocations in Use.jpg",
      publisher: "Cambridge University Press",
      pages: 190,
      year: 2017,
      language: "English",
      available: true,
      featured: true,
      popular: true,
      newArrival: false,
      format: "digital"
    },
    {
      id: 9,
      title: "The Official Guide to the TOEFL Test",
      author: "Educational Testing Service (ETS)",
      rating: 4.7,
      description: "Ini adalah sumber persiapan TOEFL yang paling otoritatif karena diterbitkan langsung oleh pembuat tes.",
      category: "Subject Books",
      image: "/uploads/covers/The Official Guide to the TOEFL Test.jpeg",
      coverUrl: "/uploads/covers/The Official Guide to the TOEFL Test.jpeg",
      publisher: "McGraw-Hill Education",
      pages: 672,
      year: 2021,
      language: "English",
      available: true,
      featured: true,
      popular: true,
      newArrival: false,
      format: "digital"
    },
    {
      id: 10,
      title: "The Blue Book of Grammar and Punctuation",
      author: "Jane Straus & Lester Kaufman",
      rating: 4.6,
      description: "Panduan praktis untuk tata bahasa dan tanda baca dengan aturan yang jelas dan contoh dunia nyata.",
      category: "Subject Books",
      image: "/uploads/covers/The Blue Book of Grammar and Punctuation.jpg",
      coverUrl: "/uploads/covers/The Blue Book of Grammar and Punctuation.jpg",
      publisher: "Jossey-Bass",
      pages: 256,
      year: 2021,
      language: "English",
      available: true,
      featured: true,
      popular: true,
      newArrival: false,
      format: "digital"
    },

    // =========== COMPUTER BOOKS (10 buku) ===========
    {
      id: 11,
      title: "Introduction to Algorithms (CLRS)",
      author: "Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein",
      rating: 4.8,
      description: "Sering disebut sebagai 'Alkitab Algoritma', buku teks monumental ini adalah bacaan wajib di departemen ilmu komputer terkemuka.",
      category: "Computer Books",
      image: "/uploads/covers/Introduction to Algorithms.jpg",
      coverUrl: "/uploads/covers/Introduction to Algorithms.jpg",
      publisher: "MIT Press",
      pages: 1312,
      year: 2009,
      language: "English",
      available: true,
      featured: true,
      popular: true,
      newArrival: false,
      format: "physical"
    },
    {
      id: 12,
      title: "Clean Code: A Handbook of Agile Software Craftsmanship",
      author: "Robert C. Martin ('Uncle Bob')",
      rating: 4.7,
      description: "Buku ini mengubah cara programmer berpikir tentang kode mereka. 'Uncle Bob' berargumen bahwa kode yang berfungsi saja tidak cukup.",
      category: "Computer Books",
      image: "/uploads/covers/Clean Code A Handbook of Agile Software Craftsmanship.jpg",
      coverUrl: "/uploads/covers/Clean Code A Handbook of Agile Software Craftsmanship.jpg",
      publisher: "Prentice Hall",
      pages: 464,
      year: 2008,
      language: "English",
      available: true,
      featured: true,
      popular: true,
      newArrival: false,
      format: "both"
    },
    {
      id: 13,
      title: "The Pragmatic Programmer: Your Journey to Mastery",
      author: "David Thomas & Andrew Hunt",
      rating: 4.8,
      description: "Sebuah kompendium kebijaksanaan yang praktis dan abadi. Buku ini tidak mengajarkan sintaks bahasa pemrograman tertentu.",
      category: "Computer Books",
      image: "/uploads/covers/The Pragmatic Programmer.jpeg",
      coverUrl: "/uploads/covers/The Pragmatic Programmer.jpeg",
      publisher: "Addison-Wesley Professional",
      pages: 352,
      year: 2019,
      language: "English",
      available: true,
      featured: true,
      popular: true,
      newArrival: false,
      format: "digital"
    },
    {
      id: 14,
      title: "Code: The Hidden Language of Computer Hardware and Software",
      author: "Charles Petzold",
      rating: 4.9,
      description: "Pernah bertanya-tanya bagaimana sebenarnya komputer bekerja, dari dasar? Buku ini adalah jawabannya.",
      category: "Computer Books",
      image: "/uploads/covers/The Hidden Language of Computer Hardware and Software.jpg",
      coverUrl: "/uploads/covers/The Hidden Language of Computer Hardware and Software.jpg",
      publisher: "Microsoft Press",
      pages: 400,
      year: 2000,
      language: "English",
      available: true,
      featured: true,
      popular: true,
      newArrival: false,
      format: "digital"
    },
    {
      id: 15,
      title: "Design Patterns: Elements of Reusable Object-Oriented Software",
      author: "Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides",
      rating: 4.6,
      description: "Buku yang meluncurkan revolusi pola desain dalam pengembangan perangkat lunak.",
      category: "Computer Books",
      image: "/uploads/covers/Design Patterns Elements of Reusable Object-Oriented Software.jpg",
      coverUrl: "/uploads/covers/Design Patterns Elements of Reusable Object-Oriented Software.jpg",
      publisher: "Addison-Wesley Professional",
      pages: 416,
      year: 1994,
      language: "English",
      available: true,
      featured: true,
      popular: true,
      newArrival: false,
      format: "physical"
    },
    {
      id: 16,
      title: "Grokking Algorithms",
      author: "Aditya Bhargava",
      rating: 4.7,
      description: "Jika buku CLRS terasa terlalu menakutkan, Grokking Algorithms adalah pintu masuk yang sempurna.",
      category: "Computer Books",
      image: "/uploads/covers/Grokking Algorithms.jpeg",
      coverUrl: "/uploads/covers/Grokking Algorithms.jpeg",
      publisher: "Manning Publications",
      pages: 256,
      year: 2016,
      language: "English",
      available: true,
      featured: true,
      popular: true,
      newArrival: false,
      format: "digital"
    },
    {
      id: 17,
      title: "The Mythical Man-Month: Essays on Software Engineering",
      author: "Frederick P. Brooks Jr.",
      rating: 4.7,
      description: "Kumpulan esai klasik tentang manajemen proyek perangkat lunak, yang masih sangat relevan hingga hari ini.",
      category: "Computer Books",
      image: "/uploads/covers/The Mythical Man-Month Essays on Software Engineering.jpg",
      coverUrl: "/uploads/covers/The Mythical Man-Month Essays on Software Engineering.jpg",
      publisher: "Addison-Wesley Professional",
      pages: 336,
      year: 1995,
      language: "English",
      available: true,
      featured: true,
      popular: true,
      newArrival: false,
      format: "both"
    },
    {
      id: 18,
      title: "Python Crash Course",
      author: "Eric Matthes",
      rating: 4.8,
      description: "Salah satu buku pengantar pemrograman Python terbaik untuk pemula mutlak.",
      category: "Computer Books",
      image: "/uploads/covers/Python Crash Course.jpg",
      coverUrl: "/uploads/covers/Python Crash Course.jpg",
      publisher: "No Starch Press",
      pages: 560,
      year: 2019,
      language: "English",
      available: true,
      featured: true,
      popular: true,
      newArrival: false,
      format: "digital"
    },
    {
      id: 19,
      title: "Don't Make Me Think: A Common Sense Approach to Web Usability",
      author: "Steve Krug",
      rating: 4.7,
      description: "Buku klasik tentang usability (kemudahan penggunaan) web yang ditulis dengan gaya yang ringan, lucu, dan sangat mudah dicerna.",
      category: "Computer Books",
      image: "/uploads/covers/Don't Make Me Think A Common Sense Approach to Web Usability.jpeg",
      coverUrl: "/uploads/covers/Don't Make Me Think A Common Sense Approach to Web Usability.jpeg",
      publisher: "New Riders",
      pages: 216,
      year: 2014,
      language: "English",
      available: true,
      featured: true,
      popular: true,
      newArrival: false,
      format: "digital"
    },
    {
      id: 20,
      title: "Structure and Interpretation of Computer Programs (SICP)",
      author: "Harold Abelson, Gerald Jay Sussman, Julie Sussman",
      rating: 4.8,
      description: "Buku legendaris dari MIT yang menggunakan bahasa Scheme (dialek Lisp) untuk mengajarkan prinsip-prinsip fundamental komputasi.",
      category: "Computer Books",
      image: "/uploads/covers/Structure and Interpretation of Computer Programs (SICP).jpg",
      coverUrl: "/uploads/covers/Structure and Interpretation of Computer Programs (SICP).jpg",
      publisher: "MIT Press",
      pages: 657,
      year: 1996,
      language: "English",
      available: true,
      featured: true,
      popular: true,
      newArrival: false,
      format: "digital"
    },

    // =========== COMICS (10 buku) ===========
    {
      id: 21,
      title: "Watchmen",
      author: "Alan Moore",
      rating: 4.9,
      description: "Sebuah karya yang tidak hanya mendefinisikan ulang genre pahlawan super, tetapi juga memperluas batas medium komik.",
      category: "Comics",
      image: "/uploads/covers/Watchmen.jpg",
      coverUrl: "/uploads/covers/Watchmen.jpg",
      publisher: "DC Comics",
      pages: 416,
      year: 1987,
      language: "English",
      available: true,
      featured: true,
      popular: true,
      newArrival: false,
      format: "both"
    },
    {
      id: 22,
      title: "Berserk",
      author: "Kentaro Miura",
      rating: 4.95,
      description: "Sebuah mahakarya dark fantasy yang epik dan tak tertandingi dalam skala dan intensitasnya.",
      category: "Comics",
      image: "/uploads/covers/Berserk.jpeg",
      coverUrl: "/uploads/covers/Berserk.jpeg",
      publisher: "Dark Horse Comics",
      pages: 224,
      year: 1990,
      language: "Japanese",
      available: true,
      featured: true,
      popular: true,
      newArrival: false,
      format: "physical"
    },
    {
      id: 23,
      title: "Persepolis",
      author: "Marjane Satrapi",
      rating: 4.8,
      description: "Novel grafis otobiografi yang kuat dan mengharukan yang menceritakan masa kecil dan remaja Satrapi di Teheran.",
      category: "Comics",
      image: "/uploads/covers/Persepolis.jpg",
      coverUrl: "/uploads/covers/Persepolis.jpg",
      publisher: "Pantheon",
      pages: 160,
      year: 2003,
      language: "English",
      available: true,
      featured: true,
      popular: true,
      newArrival: false,
      format: "digital"
    },
    {
      id: 24,
      title: "One Piece",
      author: "Eiichiro Oda",
      rating: 4.9,
      description: "Petualangan manga terlaris sepanjang masa yang terus berlangsung selama lebih dari dua dekade.",
      category: "Comics",
      image: "/uploads/covers/One Piece.jpg",
      coverUrl: "/uploads/covers/One Piece.jpg",
      publisher: "Shueisha",
      pages: 208,
      year: 1997,
      language: "Japanese",
      available: true,
      featured: true,
      popular: true,
      newArrival: false,
      format: "physical"
    },
    {
      id: 25,
      title: "Maus",
      author: "Art Spiegelman",
      rating: 5.0,
      description: "Sebuah karya monumental yang memenangkan Hadiah Pulitzer khusus.",
      category: "Comics",
      image: "/uploads/covers/Maus.jpg",
      coverUrl: "/uploads/covers/Maus.jpg",
      publisher: "Pantheon",
      pages: 296,
      year: 1991,
      language: "English",
      available: true,
      featured: true,
      popular: true,
      newArrival: false,
      format: "both"
    },
    {
      id: 26,
      title: "Saga",
      author: "Brian K. Vaughan",
      rating: 4.85,
      description: "Dijuluki 'Star Wars meets Game of Thrones', Saga adalah space opera/fantasi epik untuk pembaca dewasa.",
      category: "Comics",
      image: "/uploads/covers/Saga.jpg",
      coverUrl: "/uploads/covers/Saga.jpg",
      publisher: "Image Comics",
      pages: 192,
      year: 2012,
      language: "English",
      available: true,
      featured: true,
      popular: true,
      newArrival: false,
      format: "digital"
    },
    {
      id: 27,
      title: "Batman: The Dark Knight Returns",
      author: "Frank Miller",
      rating: 4.7,
      description: "Buku yang secara radikal mengubah Batman—dan seluruh industri komik pahlawan super—menjadi lebih gelap dan lebih dewasa.",
      category: "Comics",
      image: "/uploads/covers/Batman The Dark Knight Returns.jpg",
      coverUrl: "/uploads/covers/Batman The Dark Knight Returns.jpg",
      publisher: "DC Comics",
      pages: 224,
      year: 1986,
      language: "English",
      available: true,
      featured: true,
      popular: true,
      newArrival: false,
      format: "both"
    },
    {
      id: 28,
      title: "Fullmetal Alchemist",
      author: "Hiromu Arakawa",
      rating: 4.9,
      description: "Sebuah manga shonen yang nyaris sempurna, dengan alur cerita yang sangat rapi dari awal hingga akhir.",
      category: "Comics",
      image: "/uploads/covers/Fullmetal Alchemist.jpg",
      coverUrl: "/uploads/covers/Fullmetal Alchemist.jpg",
      publisher: "Square Enix",
      pages: 192,
      year: 2001,
      language: "Japanese",
      available: true,
      featured: true,
      popular: true,
      newArrival: false,
      format: "physical"
    },
    {
      id: 29,
      title: "Death Note",
      author: "Tsugumi Ohba",
      rating: 4.8,
      description: "Thriller psikologis yang memukau dengan premis sederhana namun genius.",
      category: "Comics",
      image: "/uploads/covers/Death Note.jpg",
      coverUrl: "/uploads/covers/Death Note.jpg",
      publisher: "Shueisha",
      pages: 200,
      year: 2003,
      language: "Japanese",
      available: true,
      featured: true,
      popular: true,
      newArrival: false,
      format: "digital"
    },
    {
      id: 30,
      title: "Sandman",
      author: "Neil Gaiman",
      rating: 4.9,
      description: "Sebuah mahakarya sastra dalam bentuk komik. Seri ini mengikuti Morpheus, sang Penguasa Alam Mimpi.",
      category: "Comics",
      image: "/uploads/covers/Sandman.jpg",
      coverUrl: "/uploads/covers/Sandman.jpg",
      publisher: "Vertigo",
      pages: 240,
      year: 1989,
      language: "English",
      available: true,
      featured: true,
      popular: true,
      newArrival: false,
      format: "both"
    }
  ];
  
  // Perbaiki URL gambar
  return staticBooks.map(book => {
    // Generate placeholder jika image tidak valid
    const generatePlaceholder = (title, category) => {
      const colors = {
        'Subject Books': '667eea',
        'Computer Books': '10b981',
        'Comics': 'ef4444',
        'default': '3b82f6'
      };
      const color = colors[category] || colors.default;
      const text = title ? title.substring(0, 2).toUpperCase() : 'BK';
      return `https://via.placeholder.com/300x400/${color}/ffffff?text=${encodeURIComponent(text)}`;
    };
    
    const image = book.image || generatePlaceholder(book.title, book.category);
    const coverUrl = book.coverUrl || image;
    
    return {
      ...book,
      image,
      coverUrl
    };
  });
}

// Fungsi untuk mendapatkan buku berdasarkan kategori
export async function getBooksByCategory(category) {
  const books = await fetchBooksFromAPI();
  return books.filter(book => book.category === category);
}

// Fungsi untuk mendapatkan buku rekomendasi (10 buku)
export async function getRecommendedBooks() {
  const books = await fetchBooksFromAPI();
  return books
    .filter(book => book.featured || book.rating >= 4.5)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 10);
}

// Ekspor variabel untuk kompatibilitas
export const recommendedBooks = [];
export const schoolBooks = [];
export const computerBooks = [];
export const comicBooks = [];
export const allBooks = [];

// Fungsi untuk inisialisasi data 30 buku
export async function initializeBooksData() {
  try {
    const books = await fetchBooksFromAPI();
    
    console.log(`📊 Initializing books data: ${books.length} books total`);
    
    // Update exported variables dengan 30 buku
    recommendedBooks.length = 0;
    recommendedBooks.push(...books
      .filter(book => book.featured || book.rating >= 4.5)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 10)
    );
    
    schoolBooks.length = 0;
    schoolBooks.push(...books.filter(book => book.category === 'Subject Books'));
    
    computerBooks.length = 0;
    computerBooks.push(...books.filter(book => book.category === 'Computer Books'));
    
    comicBooks.length = 0;
    comicBooks.push(...books.filter(book => book.category === 'Comics'));
    
    allBooks.length = 0;
    allBooks.push(...books.slice(0, 30)); // Pastikan maksimal 30 buku
    
    console.log('✅ Books data initialized:', {
      recommended: recommendedBooks.length,
      subject: schoolBooks.length,
      computer: computerBooks.length,
      comics: comicBooks.length,
      total: allBooks.length
    });
    
    return {
      recommendedBooks,
      schoolBooks,
      computerBooks,
      comicBooks,
      allBooks
    };
    
  } catch (error) {
    console.error('❌ Failed to initialize books data:', error);
    
    // Fallback ke static data
    const staticData = getStaticBooks();
    
    recommendedBooks.length = 0;
    recommendedBooks.push(...staticData
      .filter(book => book.featured || book.rating >= 4.5)
      .slice(0, 10)
    );
    
    schoolBooks.length = 0;
    schoolBooks.push(...staticData.filter(book => book.category === 'Subject Books'));
    
    computerBooks.length = 0;
    computerBooks.push(...staticData.filter(book => book.category === 'Computer Books'));
    
    comicBooks.length = 0;
    comicBooks.push(...staticData.filter(book => book.category === 'Comics'));
    
    allBooks.length = 0;
    allBooks.push(...staticData.slice(0, 30));
    
    return {
      recommendedBooks,
      schoolBooks,
      computerBooks,
      comicBooks,
      allBooks
    };
  }
}

// Fungsi untuk mendapatkan semua kategori
export function getAllCategories() {
  const categories = ['All', 'Subject Books', 'Computer Books', 'Comics'];
  return categories;
}

// Ekspor default
export default {
  fetchBooksFromAPI,
  getStaticBooks,
  getBooksByCategory,
  getRecommendedBooks,
  initializeBooksData,
  getAllCategories,
  recommendedBooks,
  schoolBooks,
  computerBooks,
  comicBooks,
  allBooks
};