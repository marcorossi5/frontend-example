# Frontend example with React.js

## Document extractor

The purpose of this repository is to create an interactive web page to build
document extractor pipelines.

The main idea is to provide the user with an interactive interface where he can
connect the nodes of the document extractor pipeline without even touching json
configuration file.

The package is built on top of the [React Flow](https://reactflow.dev/) package.

## Install dependencies

The following command will install the package dependencies:

```bash
npm install
```

## Launch the dashboard

The UI can be launched in dev mode with the command below:

```bash
npm start
```

A browser window will open authomatically, otherwise just navigate to
`http://localhost:3000` in your preferred browser.

## Extensibility

Adding a new type of node to the pipeline is easy as adding a new component in
the [Nodes.js](./src/Nodes.js) file.
