export default ({ title, imageUrl, author, slug }) =>
  <div key={slug}>
    {imageUrl && <img src={imageUrl} />}
    <h3>{title}</h3>
    <style jsx>{`
      div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
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
