import React, { useState, useEffect } from 'react';

import { Md5 } from 'ts-md5/dist/md5';
import { Link } from 'react-router-dom';
import { Character } from '../../models/Character.model';

import api from '../../services/api';
import filterIcon from '../../assets/filter.svg';
import CharacterCard from '../../components/CharacterCard';

import './style.scss';

import Loading from '../../components/Loading';

const Home: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [filtered, setFiltered] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [crescent, setCrescent] = useState(true);
  const [registers, setRegisters] = useState(0);
  const [total, setTotal] = useState(0);
  const [size, setSize] = useState(10);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    reorder();
  }, [crescent, registers]);

  async function loadCharacters() {
    try {
      setIsLoading(true);
      const response = await api.get<Character>('/characters', {
        params: {
          ts: Number(new Date()),
          apikey: process.env.REACT_APP_PUBLIC_KEY,
          hash: `${Md5.hashStr(
            `${Number(new Date())}${process.env.REACT_APP_PRIVATE_KEY}${
              process.env.REACT_APP_PUBLIC_KEY
            }`,
          )}`,
          offset: registers,
          orderBy: crescent ? 'name' : '-name',
          limit: 10,
        },
      });
      setTotal(response.data[`data`][`total`]);
      const characters = response.data[`data`][`results`];
      setCharacters(characters);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }

  async function searchCharacters(searchTerm: string) {
    setSearchTerm(searchTerm);
    if (searchTerm.length >= 3) {
      setIsLoading(true);
      setFiltered(true);
      try {
        const response = await api.get<Character>('/characters', {
          params: {
            ts: Number(new Date()),
            apikey: process.env.REACT_APP_PUBLIC_KEY,
            hash: `${Md5.hashStr(
              `${Number(new Date())}${process.env.REACT_APP_PRIVATE_KEY}${
                process.env.REACT_APP_PUBLIC_KEY
              }`,
            )}`,
            offset: 0,
            orderBy: crescent ? 'name' : '-name',
            limit: 10,
            nameStartsWith: searchTerm,
          },
        });

        const characters = response.data[`data`][`results`];
        setTotal(response.data[`data`][`total`]);
        setCharacters(characters);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    } else if (searchTerm.length < 3 && filtered) {
      setIsLoading(true);
      setFiltered(false);
      loadCharacters();
    }
  }

  function reorder() {
    filtered ? searchCharacters(searchTerm) : loadCharacters();
  }

  function nextPage() {
    setSize(size + 10);
    setRegisters(registers + 10);
  }

  function prevPage() {
    setSize(size - 10);
    setRegisters(registers - 10);
  }

  return (
    <section className="home">
      <div className="content">
        <h1>Characteres</h1>
        <div className="search">
          <input
            onChange={e => searchCharacters(e.target.value)}
            type="search"
            placeholder="Find a Character (Type at Least Three Characters)"
          />
          <div className="filter" onClick={e => setCrescent(!crescent)}>
            <img src={filterIcon} alt="Filter Icon" />
            <small>A-Z</small>
            <i className="fas fa-chevron-up"></i>
          </div>
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div className="cards">
              {characters.map(character => (
                <Link
                  key={character.id}
                  to={`/character/${character.id}`}
                  className="card"
                >
                  <CharacterCard
                    name={character.name}
                    subtitle={character.name}
                    thumbnail={character.thumbnail}
                    description={character.description}
                  />
                </Link>
              ))}
            </div>
            <div className="paginacao">
              <button
                type="button"
                disabled={size === 10}
                onClick={e => prevPage()}
              >
                <i className="fas fa-chevron-left"></i>
              </button>
              <small>
                <b>{registers + 1}</b> até <b>{size <= total ? size : total}</b>{' '}
                de <b>{total}</b>
              </small>
              <button
                type="button"
                disabled={size >= total}
                onClick={e => nextPage()}
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
