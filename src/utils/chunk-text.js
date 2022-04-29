/* eslint-disable */
/* code from https://github.com/algolia/chunk-text
had to copy it here, because webpack fails at the export used there
*/
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports['default'] = void 0;

var _runes = _interopRequireDefault(require('runes'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _typeof(obj) {
  '@babel/helpers - typeof';
  if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === 'function' &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? 'symbol'
        : typeof obj;
    };
  }
  return _typeof(obj);
}

var assertIsValidText = function assertIsValidText(text) {
  if (typeof text !== 'string') {
    throw new TypeError(
      'Text should be provided as first argument and be a string.',
    );
  }
};

var assertIsValidChunkSize = function assertIsValidChunkSize(chunkSize) {
  if (Number.isNaN(chunkSize) || Number.parseInt(chunkSize, 10) <= 0) {
    throw new TypeError(
      'Size should be provided as 2nd argument and parseInt to a value greater than zero.',
    );
  }
};

var assertIsValidChunkOptions = function assertIsValidChunkOptions(
  chunkOptions,
) {
  if (
    _typeof(chunkOptions) !== 'object' &&
    typeof chunkOptions !== 'undefined' &&
    chunkOptions !== null &&
    chunkOptions !== ''
  ) {
    throw new TypeError(
      'Options should be provided as 3rd (optional) argument and be an object.\n' +
        "Potential chunkOptions object properties include: ['charLengthMask', 'charLengthType', 'textEncoder']",
    );
  }
};

var assertIsValidCharLengthMask = function assertIsValidCharLengthMask(
  charLengthMask,
  charLengthMaskIntParseIntNaN,
  charLengthMaskInt,
) {
  if (charLengthMaskIntParseIntNaN || charLengthMaskInt < -1) {
    throw new TypeError(
      'charLengthMask should be provided as a chunkOptions property and parseInt to a value >= -1.',
    );
  }
};

var assertIsValidTextEncoder = function assertIsValidTextEncoder(textEncoder) {
  if (
    typeof textEncoder === 'string' ||
    Array.isArray(textEncoder) ||
    typeof textEncoder === 'undefined' ||
    textEncoder === null
  ) {
    throw new TypeError(
      'textEncoder should be provided as a chunkOptions property and be an object containing the .encode(text).length property.',
    );
  }
};

var assertIsValidCharLengthType = function assertIsValidCharLengthType(
  charLengthType,
) {
  if (
    typeof charLengthType !== 'string' ||
    !(charLengthType === 'length' || charLengthType === 'TextEncoder')
  ) {
    throw new TypeError(
      "charLengthType should be provided as a chunkOptions property and be a value in ['length', 'TextEncoder']",
    );
  }
};

var chunkLength = function chunkLength(
  characters,
  charLengthMask,
  charLengthType,
  textEncoder,
) {
  var length;

  if (
    typeof characters === 'undefined' ||
    characters === null ||
    characters === ''
  ) {
    length = -1;
  } else {
    var charactersArray;

    if (typeof characters === 'string') {
      charactersArray = [characters];
    } else if (Array.isArray(characters) && characters.length) {
      charactersArray = characters;
    }

    if (
      !Array.isArray(charactersArray) ||
      !charactersArray.length ||
      charactersArray === null
    ) {
      length = -1;
    } else if (charLengthMask === 0) {
      length = charactersArray
        .map(function (character) {
          return (
            charLengthType === 'TextEncoder'
              ? textEncoder.encode(character)
              : character
          ).length;
        })
        .reduce(function (accumulator, currentValue) {
          return accumulator + currentValue;
        });
    } else if (charLengthMask > 0) {
      var arrayLength = charactersArray
        .map(function (character) {
          return (
            charLengthType === 'TextEncoder'
              ? textEncoder.encode(character)
              : character
          ).length;
        })
        .reduce(function (accumulator, currentValue) {
          return (
            accumulator +
            (currentValue > charLengthMask ? charLengthMask : currentValue)
          );
        });
      var maxLength = charactersArray.length * charLengthMask;
      length = maxLength > arrayLength ? arrayLength : maxLength;
    } else {
      length = charactersArray.length;
    }
  }

  return length;
};

