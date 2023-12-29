# Bhagavad Gita Search Engine
[Try online](https://mrvivacious.github.io/My_Bhagavad_Gita/). A Bhagavad Gita browser skill is also available for the [Amazon Alexa](https://www.amazon.com/dp/B0828YQ2GW/ref=sr_1_fkmr0_1) (Dec 4, 2019).

Note: maybe check out this site (unaffiliated with me/us) for your Bhagavad Gita related needs: https://bhagavadgita.io/

## Repository structure

- `alexa-files`: code for the Amazon Alexa resource
- `gui`: JavaScript for the search engine website
- `img`: images
- `verses_audio`: audio files organized by chapter and with/without meaning (ie. "Sanskrit only" and "Sanskrit followed by English")
- `verses_text`: JSON representations of each chapter. Each verse is an array: `[Sanskrit phonetic, English translation]`
- `fullGita.js`: JSON representation of the Bhagavad Gita. In short, each file from verses_text inserted in a parent JSON object
- `index.html`: homepage for the search engine site

## Deployment

1. Clone this repo
2. Open `index.html` in a browser (alexa instructions TODO)

## Feedback or feature requests

Email me at `jvnnvt@gmail.com` or open a GitHub issue.

### Sources
Audio:

```
https://archive.org/details/2BhagavadGitaChapter02
https://archive.org/details/6BhagavadGitaChapter06
https://archive.org/details/16BhagavadGitaChapter18
https://audio.iskcondesiretree.com/index.php?q=f&f=%2F06_-_More%2F10_-_Audio_Books%2FBhagavat_Gita_Recitation_Sanskrit_to_English
```

Text:
```
https://archive.org/stream/TheBhagavadGitaInEnglish/Bhagavad_Gita_UK_djvu.txt
```

[archive.org usage rights](https://archive.org/about/faqs.php#Rights)

