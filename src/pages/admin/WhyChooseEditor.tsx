import React, { useState } from 'react';
import { useContent } from '@/context/ContentContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Save, Plus, Trash2 } from 'lucide-react';

const WhyChooseEditor = () => {
    const { content, updateSection } = useContent();
    const { toast } = useToast();
    const [data, setData] = useState(content.whyChoose);

    const handleSave = () => {
        updateSection('whyChoose', data);
        toast({ title: "Why Choose Section Updated", description: "Changes have been saved successfully." });
    };

    const addFeature = () => {
        setData({
            ...data,
            features: [...data.features, { icon: 'Award', title: 'New Quality', description: 'Describe why this matters' }]
        });
    };

    const removeFeature = (index: number) => {
        const newFeatures = [...data.features];
        newFeatures.splice(index, 1);
        setData({ ...data, features: newFeatures });
    };

    const updateFeature = (index: number, field: string, value: string) => {
        const newFeatures = [...data.features];
        (newFeatures[index] as any)[field] = value;
        setData({ ...data, features: newFeatures });
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Why Us Section</CardTitle>
                    <CardDescription>Edit the "Why Choose Us" features and promise</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="subtitle">Subtitle</Label>
                            <Input
                                id="subtitle"
                                value={data.subtitle}
                                onChange={(e) => setData({ ...data, subtitle: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="title">Heading</Label>
                            <Input
                                id="title"
                                value={data.title}
                                onChange={(e) => setData({ ...data, title: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="desc">Section Description</Label>
                        <Textarea
                            id="desc"
                            rows={2}
                            value={data.description}
                            onChange={(e) => setData({ ...data, description: e.target.value })}
                        />
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label>Features (Icon + Title + Description)</Label>
                            <Button type="button" variant="outline" size="sm" onClick={addFeature}>
                                <Plus className="w-4 h-4 mr-2" /> Add Feature
                            </Button>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            {data.features.map((feature, idx) => (
                                <Card key={idx} className="bg-secondary/10 border-none shadow-none">
                                    <CardContent className="p-4 space-y-3 relative">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="absolute top-2 right-2 text-destructive h-8 w-8"
                                            onClick={() => removeFeature(idx)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>

                                        <div className="space-y-2">
                                            <Label className="text-xs">Icon Name</Label>
                                            <Input
                                                value={feature.icon}
                                                onChange={(e) => updateFeature(idx, 'icon', e.target.value)}
                                                className="h-8 text-xs"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-xs">Title</Label>
                                            <Input
                                                value={feature.title}
                                                onChange={(e) => updateFeature(idx, 'title', e.target.value)}
                                                className="h-8 text-xs font-bold"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-xs">Description</Label>
                                            <Textarea
                                                value={feature.description}
                                                onChange={(e) => updateFeature(idx, 'description', e.target.value)}
                                                className="text-xs h-16"
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    <Button onClick={handleSave} className="w-full btn-luxury">
                        <Save className="w-4 h-4 mr-2" />
                        Save Why Us Section
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default WhyChooseEditor;
