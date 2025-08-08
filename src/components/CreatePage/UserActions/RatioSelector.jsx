import { useState, useContext } from "react";
import { ImageContext } from "../../../context/ImageContext";


export default function RatioSelector() {
  const { setSearchTerm, data, loading, error } = useContext(ImageContext);
  const [model, setModel] = useState("flux");
  const [seed, setSeed] = useState(""); // Empty for random seeds
  const [width, setWidth] = useState(1024);
  const [height, setHeight] = useState(1024);

  // Update context with parameters whenever they change
  const updateSearchParams = () => {
    setSearchTerm(prev => ({
      prompt: typeof prev === "string" ? prev : prev.prompt || "",
      model,
      seed: seed || undefined, // Use undefined for random seeds
      width,
      height,
    }));
  };

  // Handle input changes
  const handleModelChange = (e) => {
    setModel(e.target.value);
    updateSearchParams();
  };

  const handleSeedChange = (e) => {
    setSeed(e.target.value);
    updateSearchParams();
  };

  const handleWidthChange = (e) => {
    setWidth(Number(e.target.value));
    updateSearchParams();
  };

  const handleHeightChange = (e) => {
    setHeight(Number(e.target.value));
    updateSearchParams();
  };

  // Handle aspect ratio button clicks
  const handleAspectRatio = (ratio) => {
    let newWidth = width;
    let newHeight = height;
    if (ratio === "1:1") {
      newHeight = width;
    } else if (ratio === "16:9") {
      newHeight = Math.round((width * 9) / 16);
    } else if (ratio === "4:3") {
      newHeight = Math.round((width * 3) / 4);
    } else if (ratio === "3:2") {
      newHeight = Math.round((width * 2) / 3);
    }
    setWidth(newWidth);
    setHeight(newHeight);
    updateSearchParams();
  };

  return (
    <div className="border border-zinc-700/70 mb-6 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-medium text-white">Advanced Settings</h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Model Selection */}
        <div>
          <label
            htmlFor="model"
            className="block text-sm font-medium text-zinc-300 mb-1"
          >
            Model
          </label>
          <select
            id="model"
            value={model}
            onChange={handleModelChange}
            className="w-full px-3 py-2 bg-zinc-900/10 border border-zinc-700/70 rounded-md text-white"
          >
            <option className="bg-zinc-900" value="flux">
              Flux
            </option>
            <option className="bg-zinc-900" value="turbo">
              Turbo
            </option>
          </select>
        </div>

        {/* Seed Input */}
        <div>
          <label
            htmlFor="seed"
            className="block text-sm font-medium text-zinc-300 mb-1"
          >
            Seed (leave blank for random)
          </label>
          <input
            type="number"
            id="seed"
            value={seed}
            onChange={handleSeedChange}
            className="w-full bg-zinc-900/10 px-3 py-2 border border-zinc-700/70 rounded-md text-white"
            placeholder="Random"
          />
        </div>

        {/* Width Input */}
        <div>
          <label
            htmlFor="width"
            className="block text-sm font-medium text-zinc-300 mb-1"
          >
            Width
          </label>
          <input
            type="number"
            id="width"
            value={width}
            onChange={handleWidthChange}
            className="w-full bg-zinc-900/10 px-3 py-2 border border-zinc-700/70 rounded-md text-white"
            min="1"
          />
        </div>

        {/* Height Input */}
        <div>
          <label
            htmlFor="height"
            className="block text-sm font-medium text-zinc-300 mb-1"
          >
            Height
          </label>
          <input
            type="number"
            id="height"
            value={height}
            onChange={handleHeightChange}
            className="w-full bg-zinc-900/10 px-3 py-2 border border-zinc-700/70 rounded-md text-white"
            min="1"
          />
        </div>

        {/* Aspect Ratio Presets */}
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1">
            Aspect Ratio Presets
          </label>
          <div className="flex flex-wrap gap-2">
            {["1:1", "16:9", "4:3", "3:2"].map((ratio) => (
              <button
                key={ratio}
                onClick={() => handleAspectRatio(ratio)}
                className="bg-zinc-800 hover:bg-zinc-700 px-3 py-2 text-xs rounded text-white transition-colors"
              >
                {ratio}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}