import R from 'ramda'
import ColorThief from '@mariotacke/color-thief'
import colorPairs from 'color-pairs-picker'
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
    this.state = {
      backgroundColor: 'white',
      color: 'black'
    }
  }

  componentDidMount () {
    const cover = document.getElementById('Review--cover')
    const backgroundColor = colorForCover(cover)
    const color = colorPairs(backgroundColor).fg

    this.setState({
      backgroundColor,
      color
    })
  }

  get titleHeader () {
    const { author, title } = this.props.book
    return `${author} - ${title}`
  }

  render () {
    const { book } = this.props
    const { title, author, imageUrl, subtitle } = book

    return <Layout>
      <div className='Review' style={{ backgroundColor: this.state.backgroundColor, color: this.state.color }}>
        <h1 className='Review--title'>{ this.titleHeader }</h1>
        <img id="Review--cover" src={imageUrl} />

        {subtitle && <h3 className='Review--subtitle'>{ subtitle }</h3>}

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <style jsx>{`
          .Review {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
          }

          .Review--title {
            font-size: 1.5rem;
          }

          #Review--cover {
            max-height: 80vh;
            max-width: 90vw;
          }

          p {
            margin: 1rem;
            text-align: center;
          }
        `}</style>
      </div>
    </Layout>
  }
}
