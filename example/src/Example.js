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
        <b>{props.name}</b>
      </h1>
      <img src={props.cover} />
      <p>A book about "{props.description}"</p>
      <p>
        <b>Genre:</b>
        {props.genre}
      </p>
    </div>
  );
};

const Example = () => {
  const emptyBook = {};
  const [book, setBook] = useState(emptyBook);
  const [logNext, setLogNext] = useState(null);
  const [logEnd, setLogEnd] = useState(null);
  const [logProgress, setLogProgress] = useState(null);
  return (
    <Card elevation={5} className="rating">
      <CardHeader title="Stoopy" />
      <CardContent>
        <Stoopy
          title="Add your book in a few steps!"
          onNext={({ value, values }) => {
            setLogNext({ value, values });
          }}
          onEnd={values => {
            setLogEnd(values);
          }}
          progress={progress => setLogProgress(progress)}
          fields={[
            "name",
            { name: "description", type: "text", multiline: true },
            {
              name: "genre",
              type: "select",
              choices: ["sci-fi", "drama", "fantasy"]
            }
          ]}
        >
          <BookInfo {...book} />
        </Stoopy>
      </CardContent>
      <SyntaxHighlighter language="javascript" style={prism}>
        {`
// Console logs printed bellow to make it easier:
${(logNext &&
          `
onNext --> {
  value: ${JSON.stringify(logNext.value)},
  values: ${JSON.stringify(logNext.values)},
}`) ||
          ""}
${(logEnd &&
          `
onEnd -->  ${JSON.stringify(logEnd)},
`) ||
          ""}
${(logProgress &&
          `
progress -->  ${JSON.stringify(logProgress)},
`) ||
          ""}

// End of log space

import { Stoopy } from '@seasonedsoftware/stoopy'

// MyComponent
const [book, setBook] = useState({});
<Stoopy
  onNext={({ value, values}) => console.log('onNext -->', value, values)}
  onEnd={values => setBook(values)}
  fields={[
    "name",
    { name: "description", type: "text", multiline: true },
    { name: "cover", type: "avatar" },
    {
      name: "genre",
      type: "select",
      choices: ["sci-fi", "drama", "fantasy"]
    },
  ]}
>
  <BookInfo {...book} />
</Stoopy>


        `}
      </SyntaxHighlighter>
    </Card>
  );
};

export default Example;
