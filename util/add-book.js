const path = require('path')
const fs = require('fs')
const inquirer = require('inquirer')
const R = require('ramda')

String.prototype.toTitleCase = function(withLowers = true) {
    const lowers = ['A', 'An', 'The', 'At', 'By', 'For', 'In', 'Of', 'On', 'To', 'Up', 'And', 'As', 'But', 'Or', 'Nor', 'Not']

    let string = this
      .replace(/([^\s:\-'])([^\s:\-']*)/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
      .replace(/Mc(.)/g, (match, next) => 'Mc' + next.toUpperCase())

    if (withLowers) {
        for (i in lowers) {
          string = string.replace(new RegExp('\\s' + lowers[i] + '\\s', 'g'), txt => txt.toLowerCase())
        }
    }

    return string
}

const stringify = data => JSON.stringify(data, null, 2)

const authorQuestion = {
  name: 'author',
  message: 'Author',
}

const titleQuestion = {
  name: 'title',
  message: 'Title',
  validate: input => input.length > 0 ? true : 'Every book needs a title',
  filter: input => input.toTitleCase()
}

const subtitleQuestion = {
  name: 'subtitle',
  message: 'Subtitle',
  filter: input => input.toTitleCase()
}

const imageQuestion = {
  name: 'imageUrl',
  message: 'Cover Image',
  validate: input => input.length > 0 ? true : 'Images are mandatory'
}

const saveQuestion = {
  type: 'confirm',
  name: 'shouldSave',
  message: 'Save?',
}

const bookFile = path.resolve(__dirname, '../data/books.json')

const nullIfEmpty = R.ifElse(
  R.isEmpty,
  R.always(null),
  R.identity
)

const sanitizeParams = {
  author: nullIfEmpty,
  subtitle: nullIfEmpty,
}

const sanitize = R.evolve(sanitizeParams)

const slugify = R.compose(
  // Remove any leftover symbols
  R.replace(/[^\w\s-]/g, ''),
  // Replace spaces with a '-'
  R.replace(/\s+/g, '-'),
  R.trim,
  R.toLower
)

const bookSlug = R.compose(
  slugify,
  R.join(' '),
  R.props(['author', 'title'])
)

const appendBook = (book, filename = bookFile) => {
  const slug = bookSlug(book)
  const newBook = R.compose(
    R.assoc('slug', slug),
    sanitize
  )(book)

  const file = fs.readFileSync(filename)

  let data = JSON.parse(file)

  data.books.push(newBook)

  const json = stringify(data)
  fs.writeFileSync(filename, json)
}

inquirer.prompt([authorQuestion, titleQuestion, subtitleQuestion, imageQuestion, saveQuestion])
  .then(answers => {
    if (answers.shouldSave) {
      delete answers.shouldSave
      appendBook(answers)
    } else {
      console.log('Cancelled')
    }
  })
  .catch(console.log)
