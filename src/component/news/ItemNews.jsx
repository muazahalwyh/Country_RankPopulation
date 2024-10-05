/* eslint-disable react/prop-types */
function ItemNews({ article }) {
    const imageUrl = article.multimedia && article.multimedia.length > 0 
        ? `http://www.nytimes.com/${article.multimedia[0].url}` 
        : 'https://www.risd.edu/sites/g/files/upbtqy111/files/styles/landscape_3_2_250x166/public/2021-05/NYT.png?h=252f27fa&itok=mqRrhoSq'; // Gambar placeholder jika tidak ada

    return (
        <div className="card bg-white w-94 shadow-xl">
            <div className="card relative justify-center">
                <figure>
                <img
                    src={imageUrl}
                    alt={article.headline.main}
                    className="h-80 w-full "
                />
                </figure>
                <div className="card-body break-normal text-black">
                    <h2 className="font-bold text-justify">{article.headline.main}</h2>
                    <p className="line-clamp-3 font-normal text-justify">{article.lead_paragraph}</p>
                    <div className="card-actions justify-end mt-2">
                        <a href={article.web_url} target="_blank" className="text-sm font-semibold leading-6 text-amber-600 hover:text-amber-900">
                            Learn more <span aria-hidden="true">→</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ItemNews;
