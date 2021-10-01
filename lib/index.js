var toTurkishLowerCase = function (word) {
  return word.replace(/İ/g, "i").replace(/I/g, "ı").replace(/Ç/g, "ç").replace(/Ü/g, "ü").replace(/Ö/g, "ö").replace(/Ş/g, "ş").replace(/Ğ/g, "ğ").toLowerCase();
};

var _hecele = function (_word) {
  var vowels = ["a", "e", "ı", "i", "o", "ö", "u", "ü", "â", "ê", "î", "ô", "û"];
  var spellSlicer = [{
    token: "001000",
    location: 5
  }, {
    token: "000100",
    location: 5
  }, {
    token: "01000",
    location: 4
  }, {
    token: "00100",
    location: 4
  }, {
    token: "00010",
    location: 4
  }, {
    token: "1000",
    location: 3
  }, {
    token: "0100",
    location: 3
  }, {
    token: "0011",
    location: 3
  }, {
    token: "0010",
    location: 3
  }, {
    token: "011",
    location: 2
  }, {
    token: "010",
    location: 2
  }, {
    token: "100",
    location: 2
  }, {
    token: "10",
    location: 1
  }, {
    token: "11",
    location: 1
  }];
  var token = "";
  var word = toTurkishLowerCase(_word).split("");
  word.map(function (letter) {
    if (vowels.includes(letter)) {
      token += 1;
    } else {
      token += 0;
    }
  });
  var words = [];

  if (token.startsWith("111") || token.startsWith("000")) {
    return words;
  }

  var spellCount = token.split("").filter(function (c) {
    return c == "1";
  }).length;

  if ([0, 1].includes(spellCount)) {
    return [_word];
  }

  var range = Array.from(Array(spellCount).keys());
  range.map(function (i) {
    spellSlicer.map(function (spell) {
      if (token.startsWith(spell.token)) {
        words.push(_word.substr(0, spell.location));
        _word = _word.substr(spell.location);
        token = token.substr(spell.location);
      }
    });
  });

  if (token == "0") {
    words[words.length - 1] = words[words.length - 1] + _word;
  } else if (_word) {
    words.push(_word);
  }

  if (words.length != spellCount) {
    return [];
  }

  return words;
};

var hecele = function (word) {
  if (Array.isArray(word)) {
    return word.map(function (w) {
      return _hecele(w);
    });
  } else if (word.includes(" ")) {
    return word.split(" ").map(function (w) {
      return _hecele(w);
    });
  } else {
    return _hecele(word);
  }
};

if (typeof exports !== 'undefined') {
  var _ = {
    hecele: hecele,
    toTurkishLowerCase: toTurkishLowerCase
  };

  if (typeof module !== 'undefined' && module.exports) {
    exports = module.exports = _;
  }

  exports._ = _;
} else {
  window['hecele'] = hecele;
  window['toTurkishLowerCase'] = toTurkishLowerCase;
}