import baseConfig from '@zeecom/eslint-config/base';
import reactConfig from '@zeecom/eslint-config/react';

/** @type {import('typescript-eslint').Config} */
export default [
  { ignores: ["dist"] },
  ...baseConfig,
  ...reactConfig,
]