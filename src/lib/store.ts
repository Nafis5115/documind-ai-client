import { useState, useCallback } from 'react';

export interface ChatMessage {
  id: string;
  role: 'user' | 'ai';
  content: string;
  timestamp: Date;
  sources?: string[];
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  documentId?: string;
}

export interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'text' | 'image';
  size: string;
  uploadedAt: Date;
  pages?: number;
}

// Sample data
export const sampleDocuments: Document[] = [
  { id: '1', name: 'Q4 Financial Report.pdf', type: 'pdf', size: '2.4 MB', uploadedAt: new Date('2025-04-10'), pages: 24 },
  { id: '2', name: 'Product Roadmap 2025.pdf', type: 'pdf', size: '1.8 MB', uploadedAt: new Date('2025-04-08'), pages: 12 },
  { id: '3', name: 'Meeting Notes.txt', type: 'text', size: '45 KB', uploadedAt: new Date('2025-04-15') },
  { id: '4', name: 'Architecture Diagram.png', type: 'image', size: '3.1 MB', uploadedAt: new Date('2025-04-12') },
  { id: '5', name: 'Legal Agreement Draft.pdf', type: 'pdf', size: '890 KB', uploadedAt: new Date('2025-04-07'), pages: 8 },
  { id: '6', name: 'User Research Summary.pdf', type: 'pdf', size: '1.2 MB', uploadedAt: new Date('2025-04-05'), pages: 16 },
];

export const sampleChats: ChatSession[] = [
  {
    id: '1',
    title: 'Q4 Financial Analysis',
    documentId: '1',
    createdAt: new Date('2025-04-15T10:30:00'),
    messages: [
      { id: 'm1', role: 'user', content: 'What are the key financial highlights from Q4?', timestamp: new Date('2025-04-15T10:30:00') },
      { id: 'm2', role: 'ai', content: 'Based on the Q4 Financial Report, here are the key highlights:\n\n**Revenue Growth:** Total revenue increased by 23% YoY, reaching $45.2M.\n\n**Profit Margins:** Gross margin improved to 72%, up from 68% in Q3.\n\n**Customer Acquisition:** 1,200 new enterprise customers onboarded.\n\n**Cash Position:** $128M in cash reserves, providing strong runway.', timestamp: new Date('2025-04-15T10:30:30'), sources: ['Page 3, Section 2.1', 'Page 7, Table 4'] },
      { id: 'm3', role: 'user', content: 'How does this compare to our competitors?', timestamp: new Date('2025-04-15T10:32:00') },
      { id: 'm4', role: 'ai', content: 'According to the competitive analysis section:\n\n• **Market Share:** DocuMind holds 18% market share, up from 15% last quarter.\n• **Growth Rate:** Our 23% growth outpaces the industry average of 14%.\n• **NPS Score:** At 72, we lead competitors by 15+ points.\n\nThe report notes particular strength in the mid-market segment.', timestamp: new Date('2025-04-15T10:32:30'), sources: ['Page 12, Section 5.3'] },
    ],
  },
  {
    id: '2',
    title: 'Product Roadmap Review',
    documentId: '2',
    createdAt: new Date('2025-04-14T14:00:00'),
    messages: [
      { id: 'm5', role: 'user', content: 'Summarize the product roadmap for 2025', timestamp: new Date('2025-04-14T14:00:00') },
      { id: 'm6', role: 'ai', content: 'Here\'s a summary of the 2025 Product Roadmap:\n\n**Q1-Q2:** AI-powered document analysis v2, real-time collaboration features\n\n**Q3:** Enterprise SSO integration, advanced analytics dashboard\n\n**Q4:** Multi-language support, mobile app launch\n\nKey theme: Making document intelligence accessible to every team member.', timestamp: new Date('2025-04-14T14:00:30'), sources: ['Page 1-3, Executive Summary'] },
    ],
  },
  {
    id: '3',
    title: 'Legal Draft Questions',
    documentId: '5',
    createdAt: new Date('2025-04-13T09:00:00'),
    messages: [
      { id: 'm7', role: 'user', content: 'Are there any concerning clauses in this agreement?', timestamp: new Date('2025-04-13T09:00:00') },
      { id: 'm8', role: 'ai', content: 'I\'ve identified several clauses that may need attention:\n\n⚠️ **Section 4.2 - Liability Cap:** The liability is capped at 1x annual fees, which is below industry standard of 2x.\n\n⚠️ **Section 7.1 - Termination:** 90-day notice period is longer than typical 30-day terms.\n\n✅ **Section 3 - IP Rights:** Standard and favorable terms.\n\nI\'d recommend legal review of Sections 4.2 and 7.1.', timestamp: new Date('2025-04-13T09:00:30'), sources: ['Section 4.2', 'Section 7.1', 'Section 3'] },
    ],
  },
  {
    id: '4',
    title: 'Meeting Action Items',
    documentId: '3',
    createdAt: new Date('2025-04-11T16:00:00'),
    messages: [
      { id: 'm9', role: 'user', content: 'Extract all action items from these meeting notes', timestamp: new Date('2025-04-11T16:00:00') },
      { id: 'm10', role: 'ai', content: 'Here are the action items extracted:\n\n1. **@Sarah** - Finalize design mockups by April 18\n2. **@Mike** - Set up staging environment\n3. **@Team** - Review API documentation before next sprint\n4. **@Lisa** - Schedule customer interviews for next week\n5. **@Dev Team** - Fix critical bug in upload module', timestamp: new Date('2025-04-11T16:00:30') },
    ],
  },
];

