import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { COLOR_PRESETS } from "@/lib/constants";

function ColorPicker({ label, value, onChange }: { label: string; value: string; onChange: (color: string) => void }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex items-center space-x-2">
        <div className="flex-1 flex items-center space-x-2 p-2 border rounded">
          <Input type="text" value={value} onChange={(e) => onChange(e.target.value)} className="flex-1" placeholder="#000000" />
          <Input type="color" value={value} onChange={(e) => onChange(e.target.value)} className="w-10 h-10 p-0 border-0 rounded-md" />
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mt-2">
        {COLOR_PRESETS.map((color) => (
          <button
            type="button"
            key={color}
            className="w-6 h-6 rounded-full border focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{ backgroundColor: color }}
            onClick={() => onChange(color)}
          />
        ))}
      </div>
    </div>
  );
}

export default ColorPicker;
