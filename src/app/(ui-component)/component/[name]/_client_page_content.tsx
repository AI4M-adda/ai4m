"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Copy, Eye, Code, Play } from "lucide-react";
import { componentConfigs, ComponentId } from "../../_lib/component-configs";

interface ClientPageContentProps {
  componentId: ComponentId;
}

export default function ClientPageContent({
  componentId,
}: ClientPageContentProps) {
  const config = componentConfigs[componentId] || {};

  const [props, setProps] = useState(config.defaultProps);
  const [codeVisible, setCodeVisible] = useState(true);

  const updateProp = (key: string, value: any) => {
    setProps((prev) => ({ ...prev, [key]: value }));
  };

  const generateJSXCode = () => {
    const propsString = Object.entries(props || {})
      .filter(([key, value]) => {
        if (key === "children" && React.isValidElement(value)) return false;
        return (
          value !== config.defaultProps[key as keyof typeof config.defaultProps]
        );
      })
      .map(([key, value]) => {
        if (typeof value === "boolean") {
          return value ? key : `${key}={false}`;
        }
        if (typeof value === "string") {
          return `${key}="${value}"`;
        }
        return `${key}={${JSON.stringify(value)}}`;
      })
      .join(" ");

    const childrenContent =
      typeof props?.children === "string" ? props?.children : "Card Content";
    return `<${config.name}${propsString ? " " + propsString : ""}${
      componentId === "card" || componentId === "button"
        ? `>\n  ${childrenContent}\n</${config.name}>`
        : " />"
    }`;
  };

  const copyCode = () => {
    navigator.clipboard.writeText(generateJSXCode());
  };

  const Component = config.component;

  if (!config) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">
            Component Not Found
          </h1>
          <Link href="/component" className="text-blue-600 hover:text-blue-700">
            ← Back to Library
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Link
              href="/component"
              className="inline-flex items-center text-slate-600 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Library
            </Link>
            <div className="w-px h-6 bg-slate-300" />
            <h1 className="text-2xl font-bold text-slate-900">{config.name}</h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Preview Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Component Info */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h2 className="text-xl font-semibold text-slate-900 mb-2">
                {config.name} Component
              </h2>
              <p className="text-slate-600">{config.description}</p>
            </div>

            {/* Live Preview */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900 flex items-center">
                  <Eye className="w-5 h-5 mr-2" />
                  Live Preview
                </h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCodeVisible(!codeVisible)}
                    className={`inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      codeVisible
                        ? "bg-blue-600 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    <Code className="w-4 h-4 mr-2" />
                    Code
                  </button>
                </div>
              </div>

              {/* Preview Area */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-12 border border-slate-200 mb-6">
                <div className="flex items-center justify-center min-h-[100px]">
                  <Component {...props} />
                </div>
              </div>

              {/* Code Display */}
              {codeVisible && (
                <div className="bg-slate-900 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-slate-400 text-sm font-medium">
                      JSX
                    </span>
                    <button
                      onClick={copyCode}
                      className="inline-flex items-center px-3 py-1 bg-slate-800 text-slate-300 rounded text-sm hover:bg-slate-700 transition-colors"
                    >
                      <Copy className="w-4 h-4 mr-1" />
                      Copy
                    </button>
                  </div>
                  <pre className="text-green-400 text-sm overflow-x-auto">
                    <code>{generateJSXCode()}</code>
                  </pre>
                </div>
              )}
            </div>
          </div>

          {/* Controls Panel */}
          <div className="space-y-6">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                <Play className="w-5 h-5 mr-2" />
                Props Controls
              </h3>

              <div className="space-y-4">
                {Object.entries(config.propControls).map(([key, control]) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {control.label}
                    </label>

                    {control.type === "text" && (
                      <input
                        type="text"
                        value={props[key as keyof typeof props] as string}
                        onChange={(e) => updateProp(key, e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    )}

                    {control.type === "select" && (
                      <select
                        value={props[key as keyof typeof props] as string}
                        onChange={(e) => updateProp(key, e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {control.options?.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    )}

                    {control.type === "boolean" && (
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={props[key as keyof typeof props] as boolean}
                          onChange={(e) => updateProp(key, e.target.checked)}
                          className="rounded border-slate-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        />
                        <span className="ml-2 text-sm text-slate-600">
                          {control.label}
                        </span>
                      </label>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Usage Guide */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h4 className="font-semibold text-slate-900 mb-3">Usage Guide</h4>
              <div className="text-sm text-slate-600 space-y-2">
                <p>• Modify props using the controls above</p>
                <p>• See real-time changes in the preview</p>
                <p>• Copy the generated JSX code</p>
                <p>• Import and use in your project</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
