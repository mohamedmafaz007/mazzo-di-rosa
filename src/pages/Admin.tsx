import React, { useState } from 'react';
import { useContent } from '@/context/ContentContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { LogOut, Save, RotateCcw, LayoutDashboard, Heart, Info, Image as ImageIcon, Phone, HelpCircle } from 'lucide-react';

import HeroEditor from './admin/HeroEditor';
import AboutEditor from './admin/AboutEditor';
import CollectionEditor from './admin/CollectionEditor';
import CategoriesEditor from './admin/CategoriesEditor';
import WhyChooseEditor from './admin/WhyChooseEditor';
import ContactEditor from './admin/ContactEditor';

const Admin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const { resetToDefault } = useContent();
    const { toast } = useToast();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'admin123') { // Simple password for demo
            setIsAuthenticated(true);
            toast({ title: "Welcome, Admin", description: "You are now logged in." });
        } else {
            toast({ title: "Access Denied", description: "Incorrect password.", variant: "destructive" });
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-secondary/30 p-4">
                <Card className="w-full max-w-md">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-serif">Mazzo di Rosa Admin</CardTitle>
                        <CardDescription>Enter password to manage your website</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter password"
                                />
                            </div>
                            <Button type="submit" className="w-full btn-luxury">Login</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-secondary/10 pb-20">
            {/* Admin Header */}
            <header className="bg-white border-b border-border sticky top-0 z-40 shadow-sm">
                <div className="container-luxury py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                            <LayoutDashboard className="text-white w-5 h-5" />
                        </div>
                        <div>
                            <h1 className="font-serif text-xl font-semibold">Admin Dashboard</h1>
                            <p className="text-xs text-muted-foreground">Manage your website content</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={resetToDefault} className="text-destructive hover:bg-destructive/10">
                            <RotateCcw className="w-4 h-4 mr-2" />
                            Reset All
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => setIsAuthenticated(false)}>
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </Button>
                    </div>
                </div>
            </header>

            <main className="container-luxury py-8">
                <Tabs defaultValue="hero" className="space-y-6">
                    <div className="bg-white p-2 rounded-xl shadow-sm border border-border overflow-x-auto">
                        <TabsList className="bg-transparent h-auto gap-2">
                            <TabsTrigger value="hero" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg py-2">
                                <LayoutDashboard className="w-4 h-4 mr-2" /> Home
                            </TabsTrigger>
                            <TabsTrigger value="about" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg py-2">
                                <Info className="w-4 h-4 mr-2" /> About
                            </TabsTrigger>
                            <TabsTrigger value="collection" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg py-2">
                                <Heart className="w-4 h-4 mr-2" /> Collection
                            </TabsTrigger>
                            <TabsTrigger value="categories" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg py-2">
                                <ImageIcon className="w-4 h-4 mr-2" /> Categories
                            </TabsTrigger>
                            <TabsTrigger value="why-us" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg py-2">
                                <HelpCircle className="w-4 h-4 mr-2" /> Why Us
                            </TabsTrigger>
                            <TabsTrigger value="contact" className="data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg py-2">
                                <Phone className="w-4 h-4 mr-2" /> Contact
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="hero">
                        <HeroEditor />
                    </TabsContent>
                    <TabsContent value="about">
                        <AboutEditor />
                    </TabsContent>
                    <TabsContent value="collection">
                        <CollectionEditor />
                    </TabsContent>
                    <TabsContent value="categories">
                        <CategoriesEditor />
                    </TabsContent>
                    <TabsContent value="why-us">
                        <WhyChooseEditor />
                    </TabsContent>
                    <TabsContent value="contact">
                        <ContactEditor />
                    </TabsContent>
                </Tabs>
            </main>

            {/* Floating View Website Button */}
            <div className="fixed bottom-6 right-6 z-50">
                <Button onClick={() => window.open('/', '_blank')} className="rounded-full shadow-2xl h-14 px-8 btn-gold">
                    View Live Website
                </Button>
            </div>
        </div>
    );
};

export default Admin;
