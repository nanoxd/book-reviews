import Book from '../components/book'
import Shelf from '../components/shelf'

const titles = ['Goosebumps', 'Arthur', 'Harry Potter', 'Lord of The Rings', 'One', 'Thing', 'Hermione', 'Environment']
const images = [
  'http://myhero.com/images/ReadingRoom/books/harrypotter2.jpg',
  'http://harrypotterfanzone.com/wp-content/2009/06/ootp-us-jacket-art.jpg',
  'https://0.tqn.com/d/horror/1/S/a/e/0/-/goosebumps.jpg',
  'http://nerdprint.com/wp-content/uploads/2012/04/Tove-Jansson-Series.jpg',
  'https://flavorwire.files.wordpress.com/2011/09/catch-22_cover.jpg',
  'http://speckycdn.sdm.netdna-cdn.com/wp-content/uploads/2012/05/TBCE05.jpg',
  'https://0.tqn.com/d/horror/1/S/a/e/0/-/goosebumps.jpg',
  'http://nerdprint.com/wp-content/uploads/2012/04/Tove-Jansson-Series.jpg',
  'https://flavorwire.files.wordpress.com/2011/09/catch-22_cover.jpg',
  'http://speckycdn.sdm.netdna-cdn.com/wp-content/uploads/2012/05/TBCE05.jpg',
]

// const books = titles.entries().map((i, title) => Book({ title, imageUrl: images[i]}))
let books = []
for (let b of titles.entries()) {
  const [i, title] = b
  books.push(Book({ title, imageUrl: images[i] }))
}

export default () => <div>
  <Shelf books={books} />
</div>
