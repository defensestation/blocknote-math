import {
  BlockNoteSchema,
  defaultBlockSpecs,
  defaultInlineContentSpecs,
} from "@blocknote/core";
import { filterSuggestionItems } from "@blocknote/core/extensions";
import { BlockNoteView } from "@blocknote/mantine";
import {
  getDefaultReactSlashMenuItems,
  SuggestionMenuController,
  useCreateBlockNote,
  usePrefersColorScheme,
} from "@blocknote/react";
import {
  getMathSlashMenuItems,
  latexInlineContentSpecs,
  mathBlockSpecs,
} from "@defensestation/blocknote-math";

const schema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    ...mathBlockSpecs,
  },
  inlineContentSpecs: {
    ...defaultInlineContentSpecs,
    ...latexInlineContentSpecs,
  },
});

export function App() {
  const preferredTheme = usePrefersColorScheme();
  const theme = preferredTheme === "dark" ? "dark" : "light";
  const editor = useCreateBlockNote({
    schema,
    initialContent: [
      {
        type: "heading",
        props: { level: 2 },
        content: "LaTeX math",
      },
      {
        type: "paragraph",
        content: [
          { type: "text", text: "The mass-energy equivalence is ", styles: {} },
          {
            type: "latex",
            props: { latex: "E = mc^2", displayMode: false },
          },
          { type: "text", text: ".", styles: {} },
        ],
      },
      {
        type: "equation",
        props: { latex: "\\int_0^1 x^2 \\, dx = \\frac{1}{3}" },
      },
      {
        type: "paragraph",
        content: "Long equations wrap to the editor width:",
      },
      {
        type: "equation",
        props: {
          latex:
            "\\mathcal{L}(\\theta) = -\\sum_{i=1}^{N} \\sum_{c=1}^{C} y_{ic} \\log p_{\\theta}(c \\mid x_i) + \\lambda \\lVert \\theta \\rVert_2^2 + \\frac{\\alpha}{2} \\sum_{j=1}^{M} (\\hat{y}_j - y_j)^2",
        },
      },
      {
        type: "paragraph",
        content:
          "Type /math to choose an inline or block formula. Press Enter to render it, then click it to edit.",
      },
    ],
  } as any);

  const getSlashMenuItems = async (query: string) =>
    filterSuggestionItems(
      [
        ...getDefaultReactSlashMenuItems(editor as any),
        ...getMathSlashMenuItems(editor),
      ],
      query,
    );

  return (
    <main>
      <header>
        <p className="eyebrow">BlockNote plugin example</p>
        <h1>Math &amp; LaTeX</h1>
        <p>Use the native slash menu to write and render LaTeX without leaving the editor.</p>
      </header>
      <section className="editor-card" aria-label="BlockNote editor example">
        <BlockNoteView editor={editor as any} theme={theme} slashMenu={false}>
          <SuggestionMenuController
            triggerCharacter="/"
            getItems={getSlashMenuItems}
          />
        </BlockNoteView>
      </section>
    </main>
  );
}
