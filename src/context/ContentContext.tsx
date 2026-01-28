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

                // Enhanced debug message
                if (errorData.debug) {
                    const current = errorData.debug.currentScopes || '(none)';
                    const required = errorData.debug.requiredScopes || 'repo';
                    const magicLink = "https://github.com/settings/tokens/new?scopes=repo&description=Netlify%20Admin%20Panel";
                    throw new Error(`PERMISSIONS ERROR.\n\nYour token has NO permissions (Scope: ${current}).\n\n1. Copy this link:\n${magicLink}\n\n2. Open it in a new tab.\n3. Scroll down and click "Generate token".\n4. Copy the new token to Netlify.`);
                }

                throw new Error(errorData.error || response.statusText);
            }
            console.log('Content persisted successfully');
            alert('Changes saved successfully!');
        } catch (err: any) {
            console.error('Error persisting content:', err);

            let errorMessage = err.message;
            // Fallback for generic errors
            if (!errorMessage.includes('Token Permission Error') && (errorMessage.includes('403') || errorMessage.includes('Resource not accessible'))) {
                errorMessage = "Your GitHub Token lacks WRITE permission. Please create a new Classic Token with 'repo' scope.";
            }

            alert(`Failed to save: \n${errorMessage}`);
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
