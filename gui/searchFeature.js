let searchValue = document.getElementById('inputSearch');
let searchResults = document.getElementById('searchResults');

searchValue.addEventListener('keyup', () => {
  let searchPhrase = searchValue.value.trim();
  if (searchPhrase.length < 1) { return; }

  searchPhrase = searchPhrase.toLowerCase();

  let verses = '';  

  for (let i = 1; i <= 18; i++) {
    for (let j = 1; j <= Object.keys(BHAGAVAD_GITA[i]).length; j++) {
      let sanskritVerse = BHAGAVAD_GITA[i][j][0];
      let englishVerse = BHAGAVAD_GITA[i][j][1];

      if (englishVerse.toLowerCase().includes(searchPhrase)) {
        verses += 
          "Chapter " + i + ", Verse " + j + "\n" +
          sanskritVerse + "\n" + englishVerse + "\n\n"
      }
    }
  }

  searchResults.innerText = verses;
})