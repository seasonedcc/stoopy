import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import prism from 'react-syntax-highlighter/dist/esm/styles/prism/prism'
import { Card, CardHeader, CardContent } from '@material-ui/core'

import { Stoopy } from '@seasonedsoftware/stoopy'

const Example = () => (
  <Card elevation={5} className="rating">
    <CardHeader title="My sample" />
    <CardContent>
      <Stoopy />
    </CardContent>
    <SyntaxHighlighter language="javascript" style={prism}>
      {`
import { Stoopy } from '@seasonedsoftware/stoopy'

// MyComponent
<Stoopy />
      `}
    </SyntaxHighlighter>
  </Card>
)

export default Example
