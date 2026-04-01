/**
 * Lightweight Naive Bayes classifier compatible with natural's BayesClassifier
 * serialized format (classifier.json). Runs fully client-side with no dependencies.
 *
 * Replicates: PorterStemmer + AggressiveTokenizer + stopword removal + Naive Bayes
 */

// --- Porter Stemmer (Martin Porter's algorithm) ---

function categorizeGroups(token: string) {
  return token
    .replace(/[^aeiouy]+y/g, 'CV')
    .replace(/[aeiou]+/g, 'V')
    .replace(/[^V]+/g, 'C');
}

function categorizeChars(token: string) {
  return token
    .replace(/[^aeiouy]y/g, 'CV')
    .replace(/[aeiou]/g, 'V')
    .replace(/[^V]/g, 'C');
}

function measure(token: string | null) {
  if (!token) return -1;
  return categorizeGroups(token).replace(/^C/, '').replace(/V$/, '').length / 2;
}

function endsWithDoublCons(token: string) {
  return /([^aeiou])\1$/.test(token);
}

function attemptReplace(
  token: string,
  pattern: string | RegExp,
  replacement: string,
  callback?: (t: string) => string | null,
): string | null {
  let result: string | null = null;
  if (typeof pattern === 'string' && token.substr(0 - pattern.length) === pattern) {
    result = token.replace(new RegExp(pattern + '$'), replacement);
  } else if (pattern instanceof RegExp && pattern.test(token)) {
    result = token.replace(pattern, replacement);
  }
  if (result && callback) return callback(result);
  return result;
}

function attemptReplacePatterns(
  token: string,
  replacements: [string | RegExp, string, string][],
  measureThreshold: number | null,
) {
  let replacement = token;
  for (const r of replacements) {
    if (measureThreshold == null || measure(attemptReplace(token, r[0], r[1])) > measureThreshold) {
      replacement = attemptReplace(replacement, r[0], r[2]) || replacement;
    }
  }
  return replacement;
}

function replacePatterns(
  token: string,
  replacements: [string | RegExp, string, string][],
  measureThreshold: number,
) {
  return attemptReplacePatterns(token, replacements, measureThreshold) || token;
}

function replaceRegex(
  token: string,
  regex: RegExp,
  includeParts: number[],
  minimumMeasure: number,
) {
  if (regex.test(token)) {
    const parts = regex.exec(token)!;
    let result = '';
    for (const i of includeParts) result += parts[i];
    if (measure(result) > minimumMeasure) return result;
  }
  return null;
}

function step1a(token: string) {
  if (/(ss|i)es$/.test(token)) return token.replace(/(ss|i)es$/, '$1');
  if (token.substr(-1) === 's' && token.substr(-2, 1) !== 's' && token.length > 2) {
    return token.replace(/s?$/, '');
  }
  return token;
}

function step1b(token: string) {
  if (token.substr(-3) === 'eed') {
    if (measure(token.substr(0, token.length - 3)) > 0) return token.replace(/eed$/, 'ee');
    return token;
  }
  const result = attemptReplace(token, /(ed|ing)$/, '', (t) => {
    if (categorizeGroups(t).indexOf('V') >= 0) {
      const r = attemptReplacePatterns(t, [
        ['at', '', 'ate'],
        ['bl', '', 'ble'],
        ['iz', '', 'ize'],
      ], null);
      if (r !== t) return r;
      if (endsWithDoublCons(t) && /[^lsz]$/.test(t)) return t.replace(/([^aeiou])\1$/, '$1');
      if (measure(t) === 1 && categorizeChars(t).substr(-3) === 'CVC' && /[^wxy]$/.test(t)) {
        return t + 'e';
      }
      return t;
    }
    return null;
  });
  return result || token;
}

function step1c(token: string) {
  const cg = categorizeGroups(token);
  if (token.substr(-1) === 'y' && cg.substr(0, cg.length - 1).indexOf('V') > -1) {
    return token.replace(/y$/, 'i');
  }
  return token;
}

function step2(token: string) {
  return replacePatterns(
    token,
    [
      ['ational', '', 'ate'], ['tional', '', 'tion'], ['enci', '', 'ence'], ['anci', '', 'ance'],
      ['izer', '', 'ize'], ['abli', '', 'able'], ['bli', '', 'ble'], ['alli', '', 'al'],
      ['entli', '', 'ent'], ['eli', '', 'e'], ['ousli', '', 'ous'], ['ization', '', 'ize'],
      ['ation', '', 'ate'], ['ator', '', 'ate'], ['alism', '', 'al'], ['iveness', '', 'ive'],
      ['fulness', '', 'ful'], ['ousness', '', 'ous'], ['aliti', '', 'al'], ['iviti', '', 'ive'],
      ['biliti', '', 'ble'], ['logi', '', 'log'],
    ],
    0,
  );
}

