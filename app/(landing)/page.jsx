"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  function goToLogin() {
    router.push("/login");
  }

  const books = [
    { title: "Main Textbooks for Vocational Schools" },
    { title: "Self-Development & General Literacy Books" },
    { title: "Self-Development & General Literacy Books" },
    { title: "Main Textbooks for Vocational Schools" },
    { title: "Main Textbooks for Vocational Schools" },
    { title: "Main Textbooks for Vocational Schools" },
  ];

  const testimonials = [
    { name: "Lorem ipsum", status: "Siswa", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer maximus nec tortor id blandit." },
    { name: "Lorem ipsum", status: "Siswa", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer maximus nec tortor id blandit." },
    { name: "Lorem ipsum", status: "Siswa", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer maximus nec tortor id blandit." },
    { name: "Lorem ipsum", status: "Siswa", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer maximus nec tortor id blandit." },
    { name: "Lorem ipsum", status: "Siswa", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer maximus nec tortor id blandit." },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-white to-blue-50 w-full overflow-hidden">

      {/* Hero Section */}
      <section className="w-full flex flex-col md:flex-row items-center justify-center gap-10 px-6 md:px-20 py-20 relative">
        <div className="absolute top-5 left-10 w-28 h-28 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-60 z-0 blur-xl"></div>
        <div className="absolute top-40 left-1/4 w-24 h-24 bg-gradient-to-br from-indigo-100 to-blue-50 rounded-full opacity-60 z-0 blur-lg"></div>
        <div className="absolute bottom-10 left-1/3 w-28 h-28 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full opacity-60 z-0 blur-xl"></div>
        <div className="absolute bottom-24 right-20 w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full opacity-60 z-0 blur-xl"></div>
        <div className="absolute top-1/2 right-5 w-20 h-20 bg-gradient-to-br from-blue-50 to-purple-100 rounded-full opacity-60 z-0 blur-lg"></div>

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full md:w-1/2 flex justify-center md:pl-10"
        >
          <Image
            src="/image/Fototb (2).png"
            alt="School Building"
            width={650}
            height={400}
            className="rounded-2xl shadow-xl object-cover border-[6px] border-white relative z-20"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full md:w-1/2 text-center md:text-left"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-black">
            Welcome To TB Digital Reads
          </h1>
          <p className="text-gray-600 mb-6 leading-relaxed">
            TB Digital Reads is the official digital reading platform of SMK Taruna Bakti,
            designed to support a more modern, practical, and efficient teaching and learning
            process. Through this portal, students can access a diverse collection of textbooks,
            learning modules, and supporting literacy resources quickly and without time
            constraints.
          </p>

          <button
            onClick={goToLogin}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition transform hover:scale-105"
          >
            Go Now!!
          </button>
        </motion.div>
      </section>

      {/* CHOOSE YOUR BOOK */}
      <section id="books" className="w-full py-16 flex flex-col items-center bg-gradient-to-b from-white to-indigo-50">
        <h2 className="text-3xl font-bold mb-12 text-gray-900">
          <span className="text-black">Choose Your</span>{" "}
          <span className="text-blue-600">Book</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {books.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="w-72 bg-white shadow-lg p-6 rounded-xl flex flex-col items-center hover:shadow-2xl transition-all border border-blue-50"
            >
              <img
                src="/image/Sample-book.png"
                alt="Book Icon"
                className="w-32 h-32 mb-4"
              />

              <p className="text-center font-medium text-sm mb-6">{item.title}</p>

              <button
                onClick={goToLogin}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-95 text-white text-sm font-medium py-2 px-6 rounded-full shadow-md"
              >
                Go Now!!
              </button>
            </motion.div>
          ))}
        </div>
      </section>

   {/* TESTIMONIAL SLIDER DOUBLE */}
<section
  id="testimonials"
  className="w-full py-20 text-center overflow-hidden bg-gradient-to-br from-white via-indigo-50 to-blue-50"
>
  <h2 className="text-3xl font-bold mb-10 text-gray-900">
    <span className="text-blue-600">TB Digital Reads</span>{" "}
    Becomes a Solution for Young People's Work
  </h2>

  {/* SLIDER 1 - MOVE LEFT */}
  <motion.div
    initial={{ x: 0 }}
    animate={{ x: "-50%" }}
    transition={{ repeat: Infinity, repeatType: "loop", duration: 18, ease: "linear" }}
    className="flex gap-6 w-[200%] mb-10"
  >
    {[...testimonials, ...testimonials].map((item, index) => (
      <div
        key={index}
        className="w-80 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-md border border-blue-100"
      >
        <p className="text-left italic text-gray-700 mb-6">"{item.text}"</p>
        <div className="flex items-center gap-3">
          <span className="text-3xl">👤</span>
          <div className="text-left">
            <p className="font-bold">{item.name}</p>
            <p className="text-sm text-gray-600">{item.status}</p>
          </div>
        </div>
      </div>
    ))}
  </motion.div>

  {/* SLIDER 2 - MOVE RIGHT */}
  <motion.div
    initial={{ x: "-50%" }}
    animate={{ x: 0 }}
    transition={{ repeat: Infinity, repeatType: "loop", duration: 18, ease: "linear" }}
    className="flex gap-6 w-[200%]"
  >
    {[...testimonials, ...testimonials].map((item, index) => (
      <div
        key={index}
        className="w-80 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-md border border-blue-100"
      >
        <p className="text-left italic text-gray-700 mb-6">"{item.text}"</p>
        <div className="flex items-center gap-3">
          <span className="text-3xl">👤</span>
          <div className="text-left">
            <p className="font-bold">{item.name}</p>
            <p className="text-sm text-gray-600">{item.status}</p>
          </div>
        </div>
      </div>
    ))}
  </motion.div>
</section>
    </main>
  )
}
