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

// Data statis 30 buku lengkap dengan deskripsi lengkap
export function getStaticBooks() {
  console.log('📚 Loading static books data (30 books with full descriptions)...');
  
  const staticBooks = [
    // =========== SUBJECT BOOKS (10 buku) ===========
    {
      id: 1,
      title: "English Grammar in Use",
      author: "Raymond Murphy",
      rating: 4.8,
      description: "Dianggap sebagai 'kitab suci' tata bahasa Inggris untuk pelajar mandiri tingkat menengah. Keunggulan utama buku ini terletak pada formatnya yang dua halaman: penjelasan kaidah yang jelas dan sederhana di halaman kiri, diikuti oleh latihan soal yang melimpah di halaman kanan. Buku ini sangat praktis, membahas satu topik per unit, sehingga pembaca bisa fokus dan belajar sesuai kebutuhan. Edisi terbaru sering menyertakan e-book interaktif dan audio. Cocok untuk siapa saja yang ingin membangun fondasi grammar yang kokoh.",
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
      description: "Lebih dari sekadar buku grammar, ini adalah panduan komprehensif untuk menggunakan bahasa Inggris dengan benar. Buku ini menjawab pertanyaan-pertanyaan rumit yang sering muncul, seperti perbedaan antara 'say' dan 'tell', kapan menggunakan tenses tertentu, atau masalah idiom dan gaya bahasa. Disusun seperti kamus, membuatnya mudah untuk mencari topik spesifik. Sangat direkomendasikan untuk guru, pelajar tingkat lanjut, dan siapa pun yang ingin menyempurnakan pemahaman mereka tentang nuansa bahasa Inggris.",
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
      description: "Buku ini bukan tentang menghafal daftar kata. Ini adalah sistem yang menyenangkan dan efektif untuk memperluas kosakata dengan memahami akar kata (dari bahasa Latin dan Yunani), awalan, dan akhiran. Setiap bab membangun kosakata baru di sekitar tema tertentu (seperti kepribadian, dokter, atau sains) melalui cerita, latihan, dan tes. Pendekatannya kontekstual, yang membantu kata-kata baru menempel lebih kuat di memori dan meningkatkan kemampuan menebak makna kata asing.",
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
      description: "Meski bukan buku teknis bahasa, buku ini adalah masterclass dalam komunikasi interpersonal yang efektif, yang merupakan inti dari penguasaan bahasa. Prinsip-prinsip abadinya—seperti menjadi pendengar yang baik, menunjukkan penghargaan yang tulus, dan menghindari argumentasi—mengajarkan bagaimana menggunakan bahasa Inggris (atau bahasa apa pun) untuk membangun hubungan, bukan sekadar menyusun kalimat. Sangat berguna untuk percakapan sehari-hari, presentasi bisnis, atau wawancara kerja.",
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
      description: "Buku tipis yang sangat berpengaruh ini adalah manual untuk menulis bahasa Inggris yang jernih, ringkas, dan kuat. Aturan-aturannya, seperti 'Omit needless words' (Hilangkan kata-kata yang tidak perlu) dan 'Use the active voice' (Gunakan kalimat aktif), telah membentuk gaya penulisan profesional selama hampir seabad. Cocok untuk penulis, siswa, atau siapa pun yang ingin meningkatkan kualitas tulisan mereka, baik untuk esai akademis, email bisnis, atau karya kreatif.",
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
      description: "Membaca novel klasik adalah cara terbaik untuk mengalami bahasa Inggris dalam bentuknya yang paling kuat dan puitis. 1984 bukan hanya karya distopia yang visioner, tetapi juga eksplorasi mendalam tentang kekuatan bahasa. Orwell memperkenalkan konsep seperti 'Newspeak'—bahasa yang sengaja dibuat miskin untuk membatasi pemikiran—yang menunjukkan betapa pentingnya kosakata dan kemampuan berekspresi. Membacanya akan memperkaya kosakata sastra dan pemahaman tentang struktur narasi yang kompleks.",
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
      description: "Seri ini merevolusi cara belajar bahasa dengan pendekatan visual yang sangat intuitif. Setiap konsep tata bahasa, kosakata, atau fungsi percakapan dijelaskan dengan diagram, grafik infografis, dan ilustrasi yang menarik. Buku Level Advanced ini cocok untuk pelajar yang ingin melampaui tingkat menengah, membahas idiom yang lebih kompleks, perbedaan nuansa antar kata sinonim, dan struktur kalimat yang canggih. Sempurna untuk pelajar visual yang merasa bosan dengan buku teks konvensional.",
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
      description: "Buku ini mengatasi kesenjangan antara 'bahasa Inggris yang benar secara gramatikal' dan 'bahasa Inggris yang terdengar alami'. Collocation adalah pasangan kata yang sering digunakan bersama oleh penutur asli (misalnya, 'make a decision', 'heavy rain', 'strongly recommend'). Buku ini mengajarkan ribuan collocation umum yang dikelompokkan berdasarkan topik (seperti bisnis, media, atau emosi), membantu pembelajar terdengar lebih fasih dan natural dalam berbicara dan menulis.",
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
      description: "Ini adalah sumber persiapan TOEFL yang paling otoritatif karena diterbitkan langsung oleh pembuat tes. Buku ini berisi ratusan soal latihan asli, tes praktik lengkap, penjelasan mendetail untuk setiap jenis soal (Reading, Listening, Speaking, Writing), dan strategi langsung dari para ahli tes. Memiliki buku ini berarti Anda berlatih dengan materi yang paling mencerminkan tingkat kesulitan dan format tes yang sebenarnya.",
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
      description: "Panduan praktis untuk tata bahasa dan tanda baca dengan aturan yang jelas dan contoh dunia nyata. Buku ini menyajikan pedoman yang mudah dipahami untuk masalah umum seperti penggunaan koma, apostrof, dan titik koma. Dilengkapi dengan kuis dan latihan untuk menguji pemahaman. Cocok untuk siswa, penulis, dan profesional yang ingin meningkatkan kemampuan menulis mereka dengan tata bahasa yang tepat dan efektif.",
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
      description: "Sering disebut sebagai 'Alkitab Algoritma', buku teks monumental ini adalah bacaan wajib di departemen ilmu komputer terkemuka di dunia. Cakupannya sangat luas dan mendalam, membahas segala hal mulai dari algoritma dasar (sorting, searching) hingga topik lanjutan seperti algoritma graf, pemrograman dinamis, dan teori NP-completeness. Penjelasannya ketat secara matematis namun tetap jelas, dilengkapi dengan pseudocode dan analisis bukti. Buku ini lebih dari sekadar teks; ini adalah referensi seumur hidup.",
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
      description: "Buku ini mengubah cara programmer berpikir tentang kode mereka. 'Uncle Bob' berargumen bahwa kode yang berfungsi saja tidak cukup; kode harus bersih—mudah dibaca, dipahami, dan dipelihara oleh orang lain (atau diri sendiri di masa depan). Buku ini penuh dengan contoh konkret, dari kode 'kotor' yang di-refactor menjadi kode 'bersih', membahas penamaan variabel, struktur fungsi, komentar, dan desain kelas. Wajib dibaca untuk siapa pun yang ingin berkembang dari pemrogram menjadi pengrajin perangkat lunak.",
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
      description: "Sebuah kompendium kebijaksanaan yang praktis dan abadi. Buku ini tidak mengajarkan sintaks bahasa pemrograman tertentu, tetapi memberi Anda toolkit mental dan praktis untuk menghadapi tantangan pengembangan perangkat lunak yang kompleks. Konsep seperti 'DRY' (Don't Repeat Yourself), 'The Cat Ate My Source Code', dan 'Tracer Bullets' telah menjadi bagian dari kosakata industri. Edisi terbaru diperbarui dengan contoh-contoh modern dan membahas topik kontemporer seperti arsitektur dan pola-pola pengembangan.",
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
      description: "Pernah bertanya-tanya bagaimana sebenarnya komputer bekerja, dari dasar? Buku ini adalah jawabannya. Dengan gaya narasi yang menawan, Petzold memulai dari dasar-dasar seperti kode Morse dan sirkuit lampu, kemudian secara bertahap membangun konsep menuju gerbang logika, memori, CPU, dan akhirnya bahasa pemrograman sederhana. Ini adalah perjalanan yang menghubungkan titik-titik antara listrik dan piksel di layar Anda. Sangat direkomendasikan untuk pemula yang penasaran atau bahkan programmer senior yang ingin mengisi celah pengetahuan fundamental mereka.",
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
      description: "Buku yang meluncurkan revolusi pola desain dalam pengembangan perangkat lunak. Buku ini mengkatalogkan 23 pola desain klasik (seperti Singleton, Observer, Factory, Strategy) yang menyediakan solusi yang elegan dan dapat digunakan kembali untuk masalah desain yang umum terjadi. Meski membahas konsep yang kompleks, pola-pola ini menjadi bahasa umum bagi tim pengembang. Membaca buku ini seperti mendapatkan kunci untuk memahami arsitektur sistem perangkat lunak tingkat lanjut dan komunikasi antar-pengembang.",
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
      description: "Jika buku CLRS terasa terlalu menakutkan, Grokking Algorithms adalah pintu masuk yang sempurna. Buku ini menjelaskan algoritma dan struktur data penting (seperti pencarian biner, quicksort, graf, pemrograman dinamis) dengan menggunakan ratusan ilustrasi lucu dan analogi kehidupan nyata. Gaya penjelasannya yang visual membuat konsep abstrak menjadi konkret dan mudah dipahami. Cocok untuk pemula mutlak, siswa yang kesulitan dengan teks tradisional, atau programmer yang ingin review cepat dengan cara yang menyenangkan.",
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
      description: "Kumpulan esai klasik tentang manajemen proyek perangkat lunak, yang masih sangat relevan hingga hari ini. Brooks memperkenalkan prinsip-prinsip abadi seperti 'Menambahkan tenaga manusia ke proyek yang terlambat justru akan membuatnya lebih terlambat' (The Mythical Man-Month) dan 'Tidak ada silver bullet' untuk menyelesaikan semua masalah kompleksitas perangkat lunak. Buku ini memberikan wawasan mendalam tentang tantangan manusia dan organisasi dalam rekayasa perangkat lunak skala besar.",
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
      description: "Salah satu buku pengantar pemrograman Python terbaik untuk pemula mutlak. Buku ini dibagi menjadi dua bagian besar. Bagian pertama mengajarkan dasar-dasar Python (variabel, list, loop, fungsi, kelas) dengan cara yang jelas dan langsung. Bagian kedua terdiri dari tiga proyek praktis yang menyenangkan: membuat game Alien Invasion (dengan Pygame), membuat visualisasi data, dan membangun aplikasi web sederhana dengan Django. Pendekatan 'belajar sambil membuat' ini sangat efektif.",
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
      description: "Buku klasik tentang usability (kemudahan penggunaan) web yang ditulis dengan gaya yang ringan, lucu, dan sangat mudah dicerna. Prinsip utamanya sederhana: sebuah situs web atau aplikasi seharusnya tidak membuat pengguna berpikir keras. Krug menjelaskan prinsip-prinsip navigasi, tata letak halaman, dan pengujian usability dengan contoh-contoh konkret. Bacaan wajib bagi desainer, pengembang, dan siapa pun yang terlibat dalam pembuatan produk digital.",
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
      description: "Buku legendaris dari MIT yang menggunakan bahasa Scheme (dialek Lisp) untuk mengajarkan prinsip-prinsip fundamental komputasi dan pemrograman. Buku ini lebih menekankan pada konsep abstrak seperti abstraksi, rekursi, interpretasi, dan bahasa pemrograman itu sendiri, daripada sintaks bahasa tertentu. Meski menantang, buku ini dikreditkan dapat mengubah cara berpikir programmer tentang kode mereka. Sering disebut sebagai 'buku penyelam dalam' untuk ilmu komputer.",
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
      description: "Sebuah karya yang tidak hanya mendefinisikan ulang genre pahlawan super, tetapi juga memperluas batas medium komik. Berlatar di era Perang Dingin yang muram, ceritanya mengikuti sekelompok vigilante yang sudah pensiun yang terlibat dalam konspirasi pembunuhan yang lebih besar. Moore dan Gibbons menggunakan setiap aspek komik—panel, warna, teks pendamping (seperti dokumen fiksi dan esai)—untuk membangun dunia yang kompleks dan kaya. Eksplorasi mendalam tentang moralitas, kekuasaan, dan waktu ini adalah bacaan wajib untuk memahami potensi seni narasi grafis.",
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
      description: "Sebuah mahakarya dark fantasy yang epik dan tak tertandingi dalam skala dan intensitasnya. Mengikuti perjalanan Guts, seorang pendekar pedang yang dikutuk dan penuh trauma, melawan takdir mengerikan dan makhluk iblis (Apostles). Keindahan tragis dari ilustrasi Miura yang sangat detail dan rumit kontras dengan kekerasan dan tema gelap cerita. Ini adalah studi karakter yang mendalam tentang ketahanan, persahabatan yang korosif, dan perjuangan manusia melawan kekuatan kosmik yang kejam. Peringatan: Mengandung konten dewasa yang sangat ekstrem.",
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
      description: "Novel grafis otobiografi yang kuat dan mengharukan yang menceritakan masa kecil dan remaja Satrapi di Teheran selama Revolusi Islam dan Perang Iran-Irak, serta pengalamannya sebagai remaja di Eropa. Digambar dengan gaya hitam-putih yang sederhana namun ekspresif, buku ini menghadirkan sejarah yang kompleks melalui lensa personal yang jujur, penuh humor, dan penuh hati. Ini adalah kisah universal tentang pencarian identitas, arti rumah, dan ketahanan jiwa manusia di tengah gejolak politik.",
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
      description: "Petualangan manga terlaris sepanjang masa yang terus berlangsung selama lebih dari dua dekade. Mengikuti Monkey D. Luffy, seorang pemuda dengan tubuh karet, dan kru bajak lautnya yang berwarna-warni dalam pencarian mereka untuk menemukan harta karun legendaris, 'One Piece'. Kekuatan seri ini terletak pada penciptaan dunia yang sangat imajinatif, sistem kekuatan yang kreatif (Buah Iblis), dan tema persahabatan, mimpi, dan kebebasan yang abadi. Oda memiliki kemampuan luar biasa untuk mencampur komedi slapstick dengan momen dramatis yang menghancurkan hati.",
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
      description: "Sebuah karya monumental yang memenangkan Hadiah Pulitzer khusus. Spiegelman menceritakan kisah ayahnya, seorang korban selamat Holocaust, dengan meta-narasi yang cerdas: orang Yahudi digambarkan sebagai tikus, Nazi sebagai kucing, orang Polandia sebagai babi. Penggambaran alegoris ini tidak menyederhanakan sejarah, tetapi justru memperkuat dampak emosional dan kompleksitas moralnya. Buku ini juga jujur menggambarkan hubungan Spiegelman yang tegang dengan ayahnya, menciptakan karya yang tidak hanya tentang sejarah, tetapi juga tentang ingatan, trauma antargenerasi, dan beban bercerita.",
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
      description: "Dijuluki 'Star Wars meets Game of Thrones', Saga adalah space opera/fantasi epik untuk pembaca dewasa. Ceritanya berpusat pada dua tentara musuh, Alana dan Marko, yang jatuh cinta dan melahirkan anak perempuan, Hazel, menjadi buronan dari kedua pihak yang berperang. Narasinya diceritakan dari perspektif Hazel di masa depan. Seri ini memukau dengan imajinasi liar, karakter yang kompleks dan berkembang, humor gelap, dan ilustrasi Fiona Staples yang memesona. Saga mengeksplorasi tema perang, keluarga, rasisme, dan seksualitas dengan kedalaman yang jarang ditemukan dalam medium apa pun.",
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
      description: "Buku yang secara radikal mengubah Batman—dan seluruh industri komik pahlawan super—menjadi lebih gelap dan lebih dewasa. Berlatar di masa depan Gotham yang dystopian, menceritakan Bruce Wayne berusia 55 tahun yang keluar dari masa pensiunnya untuk melawan kejahatan sekali lagi. Gaya visual Miller yang kasar dan sinematik, dengan panel-panel yang penuh kekuatan, dan penokohan Batman yang lebih kejam dan sinis, menciptakan suasana yang tegang dan tak terlupakan. Pengaruhnya terasa di hampir setiap adaptasi Batman selanjutnya.",
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
      description: "Sebuah manga shonen yang nyaris sempurna, dengan alur cerita yang sangat rapi dari awal hingga akhir. Mengikuti kisah Edward dan Alphonse Elric, dua bersaudara yang melakukan kesalahan besar dalam alkimia dan kini berusaha memperbaiki tubuh mereka. Ceritanya menggabungkan aksi yang seru, sistem 'magic' yang logis (Hukum Equivalent Exchange), humor yang hangat, dan eksplorasi filosofis yang dalam tentang dosa, penebusan, dan etika sains. Plotnya padat tanpa filler, dengan karakter antagonis yang memiliki motivasi yang dapat dimengerti.",
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
      description: "Thriller psikologis yang memukau dengan premis sederhana namun genius. Light Yagami, siswa SMA jenius, menemukan buku catatan supernatural (Death Note) yang dapat membunuh siapa pun yang namanya ditulis di dalamnya. Dia memutuskan menjadi 'dewa' dunia baru dengan menghabisi penjahat. Hal ini memicu permainan kucing-tikus intelektual yang intens dengan detektif misterius bernama L. Seri ini adalah studi tentang kejahatan, keadilan, dan godaan kekuasaan yang absolut, dituturkan dengan ketegangan yang terus meningkat.",
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
      description: "Sebuah mahakarya sastra dalam bentuk komik. Seri ini mengikuti Morpheus, sang Penguasa Alam Mimpi (Dream), salah satu dari tujuh makhluk abadi yang disebut The Endless. Ceritanya bukan satu narasi linear, tetapi kumpulan saga yang saling terhubung, berayun dari mitologi kuno, sejarah Shakespeare, hingga ke neraka dan konvensi serial pembunuh. Gaiman mengeksplorasi tema mimpi, cerita, kematian, dan perubahan dengan kedalaman filosofis dan puitisme yang langka. Ini adalah bacaan yang kaya dan imersif.",
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