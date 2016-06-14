import React from 'react';

const Page = ({ cssUri, data, initialState, jsUri, markup }) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {cssUri && <link rel="stylesheet" href={cssUri} />}
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.2/css/font-awesome.min.css" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.3.15/slick.css" />
      <title>MiMi</title>
    </head>
    <body>
      <div id="root" dangerouslySetInnerHTML={{ __html: markup }}></div>
      <script
        id="reduxData"
        type="application/json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(initialState) }}
      ></script>
      <script
        id="preloadedData"
        type="application/json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/\//g, '\\/') }}
      ></script>
      <script src={jsUri}></script>
    </body>
  </html>
);

Page.propTypes = {
  cssUri: React.PropTypes.string,
  initialState: React.PropTypes.object,
  data: React.PropTypes.array,
  jsUri: React.PropTypes.string.isRequired,
  markup: React.PropTypes.string,
};

export default Page;
