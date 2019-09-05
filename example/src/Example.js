import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import prism from "react-syntax-highlighter/dist/esm/styles/prism/prism";
import { Card, CardHeader, CardContent } from "@material-ui/core";

import { Stoopy } from "@seasonedsoftware/stoopy";

// { name: "cover", type: "avatar" },

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
  );
};

const Example = () => {
  const [book, setBook] = useState({ author: "You" });
  const [logNext, setLogNext] = useState(null);
  const [logEnd, setLogEnd] = useState(null);
  const [logProgress, setLogProgress] = useState(null);
  return (
    <Card elevation={5} className="rating">
      <CardHeader title="Stoopy" />
      <CardContent>
        <Stoopy
          initialState={book}
          fields={[
            "author",
            "bookName",
            {
              name: "genre",
              type: "select",
              choices: ["sci-fi", "drama", "fantasy"]
            },
            { name: "Resume", type: "text" },
            {
              name: "What kind of cover should we print",
              type: "radio",
              choices: ["hardCover", "paperBack"]
            },
            {
              name: "Google Play and Apple Store",
              type: "checkbox"
            },
            { name: "Published year", type: "year" },
            { name: "Year/month", type: "yearMonth" },
            { name: "Release Date", type: "date" },
            { name: "cover", type: "avatar" }
          ]}
          onNext={({ value, values }) => {
            setBook({ ...book, value });
            setLogNext({ value, values });
          }}
          onEnd={values => {
            setLogEnd(values);
            setBook(values);
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
          ""}
${(logEnd &&
          `onEnd -->  ${JSON.stringify(logEnd)},
`) ||
          ""}
${(logProgress &&
          `onProgress -->  ${JSON.stringify(logProgress)},
`) ||
          ""}
// End of logs

import { Stoopy } from '@seasonedsoftware/stoopy'

// MyComponent
const [book, setBook] = useState({ author: 'You'});
<Stoopy
  fields={[
    "author",
    "bookName",
    {
      name: "genre",
      type: "select",
      choices: ["sci-fi", "drama", "fantasy"]
    },
    { name: "Resume", type: "text" },
    {
      name: "What kind of cover should we print",
      type: "radio",
      choices: ["hardCover", "paperBack"]
    },
    {
      name: "Google Play and Apple Store",
      type: "checkbox"
    },
    { name: "Published year", type: "year" },
    { name: "Year/month", type: "yearMonth" },
    { name: "Release Date", type: "date" },
    { name: "cover", type: "avatar" }
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
  );
};

export default Example;
