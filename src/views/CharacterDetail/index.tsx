import React, { useState, useEffect } from 'react';

import { Md5 } from 'ts-md5';
import { Link } from 'react-router-dom';
import { Character } from '../../models/Character.model';
import { useRouteMatch } from 'react-router-dom';

import api from '../../services/api';
import ComicCard from '../../components/ComicCard';

import './style.scss';
import { Comic } from '../../models/Comic.model';

const CharacterDetail: React.FC = () => {
  const { params } = useRouteMatch();

  const [characterDetail, setCharacterDetail] = useState<Character[]>([]);
  const [characterDetailImage, setCharacterDetailImage] = useState('');
  const [comics, setComics] = useState<Comic[]>([]);

  window.scrollTo(0, 0);

  useEffect(() => {
    loadDetail();
    loadComics();
  }, []);

  async function loadDetail() {
    try {
      const response = await api.get<Character>(`/characters/${params[`id`]}`, {
        params: {
          ts: Number(new Date()),
          apikey: process.env.REACT_APP_PUBLIC_KEY,
          hash: `${Md5.hashStr(
            `${Number(new Date())}${process.env.REACT_APP_PRIVATE_KEY}${
              process.env.REACT_APP_PUBLIC_KEY
            }`,
          )}`,
        },
      });
      const characterDetail = response.data[`data`][`results`][0];
      const characterImage = `${characterDetail[`thumbnail`][`path`]}.${
        characterDetail[`thumbnail`][`extension`]
      }`;
      setCharacterDetailImage(characterImage);
      setCharacterDetail(characterDetail);
    } catch (error) {
      console.log(error);
    }
  }

  async function loadComics() {
    try {
      const response = await api.get<Comic>(
        `/characters/${params[`id`]}/comics`,
        {
          params: {
            ts: Number(new Date()),
            apikey: process.env.REACT_APP_PUBLIC_KEY,
            hash: `${Md5.hashStr(
              `${Number(new Date())}${process.env.REACT_APP_PRIVATE_KEY}${
                process.env.REACT_APP_PUBLIC_KEY
              }`,
            )}`,
          },
        },
      );
      const comics = response.data[`data`][`results`];
      setComics(comics);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="characterdetail">
      <div className="picture">
        <img src={characterDetailImage} alt={characterDetail[`name`]} />
      </div>
      <div className="content">
        <Link to="/">
          <div className="back">
            <i className="fas fa-arrow-left"></i>
            <small>Back to Homepage</small>
          </div>
        </Link>
        <h1>{characterDetail[`name`]}</h1>
        <p>
          {characterDetail[`description`]
            ? characterDetail[`description`]
            : 'No description found.'}
        </p>
        <h1>Comics</h1>
        <div className="comics">
          {comics.map(comic => (
            <div key={comic.id}>
              <ComicCard title={comic.title} thumbnail={comic.thumbnail} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CharacterDetail;
