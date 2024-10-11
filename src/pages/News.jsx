/* eslint-disable react/no-unescaped-entities */
import { useEffect } from 'react';
import HeroNews from '../component/news/HeroNews';
import ItemNews from '../component/news/ItemNews';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles } from '../redux/articlesSlice';

function News() {
  const dispatch = useDispatch();
  const { articles, isLoading, errorMessage } = useSelector((state) => state.article);
  
  useEffect(() => {
    dispatch(fetchArticles('peace'));
  }, [dispatch]);

  // Jika terjadi loading, tampilkan pesan error
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <button className="btn items-center flex">
          <span className="loading loading-spinner mr-2"></span>
          loading...
        </button>
      </div>
    );

  // // Jika terjadi error, tampilkan pesan error
  if (errorMessage) {
    return <div className="flex justify-center items-center h-screen">Error: {errorMessage}</div>;
  }

  return (
    <div className="bg-amber-100">
      {articles.length > 0 && (
        <HeroNews key={articles[0]._id} article={articles[0]} />
      )}

      <div className='mt-8 mb-2 text-center'>
        <span className='font-bold text-2xl text-amber-600'>What’s Happening Now? Get the Facts Here!</span>
        <p className='font-normal mt-2'>
          "Every story deserves to be told, and every voice deserves to be heard."
        </p>
        <hr className="border-2 sm:ml-40 sm:mr-40 ml-80 mr-80 mt-4 border-gray-400" />
      </div>

      <div className='grid gap-x-8 gap-y-10 md:grid-cols-3 grid-cols-1 p-8'>
        {articles.slice(1, 10).map((articles) => (
          <ItemNews key={articles._id} article={articles} />
        ))}
      </div>
    </div>
  );
}

export default News;
