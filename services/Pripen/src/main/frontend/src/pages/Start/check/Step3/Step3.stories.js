import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { rest } from 'msw';
import { mswDecorator } from 'msw-storybook-addon';
import Step3 from './Step3';

const handlers = [
  rest.get('http://localhost:8080/api/check-response/:processId', (req, res, ctx) => {
    return res(
      ctx.status(200)
    );
  })
];

export default {
  title: 'pages/Services/check/Step3',
  component: Step3,
  decorators: [mswDecorator],
};

export const Default = () => (
    <BrowserRouter>
      <Step3 nextStep={() => console.log("Next step called")} processId="sampleProcessId" />
    </BrowserRouter>
  );