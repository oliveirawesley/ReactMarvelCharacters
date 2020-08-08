import React from 'react';
import Skeleton from 'react-loading-skeleton';

import './style.scss';

const Loading: React.FC = () => {
  return (
    <section className="loading">
      <Skeleton count={10} height={220} width={250} />
      <div className="pagination">
        <Skeleton count={1} width={200} height={40} />
      </div>
    </section>
  );
};

export default Loading;
