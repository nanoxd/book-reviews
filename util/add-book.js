const path = require('path')
const fs = require('fs')
const inquirer = require('inquirer')

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

const appendBook = (book, filename = bookFile) => {
  const file = fs.readFileSync(filename)

  let data = JSON.parse(file)
  data.books.push(book)

  const json = stringify(data)
  fs.writeFileSync(filename, json)
}

inquirer.prompt([authorQuestion, titleQuestion, subtitleQuestion, imageQuestion, saveQuestion])
  .then(answers => {
    if (answers.shouldSave) {
      console.log(answers)
      delete answers.shouldSave
      appendBook(answers)
    }
  })
  .catch(err => console.log(err))
