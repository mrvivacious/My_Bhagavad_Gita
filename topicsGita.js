// topicsMap is a map of topics / sentiments to lists of related verses
// topicsMap[KEYWORD] => list of lists
// topicsMap[KEYWORD][index] => a specific chapter,verse pair from
//  the KEYWORD topic
//
// topicsMap[KEYWORD][index][0] => Chapter
// topicsMap[KEYWORD][index][1] => Verse

let topicsMap = {
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
    [3,38], [3,43], [7,7], [16,8], [16,11], [16,18], [16,21], [18,35], [18,53]
  ],
  'pleasure' : [
    [1,32], [1,44], [2,5], [2,14], [2,15], [2,38], [2,43], [2,44],
    [2,56], [5,22], [6,7], [6,32], [11,36], [12,13], [12,18],
    [13,11], [13,21], [14,24], [15,5], [17,8], [18,34], [18,36],
    [18,37], [18,38], [18,39]
  ]
}
