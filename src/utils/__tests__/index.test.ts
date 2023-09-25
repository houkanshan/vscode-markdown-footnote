// You can import and use all API from the 'vscode' module
import { log } from 'console';
import {
  matchAll,
  footnoteRefRegex,
  footnoteContentRegex,
  buildFootnoteContentRegex,
  buildFootnoteRefRegex,
} from '../../utils';

const text = [
  'He was involved in the development of the web feed format RSS,[^3] ',
  'the Markdown publishing format,[^4] the organization Creative Commons,[^LessigLawrence] ',
  'and the website framework web.py,[^6] and was a co-founder of the social news site Reddit.[^3]',
  '\n\n',
  '[^3]: "RSS creator Aaron Swartz dead at 26". Harvard Magazine.\n',
  '[^LessigLawrence]: Lessig, Lawrence (January 12, 2013).',
].join(''); // from Wikipedia

describe('footnoteRefRegex, footnoteContentRegex and matchAll', () => {
  it('should work', () => {
    const refMatches = matchAll(footnoteRefRegex, text);
    const refTexts = refMatches.map(([m]) => m);
    expect(refTexts).toEqual(['[^3]', '[^4]', '[^LessigLawrence]', '[^6]', '[^3]']);

    const contentMatches = matchAll(footnoteContentRegex, text);
    const contentTexts = contentMatches.map(([m]) => m);
    expect(contentTexts).toEqual(['[^3]', '[^LessigLawrence]']);
  });
});

describe('buildFootnoteContentRegex', () => {
  it('should build a regex that can match one footnote content', () => {
    const regex = buildFootnoteContentRegex('LessigLawrence');
    const match = text.match(regex);
    expect(match).not.toBeNull();
    expect(match!.groups).not.toBeNull();
    expect(match!.groups!.key).toEqual('LessigLawrence');
    expect(match!.groups!.content).toEqual('Lessig, Lawrence (January 12, 2013).');
  });
});

describe('buildFootnoteRefRegex', () => {
  it('should build a regex that can match one footnote ref', () => {
    const regex = buildFootnoteRefRegex('LessigLawrence');
    const match = Array.from(text.matchAll(regex));
    expect(match.length).toEqual(1);
    expect(match[0]!.groups).not.toBeNull();
    expect(match[0]!.groups!.key).toEqual('LessigLawrence');

    const regex1 = buildFootnoteRefRegex('6');
    const match1 = Array.from(text.matchAll(regex1));
    expect(match1.length).toEqual(1);
    expect(match1[0]!.groups).not.toBeNull();
    expect(match1[0]!.groups!.key).toEqual('6');
  });

  it('should build a regex that can match multiple footnote ref', () => {
    const regex = buildFootnoteRefRegex('3');
    const match = Array.from(text.matchAll(regex));
    expect(match.length).toEqual(2);
    expect(match[0]!.groups).not.toBeNull();
    expect(match[0]!.groups!.key).toEqual('3');
    expect(match[1]!.groups).not.toBeNull();
    expect(match[1]!.groups!.key).toEqual('3');
  });
});
