import Link from 'next/link'

export default ({ title, imageUrl, author, slug }) =>
  <div key={slug} className='Book'>
    <Link href={`/review?slug=${slug}`} as={`/review/${slug}`}>
      <a className='Book--link'>
        {imageUrl && <img src={imageUrl} className='Book--image' />}
        <h3 className='Book--title'>{title}</h3>
      </a>
    </Link>
    <style jsx>{`
      .Book {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      .Book--link {
        text-decoration: none;
        color: black;
        text-align: center;
      }

      .Book--image {
        height: 18rem;
      }

      .Book--title {
        font-size: 1rem;
        text-align: center;
      }
    `}</style>
  </div>
