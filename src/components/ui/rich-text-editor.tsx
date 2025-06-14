import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export interface RichTextEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  readOnly?: boolean;
}

export const RichTextEditor = React.forwardRef<
  HTMLDivElement,
  RichTextEditorProps
>(({ value = '', onChange, placeholder, className, readOnly = false }, ref) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current && onChange) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (readOnly) return;

    // Handle basic formatting shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'b':
          e.preventDefault();
          document.execCommand('bold');
          break;
        case 'i':
          e.preventDefault();
          document.execCommand('italic');
          break;
        case 'u':
          e.preventDefault();
          document.execCommand('underline');
          break;
      }
    }
  };

  const handleFormat = (command: string, value?: string) => {
    if (readOnly) return;
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  return (
    <div className={cn("border border-input rounded-md", className)}>
      {!readOnly && (
        <div className="flex items-center gap-1 p-2 border-b border-border bg-muted/50">
          <button
            type="button"
            onClick={() => handleFormat('bold')}
            className="p-1 rounded hover:bg-background text-sm font-bold"
          >
            B
          </button>
          <button
            type="button"
            onClick={() => handleFormat('italic')}
            className="p-1 rounded hover:bg-background text-sm italic"
          >
            I
          </button>
          <button
            type="button"
            onClick={() => handleFormat('underline')}
            className="p-1 rounded hover:bg-background text-sm underline"
          >
            U
          </button>
          <div className="w-px h-4 bg-border mx-1" />
          <button
            type="button"
            onClick={() => handleFormat('insertUnorderedList')}
            className="p-1 rounded hover:bg-background text-sm"
          >
            •
          </button>
          <button
            type="button"
            onClick={() => handleFormat('insertOrderedList')}
            className="p-1 rounded hover:bg-background text-sm"
          >
            1.
          </button>
        </div>
      )}
      <div
        ref={ref || editorRef}
        contentEditable={!readOnly}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={cn(
          "min-h-[120px] p-3 text-sm focus:outline-none",
          readOnly && "cursor-default",
          isFocused && "ring-2 ring-ring ring-offset-2"
        )}
        style={{ outline: 'none' }}
        suppressContentEditableWarning
      >
        {!value && placeholder && (
          <div className="text-muted-foreground pointer-events-none">
            {placeholder}
          </div>
        )}
      </div>
    </div>
  );
});

RichTextEditor.displayName = "RichTextEditor";