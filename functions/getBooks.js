const sanityClient = require('@sanity/client');
const imageUrlBuilder = require('@sanity/image-url');
const blocksToHtml = require('@sanity/block-content-to-html');

// passing the env vars to Sanity.io
const sanity = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: true,
});

exports.handler = async () => {
  const query = '*[_type=="book"] | order(startedDate asc)';
  const books = await sanity.fetch(query).then((results) => {
    // then it iterates over each product
    const allBooks = results.map(book => {
      // & assigns its properties to output
      const output = {
        // id: product.slug.current,
        // name: product.title,
        // url: `${process.env.URL}/.netlify/functions/getBooks`,
        // price: product.defaultProductVariant.price,
        // description: product.blurb,
        // // this is where we use the Sanity.io library to make the text HTML
        // body: blocksToHtml({blocks: product.body}),
        title: book.title,
        author: book.author
      };

      // const image =
      //   product.defaultProductVariant.images &&
      //   product.defaultProductVariant.images.length > 0
      //     ? product.defaultProductVariant.images[0].asset._ref
      //     : null;

      // if (image) {
      //   // this is where we use the library to make a URL from the image records
      //   output.image = imageUrlBuilder(sanity).image(image).url();
      // }
      return output;
    });
    // this log lets us see that we're getting the projects
    // we can delete this once we know it works
    console.log(allBooks);

    // now it will return all of the products and the properties requested
    return allBooks;
  });

  return {
    statusCode: 200,
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(books),
  };
};
