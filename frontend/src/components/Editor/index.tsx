// import { BlockEditor } from "@/components/BlockEditor";
import { CustomYoptaEditor } from "@/components/Editor/CustomYoptaEditor";
import { EditorHeader } from "@/components/Editor/EditorHeader";

export const Editor = () => {
  return (
    <div className="flex-1 p-4">
      <EditorHeader />

      <CustomYoptaEditor />
      {/* <BlockEditor /> */}
    </div>
  );
};