export const useAppState = () => {
  const [activePage, setActivePage] = useState<string>('chat');
  const [activeChat, setActiveChat] = useState<string>('1');
  const [chats, setChats] = useState<ChatSession[]>(sampleChats);
  const [documents, setDocuments] = useState<Document[]>(sampleDocuments);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getChatTitleFromDocument = (document?: Document) => {
    if (!document) return 'New Chat';

    return document.name.replace(/\.[^.]+$/, '') || document.name;
  };

  const addMessage = useCallback((chatId: string, message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    setChats(prev => prev.map(chat => {
      if (chat.id !== chatId) return chat;
      return {
        ...chat,
        messages: [...chat.messages, { ...message, id: `m${Date.now()}`, timestamp: new Date() }],
      };
    }));
  }, []);

  const createChat = useCallback((document?: Document) => {
    const newChat: ChatSession = {
      id: `chat-${Date.now()}`,
      title: getChatTitleFromDocument(document),
      messages: [],
      createdAt: new Date(),
      documentId: document?.id,
    };
    setChats(prev => [newChat, ...prev]);
    setActiveChat(newChat.id);
    setActivePage('chat');
    return newChat.id;
  }, []);

  const deleteChat = useCallback((chatId: string) => {
    setChats(prev => prev.filter(c => c.id !== chatId));
    if (activeChat === chatId) {
      setActiveChat(chats[0]?.id || '');
    }
  }, [activeChat, chats]);

  const renameChat = useCallback((chatId: string, title: string) => {
    setChats(prev => prev.map(c => c.id === chatId ? { ...c, title } : c));
  }, []);

  const addDocument = useCallback((file: File) => {
    const ext = file.name.split('.').pop()?.toLowerCase() || '';
    let type: Document['type'] = 'text';
    if (ext === 'pdf') type = 'pdf';
    else if (['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'].includes(ext)) type = 'image';

    const sizeKB = file.size / 1024;
    const size = sizeKB >= 1024 ? `${(sizeKB / 1024).toFixed(1)} MB` : `${Math.round(sizeKB)} KB`;

    const doc: Document = {
      id: `doc-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      name: file.name,
      type,
      size,
      uploadedAt: new Date(),
    };
    setDocuments(prev => [doc, ...prev]);
    return doc;
  }, []);

  const deleteDocument = useCallback((docId: string) => {
    setDocuments(prev => prev.filter(d => d.id !== docId));
  }, []);

  return {
    activePage, setActivePage,
    activeChat, setActiveChat,
    chats, documents,
    sidebarOpen, setSidebarOpen,
    addMessage, createChat, deleteChat, renameChat,
    addDocument, deleteDocument,
  };
}
