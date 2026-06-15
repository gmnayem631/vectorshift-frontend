import { PipelineToolbar } from "./toolbar";
import { PipelineUI } from "./ui";
import { SubmitButton } from "./submit";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-950">
      <Toaster position="top-right" />
      {/* left sidebar */}
      <aside
        className="w-64 h-full bg-gray-900 border-r border-gray-700 
                        flex flex-col shadow-xl z-10"
      >
        <PipelineToolbar />
      </aside>

      {/* right side - canvas and submit button*/}
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        {/* canvas */}
        <main className="flex-1 overflow-hidden">
          <PipelineUI />
        </main>

        {/* submit button*/}
        <footer
          className="bg-gray-900 border-t border-gray-700 px-6 py-3 
                           flex justify-end items-center"
        >
          <SubmitButton />
        </footer>
      </div>
    </div>
  );
}

export default App;
