import React, { useState } from 'react';
import { useContent } from '@/context/ContentContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Save, Plus, Trash2, Edit2, X, Upload } from 'lucide-react';
import { Bouquet } from '@/types/content';
import { fileToBase64 } from '@/lib/utils';

const CollectionEditor = () => {
    const { content, updateSection } = useContent();
    const { toast } = useToast();
    const [data, setData] = useState(content.collection);
    const [editingBouquet, setEditingBouquet] = useState<Bouquet | null>(null);

    const handleSave = () => {
        updateSection('collection', data);
        toast({ title: "Collection Updated", description: "Changes have been saved successfully." });
    };

    const deleteBouquet = (id: string) => {
        setData({
            ...data,
            bouquets: data.bouquets.filter(b => b.id !== id)
        });
    };

    const startAddBouquet = () => {
        setEditingBouquet({
            id: Math.random().toString(36).substr(2, 9),
            name: '',
            description: '',
            price: '₹',
            image: '',
            category: data.categories[1] || 'General'
        });
    };

    const saveBouquet = () => {
        if (!editingBouquet) return;

        let newData;
        const exists = data.bouquets.find(b => b.id === editingBouquet.id);
        if (exists) {
            newData = {
                ...data,
                bouquets: data.bouquets.map(b => b.id === editingBouquet.id ? editingBouquet : b)
            };
        } else {
            newData = {
                ...data,
                bouquets: [...data.bouquets, editingBouquet]
            };
        }

        setData(newData);
        updateSection('collection', newData); // Auto-save to context
        setEditingBouquet(null);
        toast({ title: "Bouquet Saved", description: "The collection has been automatically updated." });
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Collection Section Settings</CardTitle>
                    <CardDescription>Edit section header and category list</CardDescription>
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

                    <div className="space-y-2">
                        <Label htmlFor="footerNote">Footer Note (Bottom of Grid)</Label>
                        <Input
                            id="footerNote"
                            value={data.footerNote}
                            onChange={(e) => setData({ ...data, footerNote: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Category Filter Tabs (Comma separated)</Label>
                        <Input
                            value={data.categories.join(', ')}
                            onChange={(e) => setData({ ...data, categories: e.target.value.split(',').map(s => s.trim()) })}
                        />
                        <p className="text-xs text-muted-foreground italic">Important: Ensure "All" is the first item.</p>
                    </div>

                    <Button onClick={handleSave} className="w-full btn-luxury">
                        <Save className="w-4 h-4 mr-2" />
                        Save All Collection Header Settings
                    </Button>
                </CardContent>
            </Card>

            <div className="flex items-center justify-between mt-8">
                <h3 className="text-xl font-serif font-semibold">Bouquets Management</h3>
                <Button onClick={startAddBouquet} className="btn-gold">
                    <Plus className="w-4 h-4 mr-2" /> Add New Bouquet
                </Button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.bouquets.map((bouquet) => (
                    <Card key={bouquet.id} className="overflow-hidden group">
                        <div className="h-48 overflow-hidden relative">
                            <img src={bouquet.image} alt={bouquet.name} className="w-full h-full object-cover" />
                            <div className="absolute top-2 right-2 flex gap-1 transform translate-x-12 group-hover:translate-x-0 transition-transform duration-300">
                                <Button size="icon" variant="secondary" className="h-8 w-8" onClick={() => setEditingBouquet(bouquet)}>
                                    <Edit2 className="w-4 h-4" />
                                </Button>
                                <Button size="icon" variant="destructive" className="h-8 w-8" onClick={() => deleteBouquet(bouquet.id)}>
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                            <div className="absolute bottom-2 left-2">
                                <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-[10px] uppercase font-bold rounded">
                                    {bouquet.category}
                                </span>
                            </div>
                        </div>
                        <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-1">
                                <h4 className="font-semibold text-sm line-clamp-1">{bouquet.name}</h4>
                                <p className="text-primary font-bold text-sm">{bouquet.price}</p>
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-2">{bouquet.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {editingBouquet && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
                    <Card className="w-full max-w-lg">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>{editingBouquet.name ? 'Edit' : 'Add'} Bouquet</CardTitle>
                            <Button variant="ghost" size="icon" onClick={() => setEditingBouquet(null)}>
                                <X className="w-4 h-4" />
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Name</Label>
                                    <Input
                                        value={editingBouquet.name}
                                        onChange={(e) => setEditingBouquet({ ...editingBouquet, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Price</Label>
                                    <Input
                                        value={editingBouquet.price}
                                        onChange={(e) => setEditingBouquet({ ...editingBouquet, price: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Category</Label>
                                <select
                                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                                    value={editingBouquet.category}
                                    onChange={(e) => setEditingBouquet({ ...editingBouquet, category: e.target.value })}
                                >
                                    {data.categories.filter(c => c !== 'All').map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <Label>Description</Label>
                                <Textarea
                                    rows={2}
                                    value={editingBouquet.description}
                                    onChange={(e) => setEditingBouquet({ ...editingBouquet, description: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Image (URL or Upload)</Label>
                                <div className="space-y-2">
                                    <Input
                                        value={editingBouquet.image}
                                        onChange={(e) => setEditingBouquet({ ...editingBouquet, image: e.target.value })}
                                        placeholder="Paste image URL here"
                                    />
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 h-[1px] bg-border"></div>
                                        <span className="text-[10px] text-muted-foreground uppercase font-bold">Or</span>
                                        <div className="flex-1 h-[1px] bg-border"></div>
                                    </div>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="w-full flex items-center justify-center gap-2 h-10 border-dashed"
                                        onClick={() => document.getElementById('image-upload')?.click()}
                                    >
                                        <Upload className="w-4 h-4" />
                                        Upload from Device
                                    </Button>
                                    <input
                                        id="image-upload"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={async (e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                try {
                                                    const base64 = await fileToBase64(file);
                                                    setEditingBouquet({ ...editingBouquet, image: base64 });
                                                    toast({ title: "Image Uploaded", description: "Image has been converted for local storage." });
                                                } catch (err) {
                                                    toast({ title: "Upload Failed", description: "Could not process image.", variant: "destructive" });
                                                }
                                            }
                                        }}
                                    />
                                </div>
                                {editingBouquet.image && (
                                    <div className="mt-4 rounded-lg overflow-hidden border bg-muted/50 h-32 flex items-center justify-center">
                                        <img src={editingBouquet.image} alt="Preview" className="h-full w-full object-cover" />
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-3 pt-4">
                                <Button variant="outline" className="flex-1" onClick={() => setEditingBouquet(null)}>Cancel</Button>
                                <Button className="flex-1 btn-luxury" onClick={saveBouquet}>Save Bouquet</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default CollectionEditor;
