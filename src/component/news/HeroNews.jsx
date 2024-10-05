/* eslint-disable react/prop-types */
function HeroNews({ article }) {
  return (
    <>      
      <div className="bg-slate-500 w-full relative">
        {/* Gambar background */}
        <figure className="absolute w-full h-full">
          <img
            src={`http://www.nytimes.com/${article.multimedia[0].url}`}
            alt={article.headline.main}
            className="w-full h-full object-cover mix-blend-overlay pointer-events-none" />
        </figure>
        
        {/* Overlay Background */}
        <div className="absolute inset-0 bg-slate-900 opacity-55"></div>
        
        {/* Konten di atas gambar */}
        <div className="relative z-10 mx-auto max-w-2xl py-28 px-16 lg:px-0 ">
          <div className="text-center ">
            <h1 className="text-4xl font-bold tracking-tight text-amber-300 sm:text-6xl">
              {article.headline.main}
            </h1>
            <p className="mt-6 text-lg leading-8 text-white">
              {article.lead_paragraph}
            </p>
            <div className="mt-10 flex items-center justify-center">
              <a href={article.web_url} className="text-sm font-semibold leading-6 text-white hover:text-amber-600">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeroNews;