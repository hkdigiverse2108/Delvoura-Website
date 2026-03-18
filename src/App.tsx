
import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { Router } from "./Routers";
import GlobalLoader from "./Layout/GlobalLoader";

const App = () => {
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const id = setTimeout(() => setInitialLoading(false), 1500);
    return () => clearTimeout(id);
  }, []);

  return (
    <>
      <GlobalLoader visible={initialLoading} />
      <RouterProvider router={Router} />
    </>
  );
};

export default App;
