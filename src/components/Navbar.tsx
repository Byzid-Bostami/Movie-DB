import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Search from './Search';

const Navbar = () => {
  return (
    <div className="bg-[#032541]">
      <div className="container mx-auto px-3 md:px-8 lg:px-16 py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="w-full">
            <Link href={'/'}>
              <Image
                className="h-auto  w-36 md:w-52"
                src="/logo.svg"
                alt="movie db"
                width={200}
                height={100}
              />
            </Link>
          </div>

          {/* Search Section */}
          <Search />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
