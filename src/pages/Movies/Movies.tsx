import { useEffect, useRef, useState } from "react";
import Search from "../../assets/fa-search.png";
import GridLayout from "../../assets/grid.png";
import ListLayout from "../../assets/list.png";
import layoutType from "../../constants/layoutType";
import movieType from "../../constants/movieType";
import {
  API_KEY_PARAMS,
  API_URL,
  IMG_URL,
  searchURL,
} from "../../constants/url";
import { IMovie, IMoviesResponse } from "../../types/movie.type";

function Movies() {
  const [tab, setTab] = useState<number>(1);
  const [layout, setLayout] = useState<number>(1);
  const [isTyped, setIsTyped] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const toggleNoti = (type: string, message: string) => {
    const snack = document.getElementById("snackbar") as HTMLElement;
    snack.innerHTML = message;
    snack.className = `show ${type === "error" ? "error" : "success"}`;
    setTimeout(function () {
      snack.className = snack.className.replace("show", "");
    }, 3000);
  };
  const fetchMovies = async (searchVal?: string) => {
    try {
      const url = searchVal
        ? searchURL + "&query=" + searchVal
        : API_URL +
          `/${tab === movieType.nowPlaying ? "now_playing" : "top_rated"}?` +
          API_KEY_PARAMS;
      const response: IMoviesResponse = await (await fetch(url)).json();

      if (response?.success === false) {
        throw new Error(response?.status_message);
      }
      setMovies(response.results);
      setLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        toggleNoti("error", error?.message || "Something went wrong!");
        setLoading(false);
      }
    }
  };

  const handleType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTyped(true);
    setSearchValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      fetchMovies(searchValue);
    }
  };
  const handleSearch = () => {
    fetchMovies(searchValue);
  };

  useEffect(() => {
    setLoading(true);
    setMovies([]);
    setTimeout(() => {
      fetchMovies();
    }, 3000);
  }, [tab]);

  useEffect(() => {
    if (searchValue.length === 0 && isTyped) fetchMovies();
  }, [searchValue]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            img.src = img.dataset.src as string;
            observer.unobserve(img);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );
    const images = (imgRef.current as HTMLElement).querySelectorAll("img");
    images.forEach((img) => observer.observe(img));
    return () => {
      observer.disconnect();
    };
  }, [movies]);

  return (
    <div className="movies">
      <div className="filter-field d-flex jc-space-between ai-center">
        <div className="tabs d-flex">
          <div
            onClick={() => setTab(movieType.nowPlaying)}
            className={`tab ${tab === movieType.nowPlaying ? "chose-tab" : ""}`}
          >
            Now Playing
          </div>
          <div
            onClick={() => setTab(movieType.topRated)}
            className={`tab ${tab === movieType.topRated ? "chose-tab" : ""}`}
          >
            Top Rated
          </div>
        </div>

        <div className="layout-field d-flex ai-center">
          <div className="d-flex ai-center p-relative search-field">
            <input
              id="search-input"
              className="search-inp"
              type="text"
              placeholder="Search..."
              onChange={handleType}
              onKeyDown={handleKeyPress}
            />
            <img
              onClick={handleSearch}
              className="p-absolute search-icon"
              src={Search}
              alt=""
              width={24}
              height={24}
            />
          </div>
          <img
            className={`layout-icon ${
              layout === layoutType.grid ? "chose-layout" : ""
            }`}
            src={GridLayout}
            alt=""
            width={28}
            height={28}
            onClick={() => setLayout(layoutType.grid)}
          />
          <img
            className={`layout-icon ${
              layout === layoutType.list ? "chose-layout" : ""
            }`}
            src={ListLayout}
            alt=""
            width={28}
            height={28}
            onClick={() => setLayout(layoutType.list)}
          />
        </div>
      </div>
      <div
        className={`movies-container d-flex ${
          layout === layoutType.grid ? "grid-layout" : "list-layout"
        }`}
        ref={imgRef}
      >
        {loading &&
          [...Array(Math.floor(window.innerWidth / 300) * 2)].map(() => (
            <div className="card">
              <div className="card-img skeleton"></div>
              <div className="card-body">
                <h2 className="card-title skeleton"></h2>
              </div>
            </div>
          ))}
        {movies?.map((movie: IMovie) => {
          return (
            <div className="card" key={movie.id}>
              <img
                data-src={IMG_URL + movie.poster_path}
                alt={movie.title}
                width={300}
                loading="lazy"
              />
              {layout === layoutType.grid ? (
                <div className="card-name">{movie.title}</div>
              ) : (
                <div className="card-name">
                  <div className="movie-name">{movie.title}</div>
                  <div className="movie-overview">{movie.overview}</div>
                </div>
              )}
              <div className="overview">
                <h3 className="overview-text">Overview</h3>
                <div className="overview-text detail">{movie.overview}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Movies;
