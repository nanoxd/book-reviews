import R from 'ramda'
import ColorThief from '@mariotacke/color-thief'
import Layout from '../components/layout'
import { books } from '../data/books.json'

const findBook = (slug, bookList = books) =>
    R.find(R.propEq('slug', slug), bookList)

const colorForCover = (cover) => {
  const colorThief = new ColorThief()
  const color = colorThief.getColor(cover)

  return `rgb(${color})`
}

export default class extends React.Component {
  static getInitialProps ({ query: { slug } }) {
    const book = findBook(slug)
    return { book }
  }

  constructor () {
    super()
    this.state = { color: 'white' }
  }

  componentDidMount () {
    const cover = document.getElementById('book-cover')
    const color = colorForCover(cover)

    this.setState({ color: color })
  }

  get titleHeader () {
    const { author, title } = this.props.book
    return `${author} - ${title}`
  }

  render () {
    const { book } = this.props
    const { title, author, imageUrl } = book

    return <div style={{ backgroundColor: this.state.color }}>
      <h1>{ this.titleHeader }</h1>
      <img id="book-cover" src={imageUrl} />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <style jsx>{`
        div {
          color: black;
        }
      `}</style>
    </div>
  }
}
// export default ({ url: { query: { slug }}}) =>
//   <Layout>
//     <div>
//       {console.log(slug)}
//       <style jsx>{`
//         div {
//           color: white;
//         }
//       `}</style>
//     </div>
//   </Layout>
