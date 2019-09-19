import React, { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import prism from 'react-syntax-highlighter/dist/esm/styles/prism/prism'
import { Card, CardHeader, CardContent } from '@material-ui/core'
import { DropPicture } from 'uploods'
import { Stoopy } from '@seasonedsoftware/stoopy'

const BookInfo = props => {
  return (
    <div>
      <h1>
        <b>{props.bookName}</b>
      </h1>
      <p>
        by<small> {props.author}</small>
      </p>
      <img src={props.cover} />
      <p>Cover type: {props.coverType}</p>
      <p>
        <b>Genre:</b>
        {props.genre}
      </p>
    </div>
  )
}

const Example = () => {
  const [book, setBook] = useState({ author: 'You' })
  const [logNext, setLogNext] = useState(null)
  const [logEnd, setLogEnd] = useState(null)
  const [logProgress, setLogProgress] = useState(null)
  return (
    <Card elevation={5} className="rating">
      <CardHeader title="Stoopy" />
      <CardContent>
        <Stoopy
          initialState={book}
          fields={[
            'author',
            'bookName',
            {
              name: 'genre',
              type: 'select',
              choices: ['sci-fi', 'drama', 'fantasy'],
              optional: true
            },
            { name: 'Resume', type: 'text' },
            {
              name: 'What kind of cover should we print',
              type: 'radio',
              choices: ['hardCover', 'paperBack'],
            },
            {
              name: 'Google Play and Apple Store',
              type: 'checkbox',
            },
            { name: 'cover',
              type: 'raw',
              Component: ({ setValue, ...props }) => (
                  <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <DropPicture
                      maxDimension={200}
                      config={{
                        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
                        storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET ,
                      }}
                      {...props}
                      />
                  </div>
                ),
                onChange: file => file.url,
              },
          ]}
          onNext={({ value, values }) => {
            setBook({ ...book, value })
            setLogNext({ value, values })
          }}
          onEnd={values => {
            setLogEnd(values)
            setBook(values)
          }}
          onProgress={progress => setLogProgress(progress)}
          title="Publish your book in a few steps!"
        >
          <BookInfo {...book} />
        </Stoopy>
      </CardContent>
      <SyntaxHighlighter language="javascript" style={prism}>
        {`
// Console logs printed bellow for your convenience:
${(logNext &&
  `onNext --> {
  value: ${JSON.stringify(logNext.value)},
  values: ${JSON.stringify(logNext.values)},
}`) ||
  ''}
${(logEnd &&
  `onEnd -->  ${JSON.stringify(logEnd)},
`) ||
  ''}
${(logProgress &&
  `onProgress -->  ${JSON.stringify(logProgress)},
`) ||
  ''}
// End of logs

import { Stoopy } from '@seasonedsoftware/stoopy'

// MyComponent
const [book, setBook] = useState({ author: 'You'});
<Stoopy
  fields={[
    'author',
    'bookName',
    {
      name: 'genre',
      type: 'select',
      choices: ['sci-fi', 'drama', 'fantasy'],
      optional: true
    },
    { name: 'Resume', type: 'text' },
    {
      name: 'What kind of cover should we print',
      type: 'radio',
      choices: ['hardCover', 'paperBack'],
    },
    {
      name: 'Google Play and Apple Store',
      type: 'checkbox',
    },
    { name: 'cover',
      type: 'raw',
      Component: ({ setValue, ...props }) => (
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <DropPicture
              maxDimension={200}
              config={{
                apiKey,
                storageBucket,
              }}
              {...props}
              />
          </div>
        ),
        onChange: file => file.url,
      },
  ]}
  initialState={book} // Any field in here will be skiped (but still considered in step counting)
  onNext={({ value, values}) => console.log('onNext -->', value, values)}
  onEnd={values => {
    console.log('onEnd -->', value, values)
    setBook(values)
  }}
  onProgress={progress => console.log('onProgress -->',progress)}
  title="Publish your book in a few steps!"
>
  <BookInfo {...book} />
</Stoopy>
        `}
      </SyntaxHighlighter>
    </Card>
  )
}

export default Example
