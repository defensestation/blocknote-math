# React example

Install and run the example from this directory:

```sh
cd examples/react
npm install
npm run dev
```

The example imports this package by its public name through `file:../..`, so
it exercises the same API as a consumer. Type `/math`, then choose **Inline
equation** or **Block equation**. Write LaTeX directly in the focused field,
then press Enter or click away to render it. Click a rendered equation to edit
its source again.

KaTeX's stylesheet is imported in `src/main.tsx`; keep that import in a host
application to load the equation fonts and layout rules.