function step3(token: string) {
  return replacePatterns(
    token,
    [
      ['icate', '', 'ic'], ['ative', '', ''], ['alize', '', 'al'],
      ['iciti', '', 'ic'], ['ical', '', 'ic'], ['ful', '', ''], ['ness', '', ''],
    ],
    0,
  );
}

function step4(token: string) {
  return (
    replaceRegex(token, /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/, [1], 1) ||
    replaceRegex(token, /^(.+?)(s|t)(ion)$/, [1, 2], 1) ||
    token
  );
}

function step5a(token: string) {
  const m = measure(token.replace(/e$/, ''));
  if (m > 1 || (m === 1 && !(categorizeChars(token).substr(-4, 3) === 'CVC' && /[^wxy].$/.test(token)))) {
    token = token.replace(/e$/, '');
  }
  return token;
}

function step5b(token: string) {
  if (measure(token) > 1) return token.replace(/ll$/, 'l');
  return token;
}

function stem(token: string): string {
  if (token.length < 3) return token;
  return step5b(step5a(step4(step3(step2(step1c(step1b(step1a(token.toLowerCase()))))))));
}

// --- Tokenizer (AggressiveTokenizer) ---

function tokenize(text: string): string[] {
  return text.split(/[^a-zA-Z0-9'\-/]+/).filter(Boolean);
}

// --- Stopwords ---

const stopwords = new Set([
  'about', 'above', 'after', 'again', 'all', 'also', 'am', 'an', 'and', 'another',
  'any', 'are', 'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below',
  'between', 'both', 'but', 'by', 'came', 'can', 'cannot', 'come', 'could', 'did',
  'do', 'does', 'doing', 'during', 'each', 'few', 'for', 'from', 'further', 'get',
  'got', 'has', 'had', 'he', 'have', 'her', 'here', 'him', 'himself', 'his', 'how',
  'if', 'in', 'into', 'is', 'it', 'its', 'itself', 'like', 'make', 'many', 'me',
  'might', 'more', 'most', 'much', 'must', 'my', 'myself', 'never', 'now', 'of',
  'on', 'only', 'or', 'other', 'our', 'ours', 'ourselves', 'out', 'over', 'own',
  'said', 'same', 'see', 'she', 'should', 'since', 'so', 'some', 'still', 'such',
  'take', 'than', 'that', 'the', 'their', 'theirs', 'them', 'themselves', 'then',
  'there', 'these', 'they', 'this', 'those', 'through', 'to', 'too', 'under',
  'until', 'up', 'very', 'was', 'way', 'we', 'well', 'were', 'what', 'where',
  'when', 'which', 'while', 'who', 'whom', 'with', 'would', 'why', 'you', 'your',
  'yours', 'yourself',
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o',
  'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
  '$', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '_',
]);

function tokenizeAndStem(text: string): string[] {
  return tokenize(text.toLowerCase())
    .filter(token => !stopwords.has(token))
    .map(stem);
}

// --- Naive Bayes Classifier ---

interface ClassifierData {
  classFeatures: Record<string, Record<string, number>>;
  classTotals: Record<string, number>;
  totalExamples: number;
  smoothing: number;
}

interface SerializedClassifier {
  classifier: ClassifierData;
  features: Record<string, number>;
}

export class LightBayesClassifier {
  private classFeatures: Record<string, Record<string, number>>;
  private classTotals: Record<string, number>;
  private totalExamples: number;
  private smoothing: number;
  private features: Record<string, number>;

  constructor(data: SerializedClassifier) {
    this.classFeatures = data.classifier.classFeatures;
    this.classTotals = data.classifier.classTotals;
    this.totalExamples = data.classifier.totalExamples;
    this.smoothing = data.classifier.smoothing;
    this.features = data.features;
  }

  private textToFeatures(text: string): number[] {
    const stemmed = tokenizeAndStem(text);
    const featureKeys = Object.keys(this.features);
    return featureKeys.map(feature => (stemmed.indexOf(feature) > -1 ? 1 : 0));
  }

  classify(text: string): string {
    const features = this.textToFeatures(text);
    let bestLabel = '';
    let bestProb = -Infinity;

    for (const label in this.classFeatures) {
      let logProb = 0;
      for (let i = features.length - 1; i >= 0; i--) {
        if (features[i]) {
          const count = this.classFeatures[label][i] || this.smoothing;
          logProb += Math.log(count / this.classTotals[label]);
        }
      }
      const prob = (this.classTotals[label] / this.totalExamples) * Math.exp(logProb);
      if (prob > bestProb) {
        bestProb = prob;
        bestLabel = label;
      }
    }

    return bestLabel;
  }
}
