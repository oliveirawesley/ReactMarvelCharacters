import React from 'react';
import { Comic } from '../../models/Comic.model';

import './style.scss';

const ComicCard: React.FC<Comic> = ({ title, thumbnail }) => {
  return (
    <section className="comic-card">
      <img src={`${thumbnail.path}.${thumbnail.extension}`} alt={title} />
      <b> {title}</b>
    </section>
  );
};

export default ComicCard;
