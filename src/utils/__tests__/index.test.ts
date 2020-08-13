// You can import and use all API from the 'vscode' module
import { matchAll, footnoteRefRegex, footnoteContentRegex } from '../../utils';

describe('utils', () => {
  it('RegEx', () => {
    const text = [
      'He was involved in the development of the web feed format RSS,[^3] ',
      'the Markdown publishing format,[^4] the organization Creative Commons,[^LessigLawrence] ',
      'and the website framework web.py,[^6] and was a co-founder of the social news site Reddit.',
      '\n\n',
      '[^3]: "RSS creator Aaron Swartz dead at 26". Harvard Magazine.\n',
      '[^LessigLawrence]: Lessig, Lawrence (January 12, 2013).',
    ].join(''); // from Wikipedia

    const refMatches = matchAll(footnoteRefRegex, text);
    const refTexts = refMatches.map(([m]) => m);
    expect(refTexts).toEqual(['[^3]', '[^4]', '[^LessigLawrence]', '[^6]']);

    const contentMatches = matchAll(footnoteContentRegex, text);
    const contentTexts = contentMatches.map(([m]) => m);
    expect(contentTexts).toEqual(['[^3]', '[^LessigLawrence]']);
  });
});
