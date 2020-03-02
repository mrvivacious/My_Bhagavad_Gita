// Bhagavad Gita
//
// index.js
// This file parses the user request and attempts to construct the
//  appropriate feedback
// Attempts because bugs in voice development often don't sit in
//  the code but the user experience
//
// @author Vivek Bhookya @mrvivacious

// TODO ::
// o Get synonym of topic requested
// o Add logs to view the user's request (in fact, could even update a DB table)
// o Offer to play entire chapter at once, 10 urls at a time

// Verse (sloka) playback:

// Topic playback:
// Can we play an appropriate verse based on the user's topic?

// Figure out what we can do for these cases, cuz implementing them is gonna
//  be annoying: RE: fuck it lol either we get both chapter-verse or nothinggggg
// Can we prompt the user for the desired verse, given only the chapter?
// Can we prompt the user for the desired chapter, given only the verse?
//
//
// DONE ::
// Can we play anything back, hello world?
// Can we play an audio file in the response, hello world + audio mpeg?
// Revisit the interaction model and figure out a more effective way
//  of creating the voice user interface, as that design dictates what's
//  written in this file
// Can we play audio based on inputted chapter and verse?
// Can we query the user's topic?

'use strict';
const Alexa = require('alexa-sdk');

// Thank you,
// https://stackoverflow.com/questions/3922994/share-variables-between-files-in-node-js
// Get the file we want to import our exports from
const fullGitaFile = require('./fullGita');
const topicsGitaFile = require('./topicsGita');

// Collect the TOPICS_MAP
const BHAGAVAD_GITA = fullGitaFile.BHAGAVAD_GITA;
const TOPICS_MAP = topicsGitaFile.TOPICS_MAP;

const getTopic = topicsGitaFile.getTopic;

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = process.env.APP_ID;
const AUDIO_URL = 'https://raw.githubusercontent.com/mrvivacious/My_Bhagavad_Gita/master/verses_audio/';

const SKILL_NAME = 'My Bhagavad Gita';
const HELP_MESSAGE = 'To use this software, say something like, play chapter one, verse one, or say, play a verse about confusion.';
const HELP_REPROMPT = 'Say both a chapter number and a verse number, or ask to play a verse about a topic.';
const STOP_MESSAGE = 'Goodbye!';

//============ HELPER FUNCTIONS ===========================================================================================================

function validateBounds(chapter, verse) {
  // Lmao wyd user
  if (chapter < 1 || chapter > 18) {
    return false;
  }

  // Number of verses in the selected chapter
  let versesInChapter = Object.keys(BHAGAVAD_GITA[chapter]).length;

  // Is the verse number in this chapter?
  if (verse > 0 && verse <= versesInChapter) {
    return true;
  }

  return false;
}

// Takes the indexes as numbers
function constructAudioURL(chapter, verse) {
  // Prefix the chapter and verse with '0' if needed
  if (chapter < 10) {
    chapter = '0' + chapter;
  }

  if (verse < 10) {
    verse = '0' + verse;
  }

  // Build the path
  // For example,
  // 01/01_01_m_mpeg.mp3
  let path = `${chapter}/With_meaning/mpeg/${chapter}_${verse}_m_mpeg.mp3`;
  // let path = '10/With_meaning/mpeg/10_09_m_mpeg.mp3';

  // Return the full URL
  return AUDIO_URL + path;
  // return 'chapter is ' + chapter + ' verse is ' + verse;
}

//=========================================================================================================================================

