import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Share2 } from 'lucide-react';

const blogPosts = [
  { id: 1, slug: 'best-car-rent-in-entire-planet', imageUrl: '/images/car1.avif', title: 'The best car rent in the entire planet', date: 'July 17, 2019', author: 'Admin', excerpt: 'This ia a Luxury car' },
  { id: 2, slug: 'driving-your-dreams-to-reality', imageUrl: '/images/background.jpg', title: 'Driving your dreams to reality', date: 'July 16, 2019', author: 'Admin', excerpt: 'This is a luxury car' },
  { id: 3, slug: 'experience-luxury-on-wheels', imageUrl: '/images/car2.avif', title: 'Experience luxury on wheels', date: 'July 15, 2019', author: 'Admin', excerpt: 'this is luxury car' },
  { id: 4, slug: 'affordable-rentals-for-any-journey', imageUrl: '/images/car4.avif', title: 'Affordable rentals for every journey', date: 'July 14, 2019', author: 'Admin', excerpt: 'this is a luxury car' },
  { id: 5, slug: 'your-perfect-ride-is-a-click-away', imageUrl: '/images/car3.avif', title: 'Your perfect ride is just a click away', date: 'July 13, 2019', author: 'Admin', excerpt: 'this is a luxury car' },
  { id: 6, slug: 'adventures-await-with-our-fleet', imageUrl: '/images/background.jpg', title: 'Adventures await with our fleet', date: 'July 12, 2019', author: 'Admin', excerpt: 'this is a luxury car' },
];

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }) {

  const { slug } = await params;

  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return <div className="h-screen flex items-center justify-center text-gray-700">Post not found: {slug}</div>;
  }

  return (
    <div className="min-h-screen bg-white py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/blog" className="flex items-center text-blue-600 mb-6 hover:underline">
          <ArrowLeft size={18} className="mr-2" /> Back to Blog
        </Link>
        <h1 className="text-4xl font-bold mb-4 text-gray-900">{post.title}</h1>

        {/* Safe image check + Fixed leading slash */}
        {post.imageUrl && (
          <div className="relative h-96 w-full rounded-xl overflow-hidden mb-8">
            <Image
              src={post.imageUrl}
              alt={post.title || "Blog Post Image"}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="prose lg:prose-xl text-gray-700">
          <p>Here goes the full content for {post.title}...</p>
          <p>Cars have become an essential part of modern life, offering comfort, reliability, and advanced technology for everyday travel. Each brand brings its own unique design and performance, giving every car a distinct identity.</p>
        </div>
      </div>
    </div>
  );
}