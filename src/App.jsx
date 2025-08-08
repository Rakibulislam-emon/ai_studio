import { useState } from "react";
import CreatePage from "./components/CreatePage/CreatePage";
import Download from "./components/Download/Download";
import Navbar from "./components/Layout/Navbar";

export default function App() {
  const [route, setRoute] = useState("createPage");

  return (
    <div  className="bg-black  text-white ">
      <div className="container mx-auto">
        {" "}
        <Navbar setRoute={setRoute} />
        {route === "createPage" ? <CreatePage /> : <Download />}
        <div className="fixed -bottom-1/4 -right-0 ">
          <div className="h-96 w-96 bg-gradient-to-r from-pink-600 to-indigo-400 rotate-90 rounded-full blur-[180px] "></div>
        </div>
      </div>
    </div>
  );
}
