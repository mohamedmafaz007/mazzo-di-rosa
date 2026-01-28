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

    // Initial fetch from static JSON file
    useEffect(() => {
        fetch('/content.json')
            .then(res => res.json())
            .then(data => {
                if (data && !data.error) {
                    setContent(data);
                }
            })
            .catch(err => console.error('Error fetching content:', err));
    }, []);

    // Save to API (Local middleware or Netlify Function)
    const saveToApi = async (newContent: SiteContent) => {
        try {
            // In development, use local middleware. In production, use Netlify Function.
            const endpoint = import.meta.env.DEV ? '/api/content' : '/.netlify/functions/save-content';

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newContent)
            });
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ error: response.statusText }));
                throw new Error(errorData.error || response.statusText);
            }
            console.log('Content persisted successfully');
            alert('Changes saved successfully!');
        } catch (err: any) {
            console.error('Error persisting content:', err);

            let errorMessage = err.message;
            if (errorMessage.includes('Resource not accessible') || errorMessage.includes('403')) {
                errorMessage = "Your GitHub Token is valid but lacks WRITE permission.\n\nPlease generate a new 'Classic' Personal Access Token with the 'repo' scope selected and update it in Netlify.";
            } else if (errorMessage.includes('Bad credentials') || errorMessage.includes('401')) {
                errorMessage = "Your GitHub Token is invalid or expired.\n\nPlease check your GITHUB_TOKEN in Netlify Site Settings.";
            }

            alert(`Failed to save: ${errorMessage}`);
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
