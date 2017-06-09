import Book from '../components/book'
import Shelf from '../components/shelf'
import Layout from '../components/layout'
import { books } from '../data/books.json'

const bookObjects = books.map(Book)


export default () => <Layout>
  <Shelf books={bookObjects} />
</Layout>
