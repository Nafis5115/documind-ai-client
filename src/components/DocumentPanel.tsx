import { FileText, X, ChevronDown, Highlighter } from 'lucide-react';
import type { Document } from '@/lib/store';

interface DocumentPanelProps {
  document?: Document;
  open: boolean;
  onClose: () => void;
}

const sampleContent = [
  { page: 1, sections: [
    { text: 'Executive Summary', highlighted: false },
    { text: 'Q4 2025 represented a landmark quarter for the company, with revenue growth of 23% year-over-year reaching $45.2M in total revenue.', highlighted: true },
    { text: 'This growth was driven primarily by our expansion into the mid-market segment and strong retention rates among existing enterprise customers.', highlighted: false },
    { text: 'Key metrics showed improvement across all business units, with particular strength in our AI-powered document analysis product line.', highlighted: false },
  ]},
  { page: 2, sections: [
    { text: 'Revenue Breakdown', highlighted: false },
    { text: 'Enterprise: $28.4M (+18% YoY)', highlighted: false },
    { text: 'Mid-Market: $12.1M (+42% YoY)', highlighted: true },
    { text: 'SMB: $4.7M (+11% YoY)', highlighted: false },
    { text: 'Gross margin improved to 72%, up from 68% in Q3, reflecting operational efficiencies and favorable product mix shifts.', highlighted: true },
  ]},
  { page: 3, sections: [
    { text: 'Customer Metrics', highlighted: false },
    { text: '1,200 new enterprise customers onboarded during the quarter, a 35% increase from Q3.', highlighted: true },
    { text: 'Net Revenue Retention: 124%, indicating strong expansion within existing accounts.', highlighted: false },
    { text: 'Customer satisfaction (NPS) score of 72, leading the industry by 15+ points.', highlighted: false },
  ]},
];

const DocumentPanel = ({ document, open, onClose }: DocumentPanelProps) => {
  if (!open) return null;

  return (
    <aside className="hidden lg:flex w-80 xl:w-96 flex-shrink-0 flex-col glass-strong rounded-2xl overflow-hidden animate-slide-in-right">
      {/* Header */}
      <div className="p-4 border-b border-border/30 flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0">
            <FileText className="w-4 h-4 text-primary" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{document?.name || 'No document selected'}</p>
            <p className="text-xs text-muted-foreground">{document?.pages ? `${document.pages} pages` : document?.size}</p>
          </div>
        </div>
        <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-muted/50 transition-colors text-muted-foreground">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {document ? (
          sampleContent.map(page => (
            <div key={page.page}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Page {page.page}</span>
                <div className="flex-1 h-px bg-border/30" />
              </div>
              <div className="space-y-2">
                {page.sections.map((section, i) => (
                  <div
                    key={i}
                    className={`text-sm leading-relaxed p-3 rounded-xl transition-all duration-200 cursor-pointer
                      ${section.highlighted
                        ? 'bg-primary/10 border border-primary/20 text-foreground hover:bg-primary/15'
                        : 'text-muted-foreground hover:bg-muted/30 hover:text-foreground'
                      }`}
                  >
                    {section.highlighted && (
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <Highlighter className="w-3 h-3 text-primary" />
                        <span className="text-[10px] font-medium text-primary uppercase tracking-wider">Referenced</span>
                      </div>
                    )}
                    {section.text}
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center py-20">
            <div className="w-14 h-14 rounded-2xl bg-muted/40 flex items-center justify-center mb-4">
              <FileText className="w-7 h-7 text-muted-foreground/40" />
            </div>
            <p className="text-sm text-muted-foreground">Select a chat with an attached document to view it here.</p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default DocumentPanel;
