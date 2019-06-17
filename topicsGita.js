// My Bhagavad Gita
// topicsGita.js
//
// topicsMap is a map of topics / sentiments to lists of related verses
// topicsMap[KEYWORD] => list of lists
// topicsMap[KEYWORD][index] => a specific chapter,verse pair from
//  the KEYWORD topic
//
// topicsMap[KEYWORD][index][0] => Chapter
// topicsMap[KEYWORD][index][1] => Verse
//
// @author Vivek Bhookya @mrvivacious
// @author Vivek Mallampati

let TOPICS_MAP = {
  'happy' : [
    [1,36], [5,23], [10,9]
  ],
  'sad' : [
    [2,25]
  ],
  'love' : [
    [3,34], [8,22], [9,14], [9,29], [9,33], [10,10], [10,28], [11,41],
    [11,44], [11,55], [14,24], [18,55], [18,62], [18,68]
  ],
  'lust' : [
    [3,37], [3,38], [3,41], [3,43], [5,22], [7,7], [16,8], [16,11], [16,18], [16,21], [18,35], [18,53]
  ],
  'pleasure' : [
    [1,32], [1,44], [2,5], [2,14], [2,15], [2,38], [2,43], [2,44],
    [2,56], [5,22], [6,7], [6,32], [11,36], [12,13], [12,18],
    [13,11], [13,21], [14,24], [15,5], [17,8], [18,34], [18,36],
    [18,37], [18,38], [18,39]
  ],
  'anger' : [
    [2,56], [2,62], [2,63], [5,26], [16,1], [16,2], [16,3], [16,21]
  ],
  'confusion' : [
    [2,7], [3,2], [18,61]
  ],
  'dealing with envy' : [
    [12,13], [12,14], [16,19], [18,71]
  ],
  'death of loved one' : [
    [2,13], [2,20], [2,22], [2,25], [2,27]
  ],
  'laziness' : [
    [3,8], [3,20], [6,16], [18,39]
  ],
  'discrimination' : [
    [5,18], [5,19], [6,32], [9,29]
  ],
  'fear' : [
    [4,10], [11,50], [18,30]
  ],
  'forgetfulness' : [
    [15,15], [18,61]
  ],
  'greed' : [
    [14,17], [16,21], [17,25]
  ],
  'seeking peace' : [
    [2,66], [2,71], [4,39], [5,29], [8,28]
  ],
  'demotivated' : [
    [11,33], [18,48], [18,78]
  ],
  'depression' : [
    [2,3], [2,14]
  ],
  'losing hope' : [
    [4,11], [9,22], [9,34], [18,66], [18,78]
  ],
  'pride' : [
    [16,4], [16,13], [16,15], [18,26], [18,58]
  ],
  'practising forgiveness' : [
    [11,44], [12,13], [12,14], [16,1], [16,2], [16,3]
  ],
  'temptation' : [
    [2,60], [2,61], [2,70], [7,14]
  ],
  'uncontrolled mind' : [
    [6,5], [6,6], [6,26], [6,35]
  ],
  'loneliness' : [
    [6,30], [9,29], [13,16], [13,18]
  ],
  'feeling sin' : [
    [4,36], [4,37], [5,10], [9,30], [10,3], [14,6], [18,66]
  ]
};

exports.TOPICS_MAP = TOPICS_MAP;
