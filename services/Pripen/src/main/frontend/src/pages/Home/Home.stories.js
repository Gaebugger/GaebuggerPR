// Home.stories.js

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Home from './Home';

export default {
    title: 'Pages/Home',
    component: Home,
    decorators: [(Story) => <BrowserRouter><Story /></BrowserRouter>],  // 이 부분을 추가
};

const Template = (args) => <Home {...args} />;

export const Default = Template.bind({});
Default.args = {
};
