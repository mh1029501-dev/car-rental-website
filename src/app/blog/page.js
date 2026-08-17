"use client"; 

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';


const blogPosts = [
  { id: 1, slug: 'best-car-rent-in-entire-planet', imageUrl: '/images/car1.avif', title: 'The best car rent in the entire planet', date: 'July 17, 2019', author: 'Admin', excerpt: 'Cars have become an essential part of modern life, offering comfort, reliability, and advanced technology for everyday travel. Each brand brings its own unique design and performance, giving every car a distinct identity.'},
  { id: 2, slug: 'driving-your-dreams-to-reality', imageUrl: '/images/background.jpg', title: 'Driving your dreams to reality', date: 'July 16, 2019', author: 'Admin', excerpt: 'Cars have become an essential part of modern life, offering comfort, reliability, and advanced technology for everyday travel. Each brand brings its own unique design and performance, giving every car a distinct identity.'},
  { id: 3, slug: 'experience-luxury-on-wheels', imageUrl: '/images/car2.avif', title: 'Experience luxury on wheels', date: 'July 15, 2019', author: 'Admin', excerpt: 'Cars have become an essential part of modern life, offering comfort, reliability, and advanced technology for everyday travel. Each brand brings its own unique design and performance, giving every car a distinct identity.'},
  { id: 4, slug: 'affordable-rentals-for-any-journey', imageUrl: '/images/car4.avif', title: 'Affordable rentals for every journey', date: 'July 14, 2019', author: 'Admin', excerpt: 'Cars have become an essential part of modern life, offering comfort, reliability, and advanced technology for everyday travel. Each brand brings its own unique design and performance, giving every car a distinct identity.'},
  { id: 5, slug: 'your-perfect-ride-is-a-click-away', imageUrl: '/images/car3.avif', title: 'Your perfect ride is just a click away', date: 'July 13, 2019', author: 'Admin', excerpt: 'Cars have become an essential part of modern life, offering comfort, reliability, and advanced technology for everyday travel. Each brand brings its own unique design and performance, giving every car a distinct identity.'},
  { id: 6, slug: 'adventures-await-with-our-fleet', imageUrl: 'images/background.jpg', title: 'Adventures await with our fleet', date: 'July 12, 2019', author: 'Admin', excerpt: 'Cars have become an essential part of modern life, offering comfort, reliability, and advanced technology for everyday travel. Each brand brings its own unique design and performance, giving every car a distinct identity.'},
];

const FixedBackground = ({ imageUrl }) => (
  <div className="fixed inset-0 z-[-1]">
    <Image
      src={imageUrl}
      alt="Background"
      fill
      className="object-cover"
      priority
      unoptimized
    />
    <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
  </div>
);

const PageHeader = ({ title, breadcrumbs }) => (
  <div className="relative w-full text-white min-h-[400px] flex flex-col justify-center items-center text-center px-4 animate-fade-in-down">
    <div className="max-w-4xl mx-auto pt-20">
      <h1 className="text-5xl md:text-7xl font-bold drop-shadow-2xl tracking-tight">
        {title}
      </h1>
      <p className="mt-4 text-lg md:text-xl text-gray-200 drop-shadow-md font-medium">
        <Link href="/" className="hover:text-blue-400 transition-colors">Home</Link> 
        <span className="mx-2">/</span> 
        {breadcrumbs}
      </p>
    </div>
  </div>
);

const BlogCard = ({ slug, imageUrl, title, date, author, excerpt, index }) => (
  <Link href={`/blog/${slug}`} className="block group h-full cursor-pointer">
    <div 
      className="bg-white/95 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full flex flex-col"
      style={{
        animation: `fadeInUp 0.6s ease-out forwards`,
        animationDelay: `${index * 100}ms`, 
        opacity: 0 
      }}
    >
      <div className="relative h-56 w-full overflow-hidden">
        <Image
          src={imageUrl || "https://placehold.co/600x400"}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          unoptimized
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
      </div>

      <div className="p-6 flex flex-col grow">
        <div className="flex justify-between items-center text-xs text-gray-500 mb-3 uppercase tracking-wider">
          <span>{date}</span>
          <span className="text-blue-600 font-bold bg-blue-50 px-2 py-1 rounded">{author}</span>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
          {title}
        </h3>

        <p className="text-gray-600 text-sm leading-relaxed grow line-clamp-3">
          {excerpt}
        </p>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <span className="text-blue-600 text-sm font-semibold group-hover:underline flex items-center gap-1">
            Read Article &rarr;
          </span>
        </div>
      </div>
    </div>
  </Link>
);

const CtaBanner = () => (
 
  <div className="relative mt-16 mb-20 overflow-hidden rounded-3xl bg-blue-600/90 backdrop-blur-md border border-white/20 shadow-2xl mx-auto max-w-7xl animate-fade-in-up" style={{ animationDelay: '800ms' }}>
    <div className="max-w-7xl mx-auto py-16 px-8 flex flex-col md:flex-row justify-between items-center text-white">
      <div className="mb-8 md:mb-0 text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">Ready for your next adventure?</h2>
        <p className="text-blue-100 text-lg">Book your dream car today and travel in style.</p>
      </div>

      <Link
        href="/listing"
        className="bg-white text-blue-700 font-bold py-4 px-8 rounded-full shadow-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300"
      >
        Rent a car now
      </Link>
    </div>
  </div>
);

export default function BlogPage() {
  return (
    <>
      <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down {
          animation: fadeInDown 0.8s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>

      <FixedBackground imageUrl="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1000&auto=format&fit=crop" />

      <main className="relative min-h-screen flex flex-col justify-between">
        
        <PageHeader
          title="Our Blog"
          breadcrumbs="Blog"
        />

        <section className="py-10 grow">
          <div className="max-w-7xl mx-auto px-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <BlogCard
                  key={post.id}
                  index={index}
                  slug={post.slug}
                  imageUrl={post.imageUrl}
                  title={post.title}
                  date={post.date}
                  author={post.author}
                  excerpt={post.excerpt}
                />
              ))}
            </div>

          </div>
        </section>

        <CtaBanner />
      </main>
    </>
  );
}