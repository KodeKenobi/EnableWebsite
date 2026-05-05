"use client";

import React, { useState } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from "@codesandbox/sandpack-react";

export default function ParagraphSlide() {
  const [settings, setSettings] = useState({
    showEditor: false,
    instanceKey: 0,
    textContent: "The quick brown fox jumps over the lazy dog",
    animationSpeed: 0.8,
    textSize: "24px",
    textColor: "#ffffff",
    animationDirection: "y",
    startOpacity: 0,
    delay: 0.3,
  });

  const handleToggle = () => {
    setSettings((prev) => ({
      ...prev,
      showEditor: !prev.showEditor,
      instanceKey: prev.instanceKey + 1,
    }));
  };

  const handleChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const predefinedCode = `
    "use client";
    import { motion } from 'framer-motion';
    import * as React from 'react';

    export function AnimatedParagraph({ text }) {
        return (
            <motion.p
                style={{ fontSize: "${settings.textSize}", color: "${settings.textColor}" }}
                initial={{ ${settings.animationDirection}: 20, opacity: ${settings.startOpacity} }}
                animate={{ ${settings.animationDirection}: 0, opacity: 1 }}
                transition={{ duration: ${settings.animationSpeed}, delay: ${settings.delay}, ease: "easeInOut" }}
            >
                {text}
            </motion.p>
        );
    }

    export default function App() {
        return <AnimatedParagraph text="${settings.textContent}" />;
    }`;

  return (
    <div className="mt-20">
      <div className="flex gap-2 mb-2 justify-between">
        <h3 className="text-[24px] font-times font-[500] text-OffWhite">
          Paragraph Slide
        </h3>
        <div className="flex gap-2 justify-end">
          <button
            className={`h-[30px] group rounded-[30px] text-times text-[14px] px-[40px] border-2 flex items-center gap-2 ${settings.showEditor ? "bg-transparent text-BurntOrange border-BurntOrange" : "bg-BurntOrange text-white border-BurntOrange"}`}
            onClick={handleToggle}
          >
            <span className="group-hover:scale-[0.95] duration-300">
              Preview
            </span>
          </button>
          <button
            className={`h-[30px] group rounded-[30px] text-times text-[14px] px-[40px] border-2 flex items-center gap-2 ${!settings.showEditor ? "bg-transparent text-BurntOrange border-BurntOrange" : "bg-BurntOrange text-white border-BurntOrange"}`}
            onClick={handleToggle}
          >
            <span className="group-hover:scale-[0.95] duration-300">Code</span>
          </button>
        </div>
      </div>
      <div className="full h-[1px] bg-BurntOrange mb-6" />
      <div className="grid grid-cols-2">
        <SandpackProvider
          key={settings.instanceKey}
          template="react"
          files={{
            "/App.js": predefinedCode,
          }}
          options={{
            visibleFiles: ["/App.js"],
            activeFile: "/App.js",
          }}
          customSetup={{
            dependencies: {
              "framer-motion": "latest",
            },
          }}
        >
          <SandpackLayout>
            {settings.showEditor ? <SandpackCodeEditor /> : <SandpackPreview />}
          </SandpackLayout>
        </SandpackProvider>
        <div className="bg-DarkTeal p-6 rounded-lg">
          <h3 className="text-white text-2xl mb-4">Customization</h3>
          <label className="text-white block mb-2">Text Content</label>
          <input
            type="text"
            value={settings.textContent}
            onChange={(e) => handleChange("textContent", e.target.value)}
            className="w-full p-2 mb-4 rounded"
          />
          <label className="text-white block mb-2">Animation Speed</label>
          <input
            type="range"
            min="0.05"
            max="1"
            step="0.05"
            value={settings.animationSpeed}
            onChange={(e) =>
              handleChange("animationSpeed", parseFloat(e.target.value))
            }
            className="w-full mb-4"
          />
          <label className="text-white block mb-2">Text Size</label>
          <input
            type="number"
            value={parseInt(settings.textSize)}
            onChange={(e) => handleChange("textSize", e.target.value + "px")}
            className="w-full p-2 mb-4 rounded"
          />
          <label className="text-white block mb-2">Text Color</label>
          <input
            type="color"
            value={settings.textColor}
            onChange={(e) => handleChange("textColor", e.target.value)}
            className="w-full h-10 rounded"
          />
          <label className="text-white block mb-2">Animation Direction</label>
          <select
            value={settings.animationDirection}
            onChange={(e) => handleChange("animationDirection", e.target.value)}
            className="w-full p-2 mb-4 rounded"
          >
            <option value="y">Vertical</option>
            <option value="x">Horizontal</option>
          </select>
          <label className="text-white block mb-2">Start Opacity</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={settings.startOpacity}
            onChange={(e) =>
              handleChange("startOpacity", parseFloat(e.target.value))
            }
            className="w-full mb-4"
          />
        </div>
      </div>
    </div>
  );
}
