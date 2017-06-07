export default ({ books = [] }) =>
  <div>
    { books }
    <style jsx>{`
      div {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 1rem;
        grid-row-gap: 1rem;
        padding: 1rem;
      }

      @media screen and (min-width: 650px) {
        div {
          grid-template-columns: 1fr 1fr 1fr;
        }
      }

      @media screen and (min-width: 860px) {
        div {
          grid-template-columns: 1fr 1fr 1fr 1fr;
        }
      }

      @media screen and (min-width: 1080px) {
        div {
          grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        }
      }
    `}</style>
  </div>
