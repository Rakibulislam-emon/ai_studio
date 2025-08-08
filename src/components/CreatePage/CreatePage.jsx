import ImageContextProvider from "../../provider/ImageContextProvider.jsx";
import ResultSection from "./ResultSection/ResultSection";
import UserActions from "./UserActions/UserActions";
export default function CreatePage() {
  return (
    <ImageContextProvider>
      <div className="relative z-10">
        <h2 className="text-4xl font-bold mb-8">
          Let's create a masterpiece, Alvian!{" "}
          <span className="text-2xl">👋</span>
        </h2>
        <UserActions />
        <ResultSection />
      </div>
    </ImageContextProvider>
  );
}
