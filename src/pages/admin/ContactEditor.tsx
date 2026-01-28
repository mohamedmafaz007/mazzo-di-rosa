import React, { useState } from 'react';
import { useContent } from '@/context/ContentContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Save, Instagram, Facebook, Twitter } from 'lucide-react';

const ContactEditor = () => {
    const { content, updateSection } = useContent();
    const { toast } = useToast();
    const [data, setData] = useState(content.contact);

    const handleSave = () => {
        updateSection('contact', data);
        toast({ title: "Contact Section Updated", description: "Changes have been saved successfully." });
    };

    const updateInfo = (field: string, value: string) => {
        setData({
            ...data,
            info: { ...data.info, [field]: value }
        });
    };

    const updateSocial = (field: string, value: string) => {
        setData({
            ...data,
            social: { ...data.social, [field]: value }
        });
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Contact Section Content</CardTitle>
                    <CardDescription>Edit text and contact details</CardDescription>
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
                        <Label htmlFor="desc">Description</Label>
                        <Textarea
                            id="desc"
                            rows={2}
                            value={data.description}
                            onChange={(e) => setData({ ...data, description: e.target.value })}
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 pt-4 border-t">
                        <div className="space-y-2">
                            <Label>Phone Display</Label>
                            <Input
                                value={data.info.phone}
                                onChange={(e) => updateInfo('phone', e.target.value)}
                                placeholder="+91 XXXX XXXX"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>WhatsApp Number (Numeric only with country code)</Label>
                            <Input
                                value={data.info.whatsapp}
                                onChange={(e) => updateInfo('whatsapp', e.target.value)}
                                placeholder="918124817806"
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label>Email Address</Label>
                            <Input
                                value={data.info.email}
                                onChange={(e) => updateInfo('email', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Office Address</Label>
                            <Input
                                value={data.info.address}
                                onChange={(e) => updateInfo('address', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t">
                        <Label>Social Media Links</Label>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="flex items-center gap-2">
                                <Instagram className="w-4 h-4 text-pink-600" />
                                <Input
                                    value={data.social.instagram}
                                    onChange={(e) => updateSocial('instagram', e.target.value)}
                                    placeholder="Instagram Link"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <Facebook className="w-4 h-4 text-blue-600" />
                                <Input
                                    value={data.social.facebook}
                                    onChange={(e) => updateSocial('facebook', e.target.value)}
                                    placeholder="Facebook Link"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <Twitter className="w-4 h-4 text-sky-400" />
                                <Input
                                    value={data.social.twitter}
                                    onChange={(e) => updateSocial('twitter', e.target.value)}
                                    placeholder="Twitter Link"
                                />
                            </div>
                        </div>
                    </div>

                    <Button onClick={handleSave} className="w-full btn-luxury">
                        <Save className="w-4 h-4 mr-2" />
                        Save Contact Details
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

export default ContactEditor;
