import { useState, useRef, useEffect } from "react";
import { Eye, Edit3, Image, Code, Link, Bold, Italic, List, Heading, ChevronDown } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  required?: boolean;
}

type TabType = "write" | "preview";

const LANGUAGES = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "jsx", label: "JSX" },
  { value: "tsx", label: "TSX" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "csharp", label: "C#" },
  { value: "cpp", label: "C++" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "php", label: "PHP" },
  { value: "ruby", label: "Ruby" },
  { value: "swift", label: "Swift" },
  { value: "kotlin", label: "Kotlin" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "scss", label: "SCSS" },
  { value: "sql", label: "SQL" },
  { value: "bash", label: "Bash" },
  { value: "json", label: "JSON" },
  { value: "yaml", label: "YAML" },
  { value: "markdown", label: "Markdown" },
  { value: "plaintext", label: "Texte brut" },
];

const toolbarButtons = [
  { icon: Bold, label: "Gras", prefix: "**", suffix: "**", placeholder: "texte en gras" },
  { icon: Italic, label: "Italique", prefix: "_", suffix: "_", placeholder: "texte en italique" },
  { icon: Heading, label: "Titre", prefix: "## ", suffix: "", placeholder: "Titre" },
  { icon: List, label: "Liste", prefix: "- ", suffix: "", placeholder: "élément" },
  { icon: Link, label: "Lien", prefix: "[", suffix: "](url)", placeholder: "texte du lien" },
  { icon: Image, label: "Image", prefix: "![", suffix: "](url)", placeholder: "alt text" },
];

export function MarkdownEditor({
  value,
  onChange,
  placeholder = "Écrivez votre contenu en Markdown...",
  label,
  required,
}: MarkdownEditorProps) {
  const [activeTab, setActiveTab] = useState<TabType>("write");
  const [showCodeDropdown, setShowCodeDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowCodeDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const insertMarkdown = (prefix: string, suffix: string, placeholder: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end) || placeholder;
    const newText = value.substring(0, start) + prefix + selectedText + suffix + value.substring(end);

    onChange(newText);

    // Restore focus and selection
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + prefix.length + selectedText.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const insertCodeBlock = (language: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end) || "// votre code ici";
    const prefix = `\`\`\`${language}\n`;
    const suffix = "\n```";
    const newText = value.substring(0, start) + prefix + selectedText + suffix + value.substring(end);

    onChange(newText);
    setShowCodeDropdown(false);

    // Restore focus and position cursor inside the code block
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + prefix.length + selectedText.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-800">
      {/* Header with tabs */}
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        <div className="flex">
          <button
            type="button"
            onClick={() => setActiveTab("write")}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors ${
              activeTab === "write"
                ? "text-gray-900 dark:text-white border-b-2 border-gray-900 dark:border-white -mb-px"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            <Edit3 className="w-4 h-4" />
            Écrire
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("preview")}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors ${
              activeTab === "preview"
                ? "text-gray-900 dark:text-white border-b-2 border-gray-900 dark:border-white -mb-px"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            <Eye className="w-4 h-4" />
            Aperçu
          </button>
        </div>

        {label && (
          <span className="px-4 text-sm text-gray-500 dark:text-gray-400">
            {label}
            {required && <span className="text-red-500 ml-0.5">*</span>}
          </span>
        )}
      </div>

      {/* Toolbar - only in write mode */}
      {activeTab === "write" && (
        <div className="flex items-center gap-1 px-3 py-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30">
          {toolbarButtons.map((btn) => (
            <button
              key={btn.label}
              type="button"
              onClick={() => insertMarkdown(btn.prefix, btn.suffix, btn.placeholder)}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title={btn.label}
            >
              <btn.icon className="w-4 h-4" />
            </button>
          ))}

          {/* Code dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setShowCodeDropdown(!showCodeDropdown)}
              className={`flex items-center gap-1 p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors ${
                showCodeDropdown ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white" : ""
              }`}
              title="Bloc de code"
            >
              <Code className="w-4 h-4" />
              <ChevronDown className="w-3 h-3" />
            </button>

            {showCodeDropdown && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                <div className="py-1">
                  <div className="px-3 py-1.5 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                    Langage
                  </div>
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.value}
                      type="button"
                      onClick={() => insertCodeBlock(lang.value)}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Content area */}
      <div className="min-h-[300px]">
        {activeTab === "write" ? (
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            required={required}
            className="w-full h-[300px] px-4 py-3 bg-transparent text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none resize-none font-mono"
          />
        ) : (
          <div className="p-4 prose prose-sm dark:prose-invert max-w-none min-h-[300px]">
            {value ? (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    const isInline = !match && !String(children).includes("\n");
                    return isInline ? (
                      <code className="bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded text-sm" {...props}>
                        {children}
                      </code>
                    ) : (
                      <SyntaxHighlighter
                        style={oneDark}
                        language={match?.[1] || "plaintext"}
                        PreTag="div"
                        className="rounded-lg !mt-0"
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    );
                  },
                  img({ src, alt }) {
                    return (
                      <img
                        src={src}
                        alt={alt}
                        className="rounded-lg max-w-full h-auto"
                      />
                    );
                  },
                }}
              >
                {value}
              </ReactMarkdown>
            ) : (
              <p className="text-gray-400 dark:text-gray-500 italic">
                Aucun contenu à afficher. Commencez à écrire dans l'onglet "Écrire".
              </p>
            )}
          </div>
        )}
      </div>

      {/* Footer with help */}
      <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30">
        <p className="text-xs text-gray-400 dark:text-gray-500">
          Markdown supporté. Utilisez le bouton Code pour insérer des blocs avec coloration syntaxique.
        </p>
      </div>
    </div>
  );
}
