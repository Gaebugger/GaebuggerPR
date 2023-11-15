// Loading.js
import React from 'react';
import {Background} from './Styles';
import Spinner from '../../assets/Blocks-1s-200px.gif';

export default () => {
  return (
    <Background>
      <img src={Spinner} alt="로딩중" width="100%" />
    </Background>
  );
};