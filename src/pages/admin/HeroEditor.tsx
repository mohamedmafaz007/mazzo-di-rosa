import React, { useState } from 'react';
import { useContent } from '@/context/ContentContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Save, Upload } from 'lucide-react';
import { fileToBase64 } from '@/lib/utils';

const HeroEditor = () => {
    const { content, updateSection } = useContent();
    const { toast } = useToast();
    const [data, setData] = useState(content.hero);

    const handleSave = () => {
        updateSection('hero', data);
        toast({ title: "Hero Section Updated", description: "Changes have been saved successfully." });
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Home Section (Hero)</CardTitle>
                    <CardDescription>Edit the main banner and branding of your website</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Brand Name</Label>
                            <Input
                                id="title"
                                value={data.title}
                                onChange={(e) => setData({ ...data, title: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="tagline">Tagline</Label>
                            <Input
                                id="tagline"
                                value={data.tagline}
                                onChange={(e) => setData({ ...data, tagline: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="subtext">Subtext</Label>
                        <Textarea
                            id="subtext"
                            rows={3}
                            value={data.subtext}
                            onChange={(e) => setData({ ...data, subtext: e.target.value })}
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="buttonText">Button Text</Label>
                            <Input
                                id="buttonText"
                                value={data.buttonText}
                                onChange={(e) => setData({ ...data, buttonText: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="logo">Logo (URL or Upload)</Label>
                            <div className="flex gap-2">
                                <Input
                                    id="logo"
                                    value={data.logoImage}
                                    onChange={(e) => setData({ ...data, logoImage: e.target.value })}
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={() => document.getElementById('logo-upload')?.click()}
                                >
                                    <Upload className="w-4 h-4" />
                                </Button>
                                <input
                                    id="logo-upload"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={async (e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            const base64 = await fileToBase64(file);
                                            const newData = { ...data, logoImage: base64 };
                                            setData(newData);
                                            updateSection('hero', newData);
                                            toast({ title: "Logo Uploaded", description: "Logo has been updated and saved." });
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="bg">Background Image (URL or Upload)</Label>
                        <div className="flex gap-2">
                            <Input
                                id="bg"
                                value={data.backgroundImage}
                                onChange={(e) => setData({ ...data, backgroundImage: e.target.value })}
                            />
                            <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => document.getElementById('bg-upload')?.click()}
                            >
                                <Upload className="w-4 h-4" />
                            </Button>
                            <input
                                id="bg-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        const base64 = await fileToBase64(file);
                                        const newData = { ...data, backgroundImage: base64 };
                                        setData(newData);
                                        updateSection('hero', newData);
                                        toast({ title: "Background Uploaded", description: "Background has been updated and saved." });
                                    }
                                }}
                            />
                        </div>
                    </div>

                    <Button onClick={handleSave} className="w-full btn-luxury">
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                    </Button>
                </CardContent>
            </Card>

            {/* Preview Section */}
            <Card className="bg-muted/30">
                <CardHeader>
                    <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">Preview Image Paths</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-xs mb-2">Logo</p>
                            <img src={data.logoImage} alt="Logo" className="w-20 h-20 rounded-full object-cover border" />
                        </div>
                        <div>
                            <p className="text-xs mb-2">Hero BG</p>
                            <div
                                className="w-full h-20 rounded-lg bg-cover bg-center border"
                                style={{ backgroundImage: `url(${data.backgroundImage})` }}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default HeroEditor;
