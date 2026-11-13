interface GetChatSuggestions {
  suggestions: string[];
}

export function getChatSuggestion(this: GetChatSuggestions, text: string) {
  const lowerTexts = text.toLowerCase().split(' ');

  return this.suggestions.find(suggestion => {
    const lowerSuggestionWords = suggestion.toLowerCase().split(' ');
    let suggestionIndex = 0;
    let textIndex = 0;

    while (
      suggestionIndex < lowerSuggestionWords.length &&
      textIndex < lowerTexts.length
    ) {
      if (
        lowerSuggestionWords[suggestionIndex].startsWith(lowerTexts[textIndex])
      ) {
        if (
          suggestionIndex < lowerSuggestionWords.length - 1 &&
          textIndex < lowerTexts.length - 1
        ) {
          const nextSuggestionWord = lowerSuggestionWords[suggestionIndex + 1];
          const nextTextWord = lowerTexts[textIndex + 1];
          if (!nextSuggestionWord.startsWith(nextTextWord)) {
            return false;
          }
        }
        textIndex++;
      }
      suggestionIndex++;
    }

    return textIndex === lowerTexts.length;
  });
}
