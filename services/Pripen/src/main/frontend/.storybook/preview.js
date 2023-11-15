/** @type { import('@storybook/react').Preview } */
import { mswDecorator } from 'msw-storybook-addon';

// 전역 파라미터 설정
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

// 전역 데코레이터 설정
export const decorators = [mswDecorator];
