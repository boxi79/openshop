import flatten from 'lodash/flatten';
import React from 'react';

// eslint-disable-next-line max-len
const sizes = [35.5, 36, 36.5, 37.5, 38, 38.5, 39, 40, 40.5, 41, 42, 42.5, 43, 44, 44.5, 45, 45.5, 46, 47, 47.5, 48, 48.5];

const generateSize = (size) => (
  [
    {
      key: size,
      value: size,
      name: (<div>{`${size}`}</div>),
    },
  ]
);

export const sizeConfigs = flatten(sizes.map((size) => generateSize(size)));
