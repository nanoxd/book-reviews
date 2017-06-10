import Link from 'next/link'

export default ({ title, imageUrl, author, slug }) =>
  <div key={slug}>
    <Link href={`/review?slug=${slug}`} as={`/review/${slug}`}>
      <a>

        {imageUrl && <img src={imageUrl} />}
        <h3>{title}</h3>
      </a>
    </Link>
    <style jsx>{`
      div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      a {
        text-decoration: none;
        color: black;
        text-align: center;
      }

      img {
        height: 18rem;
      }

      h3 {
        font-size: 1rem;
        text-align: center;
      }
    `}</style>
  </div>
