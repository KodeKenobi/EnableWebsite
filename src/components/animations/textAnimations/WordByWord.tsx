'use client';

import React, { useState } from 'react';
import { SandpackProvider, SandpackLayout, SandpackCodeEditor, SandpackPreview } from "@codesandbox/sandpack-react";

export default function WordByWord() {
    const [settings, setSettings] = useState({
        showEditor: false,
        instanceKey: 0,
        textContent: "The quick brown fox jumps over the lazy dog",
        animationSpeed: 0.1,
        textSize: 24,
        textColor: "#000",
        animationDirection: "top",
        startOpacity: 0,
        duration: 0.5
    });

    const handleToggle = () => {
        setSettings(prev => ({ ...prev, showEditor: !prev.showEditor, instanceKey: prev.instanceKey + 1 }));
    };

    const handleChange = (key: string, value: any) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const predefinedCode = `
    "use client";
    import { motion, useInView } from 'framer-motion';
    import * as React from 'react';

    export function WordsPullUp({ text }) {
        const splittedText = text.split(' ');

        const directionMap = {
            top: { y: ${settings.textSize}, opacity: ${settings.startOpacity} },
            bottom: { y: -${settings.textSize}, opacity: ${settings.startOpacity} },
            left: { x: ${settings.textSize * 5}, opacity: ${settings.startOpacity} },
            right: { x: -${settings.textSize * 5}, opacity: ${settings.startOpacity} }
        };

        const pullupVariant = {
            initial: directionMap["${settings.animationDirection}"],
            animate: (i) => ({
                x: 0,
                y: 0,
                opacity: 1,
                transition: { delay: i * 0.5 * ${settings.animationSpeed}, duration: ${settings.duration} },
            }),
            ease: "easeout"
        };
        
        const ref = React.useRef(null);
        const isInView = useInView(ref, { once: true });
        
        return (
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {splittedText.map((current, i) => (
                    <div ref={ref} key={i} style={{ overflow: "hidden" }}>
                        <motion.div
                            variants={pullupVariant}
                            initial="initial"
                            animate={isInView ? 'animate' : ''}
                            custom={i}
                            style={{ fontSize: "${settings.textSize}px", color: "${settings.textColor}", marginRight: "0.25em", overflow: "hidden" }}
                        >
                            {current === '' ? <span>&nbsp;</span> : current}
                        </motion.div>
                    </div>
                ))}
            </div>
        );
    }

    export default function App() {
        return <WordsPullUp text="${settings.textContent}" />;
    }`;

    return (
        <div>
            <div className='flex gap-2 mb-2 justify-between'>
                <h3 className='text-[24px] font-times font-[500] text-OffWhite'>Word By Word</h3>
                <div className='flex gap-2 justify-end'>
                    <button
                        className={`h-[30px] group rounded-[30px] text-times text-[14px] px-[40px] border-2 flex items-center gap-2 ${settings.showEditor ? "bg-transparent text-BurntOrange border-BurntOrange" : "bg-BurntOrange text-white border-BurntOrange"}`}
                        onClick={handleToggle}
                    >
                        <span className='group-hover:scale-[0.95] duration-300'>Preview</span>
                    </button>
                    <button
                        className={`h-[30px] group rounded-[30px] text-times text-[14px] px-[40px] border-2 flex items-center gap-2 ${!settings.showEditor ? "bg-transparent text-BurntOrange border-BurntOrange" : "bg-BurntOrange text-white border-BurntOrange"}`}
                        onClick={handleToggle}
                    >
                        <span className='group-hover:scale-[0.95] duration-300'>Code</span>
                    </button>
                </div>
            </div>
            <div className='full h-[1px] bg-BurntOrange mb-6' />
            <div className='grid grid-cols-2'>
                <SandpackProvider
                    key={settings.instanceKey}
                    template="react"
                    files={{
                        "/App.js": predefinedCode
                    }}
                    options={{
                        visibleFiles: ["/App.js"],
                        activeFile: "/App.js",
                    }}
                    customSetup={{
                        dependencies: {
                            "framer-motion": "latest"
                        }
                    }}
                >
                    <SandpackLayout style={{ maxHeight: 530 }}>
                        {settings.showEditor ? <SandpackCodeEditor style={{ height: "100%" }} /> : <SandpackPreview />}
                    </SandpackLayout>
                </SandpackProvider>
                <div className='bg-DarkTeal p-6 rounded-lg grid grid-cols-2 gap-4'>
                    <h3 className='text-white text-2xl mb-4 col-span-2'>Customization</h3>
                    <div className='col-span-2'>
                        <label className='text-white block mb-2'>Text Content</label>
                        <input type='text' value={settings.textContent} onChange={(e) => handleChange('textContent', e.target.value)} className='p-3 px-4 w-full bg-MediumTeal rounded-[100px] text-xs  text-white' />
                    </div>
                    <div className='col-span-2'>
                        <label className='text-white block mb-2'>Animation Speed</label>
                        <input type='range' min='0.05' max='0.5' step='0.05' value={settings.animationSpeed} onChange={(e) => handleChange('animationSpeed', parseFloat(e.target.value))} className='w-full mb-4' />
                    </div>
                    <div>
                        <label className='text-white block mb-2'>Text Size</label>
                        <input type='number' value={(settings.textSize)} onChange={(e) => handleChange('textSize', e.target.value)} className='p-3 px-4 w-full bg-MediumTeal rounded-[100px] text-xs text-white' />
                    </div>
                    <div>
                        <label className='text-white block mb-2'>Text Color</label>
                        <input type='color' value={settings.textColor} onChange={(e) => handleChange('textColor', e.target.value)} className='w-full h-10 rounded bg-MediumTeal' />
                    </div>
                    <div>
                        <label className='text-white block mb-2'>Animation Direction</label>
                        <select value={settings.animationDirection} onChange={(e) => handleChange('animationDirection', e.target.value)} className='p-3 px-4 w-full bg-MediumTeal rounded-[100px] text-xs  text-white'>
                            <option value='top'>Top</option>
                            <option value='bottom'>Bottom</option>
                            <option value='left'>Left</option>
                            <option value='right'>Right</option>
                        </select>
                    </div>
                    <div>
                        <label className='text-white block mb-2'>Start Opacity</label>
                        <input
                            type='number'
                            min='0'
                            max='100'
                            step='1'
                            value={settings.startOpacity * 100}
                            onChange={(e) => handleChange('startOpacity', parseFloat(e.target.value) / 100)}
                            className='p-3 px-4 w-full bg-MediumTeal rounded-[100px] text-xs  text-white'
                        />
                    </div>
                    <div>
                        <label className='text-white block mb-2'>Animation Duration Per Word</label>
                        <input
                            type='number'
                            min='0'
                            max='5'
                            step='1'
                            value={settings.duration}
                            onChange={(e) => handleChange('duration', parseFloat(e.target.value))}
                            className='p-3 px-4 w-full bg-MediumTeal rounded-[100px] text-xs  text-white'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}