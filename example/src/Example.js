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
      <p>Contact Channel: {props.contactChannel}</p>
      <p>{props.termsAgreement ? "Agreed!" : "Did not agree yet!"}</p>
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
    description: undefined,
    cover: undefined,
    termsAgreement: undefined,
    contactChannel: undefined,
    foo: "defined",
    bar: "alsodefined",
    description: undefined,
    genre: undefined
  };
  const [book, setBook] = useState(emptyBook);
  console.log("Book", book);
  return (
    <Card elevation={5} className="rating">
      <CardHeader title="Stoopy" />
      <CardContent>
        <Stoopy
          onNext={values => {
            console.log("===== values ===== \n");
            console.log("values", values);
            console.log("===== values ===== \n");

            setBook({ ...book, ...values });
          }}
          target={book}
          fields={[
            {
              name: "genre",
              type: "select",
              choices: ["sci-fi", "drama", "fantasy"]
            },
            "name",
            "foo",
            "bar",
            { name: "description", type: "text", multiline: true },

            { name: "cover", type: "avatar" },
            {
              name: "contactChannel",
              type: "radio",
              label: "Select the best channel for readers to contact you:",
              choices: [
                { label: "email", value: "email" },
                { label: "telefone", value: "telefone" }
              ]
            },
            { name: "year", type: "date", label: "DATA" },
            {
              name: "termsAgreement",
              type: "checkbox",
              topLabel: "Do you agree with our terms?",
              label: "I do!"
            }
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

        `}
      </SyntaxHighlighter>
    </Card>
  );
};

export default Example;
