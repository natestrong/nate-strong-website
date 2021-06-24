export default {
  name: 'book',
  type: 'document',
  title: 'Book',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'subtitle',
      type: 'string',
      title: 'Subtitle',
    },
    {
      name: 'author',
      type: 'string',
      title: 'Author',
    },
    {
      name: 'website',
      type: 'url',
      title: 'Book Website',
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image',
    },
    {
      name: 'startedDate',
      type: 'date',
      title: 'Started Date',
    },
    {
      name: 'finishedDate',
      type: 'date',
      title: 'Finished Date',
    },
    {
      name: 'recommended',
      type: 'boolean',
      title: 'Recommended',
      initialValue: false
    },
    {
      title: 'review',
      name: 'review',
      type: 'array',
      of: [{type: 'block'}]
    }
  ]
}
