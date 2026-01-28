import React, { useState } from 'react';
import { useContent } from '@/context/ContentContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Save, Plus, Trash2, Upload } from 'lucide-react';
import { fileToBase64 } from '@/lib/utils';

const AboutEditor = () => {
    const { content, updateSection } = useContent();
    const { toast } = useToast();
    const [data, setData] = useState(content.about);

    const handleSave = () => {
        updateSection('about', data);
        toast({ title: "About Section Updated", description: "Changes have been saved successfully." });
    };

    const addFeature = () => {
        setData({
            ...data,
            features: [...data.features, { icon: 'Heart', text: 'New Feature' }]
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
                    <CardTitle>About Us Section</CardTitle>
                    <CardDescription>Edit your story and core values</CardDescription>
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
                            <Label htmlFor="title">Main Heading</Label>
                            <Input
                                id="title"
                                value={data.title}
                                onChange={(e) => setData({ ...data, title: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="desc1">Description Paragraph 1</Label>
                        <Textarea
                            id="desc1"
                            rows={3}
                            value={data.description1}
                            onChange={(e) => setData({ ...data, description1: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="desc2">Description Paragraph 2</Label>
                        <Textarea
                            id="desc2"
                            rows={3}
                            value={data.description2}
                            onChange={(e) => setData({ ...data, description2: e.target.value })}
                        />
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="badgeNumber">Badge Number/Text</Label>
                            <Input
                                id="badgeNumber"
                                value={data.badgeNumber}
                                onChange={(e) => setData({ ...data, badgeNumber: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="badgeText">Badge Subtext</Label>
                            <Input
                                id="badgeText"
                                value={data.badgeText}
                                onChange={(e) => setData({ ...data, badgeText: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="image">Main Image (URL or Upload)</Label>
                            <div className="flex gap-2">
                                <Input
                                    id="image"
                                    value={data.mainImage}
                                    onChange={(e) => setData({ ...data, mainImage: e.target.value })}
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={() => document.getElementById('about-upload')?.click()}
                                >
                                    <Upload className="w-4 h-4" />
                                </Button>
                                <input
                                    id="about-upload"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={async (e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            const base64 = await fileToBase64(file);
                                            const newData = { ...data, mainImage: base64 };
                                            setData(newData);
                                            updateSection('about', newData);
                                            toast({ title: "Image Uploaded", description: "Main image has been updated and saved." });
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label>Core Features/Icons</Label>
                            <Button type="button" variant="outline" size="sm" onClick={addFeature}>
                                <Plus className="w-4 h-4 mr-2" /> Add Item
                            </Button>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            {data.features.map((feature, idx) => (
                                <div key={idx} className="flex gap-2 p-3 rounded-lg border bg-secondary/10 items-start">
                                    <div className="flex-1 space-y-2">
                                        <Input
                                            placeholder="Icon Name (e.g. Heart)"
                                            size={1}
                                            className="h-8 text-xs"
                                            value={feature.icon}
                                            onChange={(e) => updateFeature(idx, 'icon', e.target.value)}
                                        />
                                        <Input
                                            placeholder="Feature Text"
                                            className="h-8 text-xs"
                                            value={feature.text}
                                            onChange={(e) => updateFeature(idx, 'text', e.target.value)}
                                        />
                                    </div>
                                    <Button variant="ghost" size="icon" className="text-destructive h-8 w-8" onClick={() => removeFeature(idx)}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Button onClick={handleSave} className="w-full btn-luxury">
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default AboutEditor;
