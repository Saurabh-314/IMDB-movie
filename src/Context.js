import React, { useContext, useEffect, useState } from 'react'

// const API_URL = `http://www.omdbapi.com/?i=tt3896198&apikey=714df6ad`
export const API_URL = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`;

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState({ show: "false", msg: "" })
  const [query, setQuery] = useState("avenger")

  const getMovie = async (url) => {
    setIsLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.Response === "True") {
        setIsLoading(false);
        setMovies(data.Search);
        setIsError({
          show: false,
          msg: ""
        })
      } else {
        setIsError({
          show: true,
          msg: data.Error
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    let timer = setTimeout(() => {
      getMovie(`${API_URL}&s=${query}`);
    }, 500)
    return (() => {
      clearTimeout(timer)
    })
  }, [query])

  return <AppContext.Provider value={{ isLoading, isError, movies, query, setQuery }}>
    {children}
  </AppContext.Provider>
}

const useGlobalContext = () => {
  return useContext(AppContext);
}

export { AppContext, AppProvider, useGlobalContext };