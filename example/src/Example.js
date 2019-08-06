import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import prism from "react-syntax-highlighter/dist/esm/styles/prism/prism";
import { Card, CardHeader, CardContent } from "@material-ui/core";

import { Stoopy } from "@seasonedsoftware/stoopy";

const BookInfo = props => {
  return (
    <div>
      <h1>
        <b>Title:</b>
        {props.name}
      </h1>
      <small>{props.year}</small>
      <img src={props.cover} />
      <p>{props.onSale === "true" ? "On Sale!" : "Not on Sale :("}</p>
      <p>{props.description}</p>
      <p>
        <b>Genre:</b>
        {props.genre}
      </p>
    </div>
  );
};

const Example = () => {
  const emptyBook = {
    name: undefined,
    year: undefined,
    cover: undefined,
    onSale: undefined,
    description: undefined,
    genre: undefined
  };
  const [book, setBook] = useState(emptyBook);
  console.log("Book", book);
  return (
    <Card elevation={5} className="rating">
      <CardHeader title="My sample" />
      <CardContent>
        <Stoopy
          onNext={setBook}
          target={book}
          fields={[
            {
              name: "onSale",
              type: "radio",
              props: {
                choices: [
                  { label: "on", value: "true" },
                  { label: "off", value: "false" }
                ]
              }
            },
            {
              name: "genre",
              type: "select",
              props: { choices: ["sci-fi", "drama", "fantasy"] }
            },
            "name",

            { name: "year", type: "number" },
            { name: "cover", type: "avatar" }
          ]}
        >
          <BookInfo {...book} />
        </Stoopy>
      </CardContent>
      <button style={{ width: 80 }} onClick={() => setBook(emptyBook)}>
        Reset
      </button>

      <SyntaxHighlighter language="javascript" style={prism}>
        {`
import { Stoopy, BookInfo } from '@seasonedsoftware/stoopy'

// MyComponent
const [book, setBook] = useState(emptyBook);
<Stoopy
  onNext={setBook}
  target={book}
  fields={[
    {
      name: "onSale",
      type: "radio",
      props: {
        choices: [
          // Values only be string
          { label: "on", value: "true" },
          { label: "off", value: "false" }
        ]
      }
    },
    {
      name: "genre",
      type: "select",
      props: { choices: ["sci-fi", "drama", "fantasy"] }
    },
    "name",

    { name: "year", type: "number" },
    { name: "cover", type: "avatar" }
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
