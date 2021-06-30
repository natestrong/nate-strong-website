const sanityClient = require('@sanity/client');
const imageUrlBuilder = require('@sanity/image-url');
const blocksToHtml = require('@sanity/block-content-to-html');

// passing the env vars to Sanity.io
const sanity = sanityClient({
  projectId: '419svs85',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2021-03-25',
});

function getImageUrl(imageAsset) {
  let imageUrl;
  try {
    imageUrl = imageUrlBuilder(sanity).image(imageAsset._ref).url();
  } catch (e) {
    console.log(e);
  }
  return imageUrl;
}

function getReviewHtml(review) {
  let html;
  if (review) {
    try {
      html = blocksToHtml({blocks: review});
    } catch (e) {
      console.log(e);
    }
  }
  return html;
}

exports.handler = async () => {
  const query = '*[_type=="book"] | order(startedDate asc)';
  const books = await sanity.fetch(query).then((results) => {
    return results.map(result => {
      return {
        title: result.title,
        subtitle: result.subtitle,
        author: result.author,
        website: result.website,
        image: getImageUrl(result.image.asset),
        review: getReviewHtml(result.review),
        recommended: result.recommended,
        startedDate: new Date(result.startedDate),
        finishedDate: new Date(result.finishedDate),
      };
    });
  });

  return {
    statusCode: 200,
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(books),
  };
};
