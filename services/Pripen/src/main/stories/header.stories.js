import React from 'react';
import { Header } from './Header';  // 경로는 실제 Header 컴포넌트의 위치에 따라 조정이 필요합니다.

export default {
  title: 'Header',
  component: Header,
};

export const DefaultHeader = () => <Header />;
export const ServicesActive = () => <Header active="services" />;
export const GuidesActive = () => <Header active="guides" />;
export const AboutActive = () => <Header active="about" />;
