const path = require('path'); // 상단에 이 모듈을 추가해주세요.

/** @type { import('@storybook/react-webpack5').StorybookConfig } */
module.exports = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
    'msw-storybook-addon'
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: ["../public"],
  webpackFinal: async (config) => {
    // 폰트 로더 추가
    config.module.rules.push({
      test: /\.ttf$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]', // 출력 디렉토리와 파일 이름 설정
          },
        },
      ],
      include: path.resolve(__dirname, '../src/assets/fonts'), // 폰트 경로를 정확하게 지정
    });

    // CSS 로더 추가
    config.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
      include: path.resolve(__dirname, '../src'), // CSS 파일 경로를 정확하게 지정
    });

    return config;
  },
};
