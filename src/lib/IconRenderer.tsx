import * as LucideIcons from 'lucide-react';
import { LucideProps } from 'lucide-react';

export const IconRenderer = ({ name, ...props }: { name: string } & LucideProps) => {
    const Icon = (LucideIcons as any)[name];
    if (!Icon) {
        return <LucideIcons.HelpCircle {...props} />;
    }
    return <Icon {...props} />;
};
