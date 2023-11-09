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

function highlightVerse(verse, phrase) {
  // Create a regular expression to match the phrase (case-insensitive)
  const regex = new RegExp(phrase, 'gi');

  // Use the replace method to wrap the matching phrase with a span element
  const highlightedVerse = verse.replace(
      regex,
      (match) => `<span style="background-color: yellow">${match}</span>`
  );

  return highlightedVerse;
}


function searchBhagavadGita(phrase) {
  const results = [];
  for (let chapter = 1; chapter <= 18; chapter++) {
    for (let verse = 1; verse <= Object.keys(BHAGAVAD_GITA[chapter]).length; verse++) {
      let sanskritVerse = BHAGAVAD_GITA[chapter][verse][0];
      const englishVerse = BHAGAVAD_GITA[chapter][verse][1].toLowerCase();

      if (englishVerse.includes(phrase)) {
        let highlightedEnglishVerse = highlightVerse(englishVerse, phrase);

        while (sanskritVerse.includes('\n')) { 
          sanskritVerse = sanskritVerse.replace('\n', '<br>')
        }

        while (highlightedEnglishVerse.includes('\n')) { 
          highlightedEnglishVerse = highlightedEnglishVerse.replace('\n', '<br>')
        }

        results.push({
          chapter,
          verse,
          sanskritVerse,
          highlightedEnglishVerse,
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
    `Chapter ${verse.chapter}, Verse ${verse.verse}<br>${verse.sanskritVerse}<br>${verse.highlightedEnglishVerse}<br><br>`
  ).join('');
  searchResults.innerHTML = resultText;
}