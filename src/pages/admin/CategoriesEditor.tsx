import React, { useState } from 'react';
import { useContent } from '@/context/ContentContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Save, Plus, Trash2, Edit2, X, Upload } from 'lucide-react';
import { CategoryItem } from '@/types/content';
import { fileToBase64 } from '@/lib/utils';

const CategoriesEditor = () => {
    const { content, updateSection } = useContent();
    const { toast } = useToast();
    const [data, setData] = useState(content.categories);
    const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);

    const handleSave = () => {
        updateSection('categories', data);
        toast({ title: "Categories Section Updated", description: "Changes have been saved successfully." });
    };

    const deleteCategory = (id: string) => {
        setData({
            ...data,
            items: data.items.filter(item => item.id !== id)
        });
    };

    const startAddCategory = () => {
        setEditingCategory({
            id: Math.random().toString(36).substr(2, 9),
            name: '',
            filterValue: '',
            description: '',
            icon: 'Heart',
            image: '',
            color: 'from-pink-500/20 to-rose-500/20'
        });
    };

    const saveCategory = () => {
        if (!editingCategory) return;

        let newData;
        const exists = data.items.find(item => item.id === editingCategory.id);
        if (exists) {
            newData = {
                ...data,
                items: data.items.map(item => item.id === editingCategory.id ? editingCategory : item)
            };
        } else {
            newData = {
                ...data,
                items: [...data.items, editingCategory]
            };
        }

        setData(newData);
        updateSection('categories', newData); // Auto-save to context
        setEditingCategory(null);
        toast({ title: "Category Saved", description: "Changes have been persisted." });
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Categories Header</CardTitle>
                    <CardDescription>Edit the introductory text for categories</CardDescription>
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

                    <Button onClick={handleSave} className="w-full btn-luxury">
                        <Save className="w-4 h-4 mr-2" />
                        Save Header Settings
                    </Button>
                </CardContent>
            </Card>

            <div className="flex items-center justify-between mt-8">
                <h3 className="text-xl font-serif font-semibold">Category Management</h3>
                <Button onClick={startAddCategory} className="btn-gold">
                    <Plus className="w-4 h-4 mr-2" /> Add New Category
                </Button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.items.map((category) => (
                    <Card key={category.id} className="overflow-hidden group">
                        <div className="h-40 overflow-hidden relative">
                            <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
                            <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60`} />
                            <div className="absolute top-2 right-2 flex gap-1">
                                <Button size="icon" variant="secondary" className="h-8 w-8" onClick={() => setEditingCategory(category)}>
                                    <Edit2 className="w-4 h-4" />
                                </Button>
                                <Button size="icon" variant="destructive" className="h-8 w-8" onClick={() => deleteCategory(category.id)}>
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <h4 className="text-white font-serif text-lg font-bold drop-shadow-md">{category.name}</h4>
                            </div>
                        </div>
                        <CardContent className="p-3">
                            <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Icon: {category.icon}</p>
                            <p className="text-xs text-muted-foreground line-clamp-2">{category.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {editingCategory && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
                    <Card className="w-full max-w-lg">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>{editingCategory.name ? 'Edit' : 'Add'} Category</CardTitle>
                            <Button variant="ghost" size="icon" onClick={() => setEditingCategory(null)}>
                                <X className="w-4 h-4" />
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Name</Label>
                                    <Input
                                        value={editingCategory.name}
                                        onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Filter Value (Link ID)</Label>
                                    <Input
                                        placeholder="e.g. Romantic"
                                        value={editingCategory.filterValue}
                                        onChange={(e) => setEditingCategory({ ...editingCategory, filterValue: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Icon Name</Label>
                                    <Input
                                        placeholder="e.g. Heart"
                                        value={editingCategory.icon}
                                        onChange={(e) => setEditingCategory({ ...editingCategory, icon: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Description</Label>
                                <Textarea
                                    rows={2}
                                    value={editingCategory.description}
                                    onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Image (URL or Upload)</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            value={editingCategory.image}
                                            onChange={(e) => setEditingCategory({ ...editingCategory, image: e.target.value })}
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="icon"
                                            onClick={() => document.getElementById('cat-upload')?.click()}
                                        >
                                            <Upload className="w-4 h-4" />
                                        </Button>
                                        <input
                                            id="cat-upload"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={async (e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    const base64 = await fileToBase64(file);
                                                    setEditingCategory({ ...editingCategory, image: base64 });
                                                    // Note: We don't auto-save here yet because they might still be editing other fields in the modal. 
                                                    // The actual save happens when they click "Save Category" button.
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Overlay Gradient</Label>
                                    <Input
                                        value={editingCategory.color}
                                        onChange={(e) => setEditingCategory({ ...editingCategory, color: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <Button variant="outline" className="flex-1" onClick={() => setEditingCategory(null)}>Cancel</Button>
                                <Button className="flex-1 btn-luxury" onClick={saveCategory}>Save Category</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default CategoriesEditor;
