const searchValue = document.getElementById('inputSearch');
const searchResults = document.getElementById('searchResults');

searchValue.addEventListener('keyup', handleSearch);
function handleSearch() {
  const searchPhrase = searchValue.value.trim().toLowerCase();
  if (searchPhrase.length === 0) {
    clearSearchResults();
    return;
  }

  const foundResults = searchBhagavadGita(searchPhrase);
  if (foundResults.length === 0) {
    displayNoResultsMessage(searchPhrase);
  } else {
    displaySearchResults(foundResults);
  }
}

function searchBhagavadGita(phrase) {
  const results = [];
  for (let chapter = 1; chapter <= 18; chapter++) {
    for (let verse = 1; verse <= Object.keys(BHAGAVAD_GITA[chapter]).length; verse++) {
      const sanskritVerse = BHAGAVAD_GITA[chapter][verse][0];
      const englishVerse = BHAGAVAD_GITA[chapter][verse][1].toLowerCase();

      if (englishVerse.includes(phrase)) {
        results.push({
          chapter,
          verse,
          sanskritVerse,
          englishVerse,
        });
      }
    }
  }
  return results;
}

function clearSearchResults() {
  searchResults.innerText = '';
}

function displayNoResultsMessage(phrase) {
  searchResults.innerText = `No results found for query: ${phrase}`;
}

function displaySearchResults(results) {
  const resultText = results.map(verse =>
    `Chapter ${verse.chapter}, Verse ${verse.verse}\n${verse.sanskritVerse}\n${verse.englishVerse}\n\n`
  ).join('');
  searchResults.innerText = resultText;
}