/*
 * Copyright 2020 New Relic Corporation. All rights reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict'

const hasOwnProperty = require('./properties').hasOwn

// Starting in what we believe to be Node v4 you can set the name and length of
// a function as properties. This is more ideal than wrapping a function.
exports.fixArity = fixArity

function fixArity(original, wrapper) {
  const toDefine = {
    name: { value: original.name },
    length: { value: original.length }
  }

  if (!hasOwnProperty(wrapper, '__NR_name')) {
    toDefine.__NR_name = {
      configurable: false,
      enumerable: false,
      writable: false,
      value: wrapper.name
    }
  }

  Object.defineProperties(wrapper, toDefine)

  return wrapper
}