const handlers = {
  'SessionEndedRequest': function () {
    this.emit(':responseReady');
  },
  'LaunchRequest': function() {
    // hello world
    // Thank you, https://medium.freecodecamp.org/amazon-has-made-it-easier-to-add-sounds-to-custom-alexa-skills-513b865d7528

    let launchText = 'Welcome to the Bhagavad Gita. There are two actions: ' +
    'request a verse by chapter and verse numbers, and request a verse by topic.';
    launchText += ' ' + HELP_MESSAGE;

    this.response.cardRenderer(SKILL_NAME, launchText);
    this.response.speak(launchText).listen(HELP_REPROMPT);
    this.emit(':responseReady');
  },
  'VerseEnquiryIntent': function () {
    // Keep these as strings and not parseInt because the GITA_MAP uses "NUMBER"
    //  for the chapter keys
    let chapterNumber = this.event.request.intent.slots.chapter.value;
    let verseNumber = this.event.request.intent.slots.verse.value;

    // Validate chapter and verse are not undefined
    // The user provided both values
    if (chapterNumber && verseNumber) {
      // When both are non-null, ensure the verse is in the bounds of the
      //  desired chapter
      if (validateBounds(chapterNumber, verseNumber)) {
        // If true, we have a valid verse, deliver the audio URL
        let audioURL = constructAudioURL(chapterNumber, verseNumber);
        audioURL = `<audio src='${audioURL}'/>`;

        let output = `Chapter ${chapterNumber}, verse ${verseNumber}: ` + audioURL;

        this.response.cardRenderer(SKILL_NAME, output.split(':')[0]);
        this.response.speak(output);
        this.emit(':responseReady');
      }
      // Else, speak that this chapter does not have this verse and
      //  the chapter instead has some number of verses
      else {
        // Number of verses in the selected chapter
        let versesInChapter = Object.keys(BHAGAVAD_GITA[chapterNumber]).length;

        let output = 'Hmm, chapter ' + chapterNumber + ' does not have a verse ' +
          verseNumber + '. Chapter ' + chapterNumber + ' has ' + versesInChapter +
          ' verses.';

          this.response.cardRenderer(SKILL_NAME, output);
          this.response.speak(output);
          this.emit(':responseReady');
      }
    }
    // No values were provided, "cold launch"
    // + Prompt for both chapter and verse
    else {
      let output = 'What number chapter and what number verse do you want to hear?';
      let listen = 'Say chapter, followed by the chapter number, and verse,' +
        ' followed by the verse number';

      this.response.cardRenderer(SKILL_NAME, output);
      this.response.speak(output).listen(listen);
      this.emit(':responseReady');
    }
  },
  'TopicEnquiryIntent': function() {
    // Get the user's requested topic
    let topic = this.event.request.intent.slots.topic.value.toLowerCase();

    // TODO If the topic has a synonym, get the more general term
    // Collect the list of verses that corresponds to this topic
    // let topicVerses = TOPICS_MAP[topic];
    let topicVerses = getTopic(topic);

    // console.log("--- OUR VERSES ---");
    // console.log(topicVerses);

    // Randomly select a chapter-verse item from the list
    let randomIdx = Math.floor(Math.random() * topicVerses.length);
    let randomChapterVerse = topicVerses[randomIdx];

    let chapterNumber = randomChapterVerse[0];
    let verseNumber = randomChapterVerse[1];

    // TODO For display purposes
    let verseSanskrit = BHAGAVAD_GITA[chapterNumber][verseNumber][0];
    let verseEnglish = BHAGAVAD_GITA[chapterNumber][verseNumber][1];

    // TODO Construct the output and emit the response
    let audioURL = constructAudioURL(chapterNumber, verseNumber);
    var test = `<audio src='${audioURL}'/>`;

    // console.log('$$$$$ The constructed audio url is ' + test);

    // TODO Remove "a verse about" part for production, use it in development
    //  for debugging what topic Alexa picks up from the user
    // Thank you,
    // https://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format/32202320#32202320
    let output = `A verse about '${topic}', from chapter ${chapterNumber}, verse ${verseNumber}: ` + test;

    // TODO Else if topic does not exist,
    // TODO Log the request + topic to Cloudwatch so we can see what the request was
    // TODO Do a search through the Gita to see what verses have this requested term
    // TODO If a verse is found, construct the output and emit the respone
    // TODO If no verse found, state what topics are currently supported and prompt
    //  the user for a new request

    this.response.cardRenderer(SKILL_NAME, output.split(':')[0]);
    this.response.speak(output);
    this.emit(':responseReady');
  },
  'RandomVerseIntent': function() {
    // Get random chapter
    // + 1 because the Gita is indexed 1 - 18
    let randomChapter = Math.floor(Math.random() * 18) + 1;
    let chapter = BHAGAVAD_GITA[randomChapter];
    let chapterLength = Object.keys(chapter).length;
    
    // Get random verse from that chapter
    let randomVerse = Math.floor(Math.random() * chapterLength) + 1;

    // Return
    let audioURL = constructAudioURL(randomChapter, randomVerse);
    audioURL = `<audio src='${audioURL}'/>`;

    let output = `Chapter ${randomChapter}, verse ${randomVerse}: ` + audioURL;

    this.response.cardRenderer(SKILL_NAME, output.split(':')[0]);
    this.response.speak(output);
    this.emit(':responseReady');
  },
  'AMAZON.HelpIntent': function() {
    const speechOutput = HELP_MESSAGE;
    const reprompt = HELP_REPROMPT;

    this.response.speak(speechOutput).listen(reprompt);
    this.emit(':responseReady');
  },
  'AMAZON.CancelIntent': function() {
    this.response.speak(STOP_MESSAGE);
    this.emit(':responseReady');
  },
  'AMAZON.StopIntent': function() {
    this.emit(':responseReady');
  },
  'AMAZON.FallbackIntent': function() {
    this.emit(':responseReady');
  }
};

