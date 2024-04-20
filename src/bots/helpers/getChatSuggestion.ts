interface GetChatSuggestions {
  suggestions: string[];
}

export function getChatSuggestion(this: GetChatSuggestions, text: string) {
  return this.suggestions.find(
    suggestion =>
      suggestion.toLowerCase().substring(0, text.length) === text.toLowerCase(),
  );
}
