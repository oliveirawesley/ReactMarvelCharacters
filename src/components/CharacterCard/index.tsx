import React from 'react';

import './style.scss';

import { Character } from '../../models/Character.model';

const CharacterCard: React.FC<Character> = ({
  name,
  subtitle,
  thumbnail,
  description,
}) => {
  return (
    <section className="card-content">
      <img src={`${thumbnail.path}.${thumbnail.extension}`} alt={name} />
      <b>{name}</b>
      <small> {subtitle} </small>
      <p> {description?.slice(0, 60)} ...</p>
    </section>
  );
};

export default CharacterCard;