exports.handler = function(event, context, callback) {
  const alexa = Alexa.handler(event, context, callback);
  alexa.APP_ID = APP_ID;
  alexa.registerHandlers(handlers);
  alexa.execute();
};



 // In the even where users provided one value at a time
 // Let's just go ALL - or - NOTHING
 // ONE VALUE //
    // Verse is defined, chapter == undefined, number == undefined
    // + Prompt for the missing chapter
    // If we already have a value saved for this session, don't overwrite
    // IE. "Verse three" response will set chapterNumber to undefined
    // if (verseNumber && !chapterNumber && !number) {
    //   this.attributes["verse"] = verseNumber;

    //   let output = 'What number chapter do you want to hear verse ' + verseNumber + 'from?';
    //   let listen = 'Say chapter, followed by the chapter number';

    //   this.response.cardRenderer(SKILL_NAME, output);
    //   this.response.speak(output).listen(listen);
    //   this.emit(':responseReady');
    // }

    // Chapter is defined, verse == undefined, number == undefined
    // if (chapterNumber && !verseNumber && !number) {
    //   this.attributes["chapter"] = chapterNumber;

    //   let output = 'From chapter ' + chapterNumber + ', what number verse do you want to hear?';
    //   let listen = 'Say verse, followed by the verse number';

    //   this.response.cardRenderer(SKILL_NAME, output);
    //   this.response.speak(output).listen(listen);
    //   this.emit(':responseReady');
    // }

    // // NUMBER RESPONSE //
    // // Verse is defined, chapter == undefined, number == defined
    // // + Set the missing attribute with ${number} and proceed
    // if (verseNumber && !chapterNumber && number) {
    //   // VALIDATE BOUNDS

    //   // this.response.cardRenderer(SKILL_NAME, output);
    //   // this.response.speak(output).listen(listen);
    //   // this.emit(':responseReady');
    // }

    // // Chapter is defined, verse == undefined, number == defined
    // if (chapterNumber && !verseNumber && number) {
    //   // VALIDATE BOUNDS

    //   // this.response.cardRenderer(SKILL_NAME, output);
    //   // this.response.speak(output).listen(listen);
    //   // this.emit(':responseReady');
    // }
