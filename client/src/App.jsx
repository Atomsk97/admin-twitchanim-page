import { HomePage, AnimForm, NotFound } from "./pages/index";

import { Routes, Route } from "react-router-dom";

import { AnimProvider } from "./context/AnimProvider";

function App() {
  return (
    <div className="bg-neutral-900 min-h-screen flex items-center">
      <div className="px-10 container m-auto text-white">
        <AnimProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/anims/:id" element={<AnimForm />} />
            <Route path="/new" element={<AnimForm />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimProvider>
      </div>
    </div>
  );
}

export default App;
