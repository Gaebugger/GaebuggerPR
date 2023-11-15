import React from 'react';
import { rest } from 'msw';
import { setupWorker } from 'msw';
import { mswDecorator } from 'msw-storybook-addon';
import { BrowserRouter } from 'react-router-dom';
import Step4 from './Step4';

const handlers = [
  rest.get('http://localhost:8080/api/check-response/:processId', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: "Sample message from server",
        checkedItems: ["Item 1", "Item 2", "Item 3"],
        fileContent: "Sample file content",
        ans: "Sample guidelines",
      })
    );
  })
];

const worker = setupWorker(...handlers);

worker.start();

export default {
  title: 'pages/Services/check/Step4',
  component: Step4,
  decorators: [mswDecorator],
};

export const Default = () => (
    <BrowserRouter>
        <Step4 processId="sampleProcessId" />
    </BrowserRouter>
);

