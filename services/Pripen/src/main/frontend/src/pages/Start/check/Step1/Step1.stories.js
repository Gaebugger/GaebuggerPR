import React from 'react';
import { action } from '@storybook/addon-actions';
import { BrowserRouter } from 'react-router-dom';
import Step2 from './Step2';

export default {
  title: 'pages/Services/check/Step2',
  component: Step2,
  decorators: [(Story) => <BrowserRouter><Story /></BrowserRouter>],  // 이 부분을 추가
};

const Template = (args) => <Step2 {...args} />;

export const Default = Template.bind({});
Default.args = {
  nextStep: action('nextStep'),
  prevStep: action('prevStep'),
  setProcessId: action('setProcessId'),
  checkedItems: [],  // Example initial value, you can change this as needed
};

