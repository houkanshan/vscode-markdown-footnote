const disablePreCommitValidate = Number(process.env.DISABLE_HOOKS) === 1;

const tasks = (...arr) => arr.filter((t) => t).join(' && ');

module.exports = {
  hooks: {
    'pre-commit': disablePreCommitValidate ? undefined : tasks('lint-staged', 'jest'),
    'commit-msg': 'npx commitlint -E HUSKY_GIT_PARAMS',
  },
};