var lastSpaceOrLength = function lastSpaceOrLength(text, upTo) {
  var lastIndex = text.lastIndexOf(' ', upTo);

  if (lastIndex === -1) {
    lastIndex = upTo;
  }

  if (lastIndex > text.length || upTo >= text.length) {
    lastIndex = text.length;
  }

  return lastIndex;
};

var chunkIndexOf = function chunkIndexOf(
  characters,
  chunkSize,
  charLengthMask,
  charLengthType,
  textEncoder,
) {
  var splitAt = lastSpaceOrLength(characters, chunkSize);

  while (
    splitAt > 0 &&
    chunkSize <
      chunkLength(
        characters.slice(0, splitAt),
        charLengthMask,
        charLengthType,
        textEncoder,
      )
  ) {
    splitAt = splitAt - 1;
  }

  splitAt = lastSpaceOrLength(characters, splitAt);

  if ((splitAt > -2 && splitAt < 1) || characters[splitAt] === ' ') {
    splitAt = splitAt + 1;
  }

  if (
    splitAt > characters.length ||
    splitAt < 0 ||
    (splitAt === 0 && characters.length === 1)
  ) {
    splitAt = characters.length;
  }

  return splitAt;
};

var _default = function _default(text, chunkSize, chunkOptions) {
  assertIsValidText(text);
  var chunkSizeInt = Number.parseInt(chunkSize, 10);
  assertIsValidChunkSize(chunkSizeInt);
  assertIsValidChunkOptions(chunkOptions);
  var charLengthMaskInt = -1;
  var charLengthMaskIntParseInt = -1;
  var charLengthMaskIntParseIntNaN = true;
  var textEncoderObject;

  if (_typeof(chunkOptions) === 'object') {
    if (Object.prototype.hasOwnProperty.call(chunkOptions, 'charLengthMask')) {
      charLengthMaskInt = chunkOptions.charLengthMask;
      charLengthMaskIntParseInt = Number.parseInt(charLengthMaskInt, 10);
      charLengthMaskIntParseIntNaN = Number.isNaN(charLengthMaskIntParseInt);
      assertIsValidCharLengthMask(
        charLengthMaskInt,
        charLengthMaskIntParseIntNaN,
        charLengthMaskIntParseInt,
      );
    }

    if (Object.prototype.hasOwnProperty.call(chunkOptions, 'charLengthType')) {
      assertIsValidCharLengthType(chunkOptions.charLengthType);

      if (chunkOptions.charLengthType === 'TextEncoder') {
        if (Object.prototype.hasOwnProperty.call(chunkOptions, 'textEncoder')) {
          assertIsValidTextEncoder(chunkOptions.textEncoder);
          textEncoderObject = chunkOptions.textEncoder;
        }
      }
    }
  }

  var charLengthMask = charLengthMaskIntParseIntNaN
    ? -1
    : charLengthMaskIntParseInt;
  var charLengthType =
    _typeof(chunkOptions) === 'object' && chunkOptions.charLengthType
      ? chunkOptions.charLengthType
      : 'length';

  try {
    if (
      charLengthType === 'TextEncoder' &&
      (typeof textEncoderObject === 'undefined' ||
        textEncoderObject === null ||
        textEncoderObject === '')
    ) {
      textEncoderObject = new TextEncoder();
    }
  } catch (ex) {
    throw new ReferenceError(
      "TextEncoder is not natively defined, new TextEncoder must be passed in with the 'chunkOptions.textEncoder' property.",
    );
  }

  var textEncoder = textEncoderObject;
  var chunks = [];
  var characters = (0, _runes['default'])(text);

  while (
    chunkLength(characters, charLengthMask, charLengthType, textEncoder) > 0
  ) {
    var splitAt = chunkIndexOf(
      characters,
      chunkSizeInt,
      charLengthMask,
      charLengthType,
      textEncoder,
    );
    var chunk = characters.slice(0, splitAt).join('').trim();

    if (chunk !== '' && chunk !== null) {
      chunks.push(chunk);
    }

    characters = characters.slice(splitAt);
  }

  return chunks;
};
module.exports = _default;
