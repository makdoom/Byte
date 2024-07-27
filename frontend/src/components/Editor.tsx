import { BlockEditor } from "@/components/BlockEditor";
import { EditorHeader } from "@/components/EditorHeader";

export const Editor = () => {
  return (
    <div className="flex-1 p-4">
      <EditorHeader />

      <BlockEditor />
    </div>
  );
};
