export default function Navbar({setRoute}) {
  return (
    <header className="flex items-center mb-12 justify-between">
      <div className="flex items-center">
        <img src="./assets/logo.svg" className="h-10" />
      </div>
      <ul className="ml-4 text-sm text-zinc-400 flex gap-8">
        <a
        onClick={()=> setRoute("createPage")}
          // href="./index.html"
          className="hover:text-zinc-200 font-medium text-zinc-200 cursor-pointer transition-all"
        >
          Create Image
        </a>
        <a
        onClick={()=> setRoute("download")}
          // href="./downloaded.html"
          className="hover:text-zinc-200 cursor-pointer transition-all"
        >
          Downloaded
        </a>
      </ul>
    </header>
  );
}
