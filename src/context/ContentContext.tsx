import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteContent } from '../types/content';
import { defaultContent } from './defaultData';

interface ContentContextType {
    content: SiteContent;
    updateContent: (newContent: SiteContent) => void;
    updateSection: <K extends keyof SiteContent>(section: K, data: SiteContent[K]) => void;
    resetToDefault: () => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [content, setContent] = useState<SiteContent>(defaultContent);

    // Initial fetch from Local API
    useEffect(() => {
        fetch('/api/content')
            .then(res => res.json())
            .then(data => {
                if (!data.error) {
                    setContent(data);
                }
            })
            .catch(err => console.error('Error fetching content from API:', err));
    }, []);

    // Save to Local API whenever content changes
    const saveToApi = async (newContent: SiteContent) => {
        try {
            const response = await fetch('/api/content', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newContent)
            });
            if (!response.ok) throw new Error('Failed to save to API');
            console.log('Content persisted to codebase successfully');
        } catch (err) {
            console.error('Error persisting content:', err);
        }
    };

    const updateContent = (newContent: SiteContent) => {
        setContent(newContent);
        saveToApi(newContent);
    };

    const updateSection = <K extends keyof SiteContent>(section: K, data: SiteContent[K]) => {
        setContent(prev => {
            const updated = {
                ...prev,
                [section]: data
            };
            saveToApi(updated);
            return updated;
        });
    };

    const resetToDefault = () => {
        if (window.confirm('Are you sure you want to reset all content to default values? This will update the code files.')) {
            setContent(defaultContent);
            saveToApi(defaultContent);
        }
    };

    return (
        <ContentContext.Provider value={{ content, updateContent, updateSection, resetToDefault }}>
            {children}
        </ContentContext.Provider>
    );
};

export const useContent = () => {
    const context = useContext(ContentContext);
    if (context === undefined) {
        throw new Error('useContent must be used within a ContentProvider');
    }
    return context;
};
