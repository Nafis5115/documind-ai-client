import { useState, useRef } from "react";
import {
  FileText,
  Image,
  Type,
  Upload,
  Grid3X3,
  List,
  Search,
  MoreVertical,
  Trash2,
  MessageSquare,
  Download,
  X,
  CheckCircle,
} from "lucide-react";
import type { Document } from "@/lib/store";

interface DocumentsPageProps {
  documents: Document[];
  setActivePage: (page: string) => void;
  onUpload: (file: File) => void;
  onDelete: (id: string) => void;
}

const typeIcon = {
  pdf: FileText,
  text: Type,
  image: Image,
};

const typeColor = {
  pdf: "bg-[hsla(0,70%,60%,0.15)] text-[hsl(0,70%,60%)]",
  text: "bg-[hsla(190,70%,50%,0.15)] text-[hsl(190,70%,50%)]",
  image: "bg-[hsla(270,70%,60%,0.15)] text-[hsl(270,70%,60%)]",
};

const DocumentsPage = ({
  documents,
  setActivePage,
  onUpload,
  onDelete,
}: DocumentsPageProps) => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [search, setSearch] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filtered = documents.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    Array.from(files).forEach((file) => {
      onUpload(file);
      setUploadSuccess(file.name);
      setTimeout(() => setUploadSuccess(null), 3000);
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 lg:p-8 space-y-6">
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".pdf,.txt,.png,.jpg,.jpeg,.gif,.webp"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      {/* Success toast */}
      {uploadSuccess && (
        <div className="fixed top-4 right-4 z-50 glass-strong rounded-xl p-4 flex items-center gap-3 animate-fade-in glow-blue">
          <CheckCircle className="w-5 h-5 text-primary" />
          <div>
            <p className="text-sm font-medium text-foreground">
              Uploaded successfully
            </p>
            <p className="text-xs text-muted-foreground">{uploadSuccess}</p>
          </div>
          <button
            onClick={() => setUploadSuccess(null)}
            className="p-1 rounded-lg hover:bg-muted/50"
          >
            <X className="w-3.5 h-3.5 text-muted-foreground" />
          </button>
        </div>
      )}

      {/* Header */}

      <div>
        <h1 className="text-2xl font-bold text-foreground">Documents</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {documents.length} documents uploaded
        </p>
      </div>

      {/* Search & view toggle */}
      <div
        className="flex items-center gap-3 animate-fade-in"
        style={{ animationDelay: "0.1s" }}
      >
        <div className="relative flex-1 max-w-sm group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search documents..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted/40 border border-transparent text-sm text-foreground placeholder:text-muted-foreground/60 outline-none focus:border-primary/40 focus:bg-muted/60 transition-all"
          />
        </div>
        <div className="flex items-center bg-muted/40 rounded-xl p-1">
          <button
            onClick={() => setView("grid")}
            className={`p-2 rounded-lg transition-all ${view === "grid" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setView("list")}
            className={`p-2 rounded-lg transition-all ${view === "list" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Drag & drop zone */}
      <div
        className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 cursor-pointer animate-fade-in
          ${dragOver ? "border-primary bg-primary/5 glow-blue" : "border-border/40 hover:border-primary/40"}`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        style={{ animationDelay: "0.15s" }}
      >
        <Upload
          className={`w-8 h-8 mx-auto mb-3 transition-all ${dragOver ? "text-primary scale-110" : "text-muted-foreground"}`}
        />
        <p className="text-sm font-medium text-foreground">
          Drop files here or click to browse
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Supports PDF, TXT, PNG, JPG up to 25MB
        </p>
      </div>

      {/* Documents grid/list */}
      {view === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((doc, i) => {
            const Icon = typeIcon[doc.type];
            return (
              <div
                key={doc.id}
                className="glass-subtle rounded-2xl p-5 hover:scale-[1.02] transition-all duration-300 group cursor-pointer animate-fade-in"
                style={{ animationDelay: `${0.2 + i * 0.05}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center ${typeColor[doc.type]} transition-transform group-hover:scale-110`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <button className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-muted/50 transition-all text-muted-foreground">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
                <h3 className="text-sm font-medium text-foreground truncate">
                  {doc.name}
                </h3>
                <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                  <span>{doc.size}</span>
                  <span>•</span>
                  <span>
                    {doc.uploadedAt.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  {doc.pages && (
                    <>
                      <span>•</span>
                      <span>{doc.pages} pages</span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-all">
                  <button
                    onClick={() => setActivePage("chat")}
                    className="flex-1 text-xs py-2 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-all flex items-center justify-center gap-1.5"
                  >
                    <MessageSquare className="w-3 h-3" /> Chat
                  </button>
                  <button className="p-2 rounded-xl hover:bg-muted/50 transition-all text-muted-foreground">
                    <Download className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onDelete(doc.id)}
                    className="p-2 rounded-xl hover:bg-destructive/10 hover:text-destructive transition-all text-muted-foreground"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((doc, i) => {
            const Icon = typeIcon[doc.type];
            return (
              <div
                key={doc.id}
                className="glass-subtle rounded-xl p-4 flex items-center gap-4 hover:bg-muted/40 transition-all cursor-pointer group animate-fade-in"
                style={{ animationDelay: `${0.2 + i * 0.05}s` }}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${typeColor[doc.type]}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {doc.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {doc.size} • {doc.type.toUpperCase()}
                    {doc.pages ? ` • ${doc.pages} pages` : ""}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground hidden sm:block">
                  {doc.uploadedAt.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                  <button
                    onClick={() => setActivePage("chat")}
                    className="p-2 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-muted/50 text-muted-foreground transition-all">
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(doc.id)}
                    className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DocumentsPage;
