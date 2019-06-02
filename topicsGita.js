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
    [2,25], [17,13]
  ],
  'love' : [
    [3,34], [8,22], [9,14], [9,29], [9,33], [10,10], [10,28], [11,41],
    [11,44], [11,55], [14,24], [18,55], [18,62], [18,68]
  ],
  'lust' : [
    
  ]
}
