/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';
const Alexa = require('alexa-sdk');

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = undefined;

const SKILL_NAME = 'My Bhagavad Gita';
const GET_FACT_MESSAGE = "todo";
const HELP_MESSAGE = 'todo';
const HELP_REPROMPT = 'todo';
const STOP_MESSAGE = 'Goodbye!';

//=========================================================================================================================================

const handlers = {
    'LaunchRequest': function () {
        // hello world
        // Thank you, https://medium.freecodecamp.org/amazon-has-made-it-easier-to-add-sounds-to-custom-alexa-skills-513b865d7528
        var test = "<audio src='https://s3.amazonaws.com/GET_YOUR_OWN_S3_BUCKET'/>";
        var testText = "Dhrtarastra uvaca\nDharma-ksetre kuru-ksetre samaveta yuyutsavah\nMamakah pandavas caiva kim akurvata sanjaya (1.1)\nDhrtastra said, O Sanjaya, blah blah blah~";

        this.response.cardRenderer(SKILL_NAME, testText);
        this.response.speak("Demo! " + test);
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
