import React from 'react';
import { action } from '@storybook/addon-actions';
import { BrowserRouter } from 'react-router-dom';
import Step1 from './Step1';

export default {
  title: 'pages/Services/check/Step1/Step1',
  component: Step1,
  decorators: [(Story) => <BrowserRouter><Story /></BrowserRouter>],  // 이 부분을 추가
};

const Template = (args) => <Step1 {...args} />;

export const Default = Template.bind({});
Default.args = {
  nextStep: action('nextStep'),
  setCheckedItems: action('setCheckedItems'),
};

