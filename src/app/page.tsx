import Head from 'next/head';
import NowPlaying from './(data feching)/@nowPlaying/NowPlaying';
import Populer from './(data feching)/@populer/Populer';
import Upcoming from './(data feching)/@upcoming/Upcoming';
import Topretd from './(data feching)/@topReted/Topretd';
import Link from 'next/link';
import Image from 'next/image';
import { FaStar } from "react-icons/fa6";

type User = {
  id: number;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
};

export default async function Home() {

  const playing = await NowPlaying();
  const populer = await Populer();
  const upcoming = await Upcoming();
  const topreted = await Topretd();

  return (
    <div className="bg-gradient-to-r from-cyan-800 via-sky-500 to-pink-500">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto px-3 md:px-8 lg:px-16 py-5">
        <div
          className="object-cover w-full bg-center rounded-lg h-[420px]"
          style={{
            backgroundImage: "url('/movieposter.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="bg-black/55 inset-0 flex justify-center items-center rounded-lg py-5 h-[420px]">
            <p className="text-5xl space-y-10 md:text-6xl lg:text-8xl px-3 font-bold text-start bg-gradient-to-r from-cyan-400 via-teal-300 to-pink-400 bg-clip-text text-transparent">
              <span className="text-5xl md:text-6xl lg:text-7xl">Explore World of Movies </span>
              <br />
              <span className='text-white'>With</span>
              <br />
              <span className="text-8xl text-lime-400 lg:text-9xl">US</span>
            </p>
          </div>
        </div>

        {/* now playing section */}

        <div className="py-10 space-y-7">
          <h1 className="text-white shadow-sm shadow-black bg-cyan-600 inline-block py-1 px-3 rounded-2xl uppercase font-medium">
            latest
          </h1>
          <div className="flex space-x-4 overflow-x-auto snap-x snap-mandatory scrollbar-thin scrollbar-thumb">
            {playing.map((item: User) => (
              <div className="text-white flex-none w-60 snap-center" key={item.id}>
                <Link href={`/movie/${item.id}`}>
                  <Image
                    className="object-cover rounded-lg"
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    alt={item.title}
                    height={300}
                    width={300}
                  />
                  <p className=' capitalize flex items-center font-medium'>Rating: <span className='text-neutral-200 pl-1'>{item.vote_average.toFixed(1)}</span> <span className='text-yellow-400 pl-1'><FaStar /></span> </p>
                  <h2 className="text-xl capitalize font-medium">{item.title}</h2>
                  <p className='text-sm capitalize font-medium text-zinc-100'>release: {item.release_date}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>

          
        {/* populer section */}
        
        <div className="py-10 space-y-7">
          <h1 className="text-white shadow-sm shadow-black bg-cyan-600 inline-block py-1 px-3 rounded-2xl uppercase font-medium">
          popular
          </h1>
          <div className="flex space-x-4 overflow-x-auto snap-x snap-mandatory scrollbar-thin scrollbar-thumb">
            {populer.map((item: User) => (
              <div className="text-white flex-none w-60 snap-center" key={item.id}>
                <Link href={`/movie/${item.id}`}>
                  <Image
                    className="object-cover rounded-lg"
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    alt={item.title}
                    height={300}
                    width={300}
                  />
                  <p className=' capitalize flex items-center font-medium'>Rating: <span className='text-neutral-200 pl-1'>{item.vote_average.toFixed(1)}</span> <span className='text-yellow-400 pl-1'><FaStar /></span> </p>
                  <h2 className="text-xl capitalize font-medium">{item.title}</h2>
                  <p className='text-sm capitalize font-medium text-zinc-100'>release: {item.release_date}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>

        

        {/* upcoming section */}
        
        <div className="py-10 space-y-7">
          <h1 className="text-white shadow-sm shadow-black bg-cyan-600 inline-block py-1 px-3 rounded-2xl uppercase font-medium">
          upcoming
          </h1>
          <div className="flex space-x-4 overflow-x-auto snap-x snap-mandatory scrollbar-thin scrollbar-thumb">
            {upcoming.map((item: User) => (
              <div className="text-white flex-none w-60 snap-center" key={item.id}>
                <Link href={`/movie/${item.id}`}>
                  <Image
                    className="object-cover rounded-lg"
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    alt={item.title}
                    height={300}
                    width={300}
                  />
                  <p className=' capitalize flex items-center font-medium'>Rating: <span className='text-neutral-200 pl-1'>{item.vote_average.toFixed(1)}</span> <span className='text-yellow-400 pl-1'><FaStar /></span> </p>
                  <h2 className="text-xl capitalize font-medium">{item.title}</h2>
                  <p className='text-sm capitalize font-medium text-zinc-100'>release: {item.release_date}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>


            {/* Top reated section */}
        
        <div className="py-10 space-y-7">
          <h1 className="text-white shadow-sm shadow-black bg-cyan-600 inline-block py-1 px-3 rounded-2xl uppercase font-medium">
          top rated
          </h1>
          <div className="flex space-x-4 overflow-x-auto snap-x snap-mandatory scrollbar-thin scrollbar-thumb">
            {topreted.map((item: User) => (
              <div className="text-white flex-none w-60 snap-center" key={item.id}>
                <Link href={`/movie/${item.id}`}>
                  <Image
                    className="object-cover rounded-lg"
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    alt={item.title}
                    height={300}
                    width={300}
                  />
                  <p className=' capitalize flex items-center font-medium'>Rating: <span className='text-neutral-200 pl-1'>{item.vote_average.toFixed(1)}</span> <span className='text-yellow-400 pl-1'><FaStar /></span> </p>
                  <h2 className="text-xl capitalize font-medium">{item.title}</h2>
                  <p className='text-sm capitalize font-medium text-zinc-100'>release: {item.release_date}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>



      </div>
    </div>
  );
}
