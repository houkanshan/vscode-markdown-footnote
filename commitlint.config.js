module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-case': [0, 'never', []],
    'header-max-length': [2, 'always', 120],
    'subject-full-stop': [0, 'never'],
  },
};
