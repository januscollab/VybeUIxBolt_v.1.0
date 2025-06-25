
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronDown, Search, Star, Zap, Shield, Palette, Code, Users, ArrowRight } from 'lucide-react';

export default function MegaMenuShowcase() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const menuItems = [
    {
      id: 'products',
      title: 'Products',
      sections: [
        {
          title: 'Design System',
          items: [
            { name: 'Components', desc: 'Pre-built UI components', icon: Palette },
            { name: 'Tokens', desc: 'Design tokens and variables', icon: Code },
            { name: 'Templates', desc: 'Ready-to-use page templates', icon: Star }
          ]
        },
        {
          title: 'Developer Tools',
          items: [
            { name: 'CLI Tools', desc: 'Command line utilities', icon: Code },
            { name: 'Plugins', desc: 'IDE and editor extensions', icon: Zap },
            { name: 'API Reference', desc: 'Complete API documentation', icon: Shield }
          ]
        }
      ]
    },
    {
      id: 'solutions',
      title: 'Solutions',
      sections: [
        {
          title: 'By Industry',
          items: [
            { name: 'E-commerce', desc: 'Online store solutions', icon: Star },
            { name: 'SaaS', desc: 'Software as a service', icon: Zap },
            { name: 'Enterprise', desc: 'Large scale applications', icon: Shield }
          ]
        },
        {
          title: 'By Use Case',
          items: [
            { name: 'Rapid Prototyping', desc: 'Quick mockups and demos', icon: Zap },
            { name: 'Production Apps', desc: 'Scalable applications', icon: Shield },
            { name: 'Design Handoff', desc: 'Designer to developer workflow', icon: Palette }
          ]
        }
      ]
    },
    {
      id: 'resources',
      title: 'Resources',
      sections: [
        {
          title: 'Learn',
          items: [
            { name: 'Documentation', desc: 'Complete guides and tutorials', icon: Code },
            { name: 'Examples', desc: 'Real world implementations', icon: Star },
            { name: 'Best Practices', desc: 'Industry standards and tips', icon: Shield }
          ]
        },
        {
          title: 'Community',
          items: [
            { name: 'Discord', desc: 'Join our community chat', icon: Users },
            { name: 'GitHub', desc: 'Contribute to open source', icon: Code },
            { name: 'Blog', desc: 'Latest updates and insights', icon: Palette }
          ]
        }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">Mega Menu</h1>
          <Badge variant="secondary">Experimental</Badge>
        </div>
        <p className="text-lg text-muted-foreground">
          Advanced navigation component with multi-column layouts, icons, and smooth animations.
        </p>
      </div>

      {/* Live Demo */}
      <Card>
        <CardHeader>
          <CardTitle>Interactive Demo</CardTitle>
          <CardDescription>Hover over menu items to see the mega menu in action</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Menu Bar */}
            <nav className="bg-background border border-border rounded-lg shadow-sm">
              <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center space-x-8">
                  <div className="font-bold text-xl text-primary">VybeUI</div>
                  
                  <div className="hidden md:flex items-center space-x-6">
                    {menuItems.map((item) => (
                      <div
                        key={item.id}
                        className="relative"
                        onMouseEnter={() => setActiveMenu(item.id)}
                        onMouseLeave={() => setActiveMenu(null)}
                      >
                        <Button
                          variant="ghost"
                          className="flex items-center gap-1 hover:bg-accent hover:text-accent-foreground"
                        >
                          {item.title}
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                        
                        {/* Mega Menu Dropdown */}
                        {activeMenu === item.id && (
                          <div className="absolute top-full left-0 w-[600px] bg-background border border-border rounded-lg shadow-lg z-50 animate-fade-in">
                            <div className="p-6">
                              <div className="grid grid-cols-2 gap-8">
                                {item.sections.map((section, index) => (
                                  <div key={index} className="space-y-4">
                                    <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                                      {section.title}
                                    </h3>
                                    <div className="space-y-2">
                                      {section.items.map((subItem, subIndex) => (
                                        <a
                                          key={subIndex}
                                          href="#"
                                          className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors group"
                                        >
                                          <subItem.icon className="h-5 w-5 text-primary mt-0.5 group-hover:text-accent-foreground" />
                                          <div>
                                            <div className="font-medium text-sm">{subItem.name}</div>
                                            <div className="text-xs text-muted-foreground group-hover:text-accent-foreground/80">
                                              {subItem.desc}
                                            </div>
                                          </div>
                                        </a>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                              
                              {/* Call to Action */}
                              <div className="mt-6 pt-4 border-t border-border">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p className="font-medium text-sm">Ready to get started?</p>
                                    <p className="text-xs text-muted-foreground">Explore our complete documentation</p>
                                  </div>
                                  <Button size="sm" className="hover:bg-primary/90">
                                    Get Started
                                    <ArrowRight className="h-4 w-4 ml-1" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="icon">
                    <Search className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                  <Button size="sm">
                    Get Started
                  </Button>
                </div>
              </div>
            </nav>
          </div>
        </CardContent>
      </Card>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-primary" />
              Rich Content
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Support for icons, descriptions, and call-to-action buttons within menu items.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Smooth Animations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Fluid transitions and hover effects that enhance user experience.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Accessible
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Built with keyboard navigation and screen reader support in mind.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Mobile Version */}
      <Card>
        <CardHeader>
          <CardTitle>Mobile Responsive</CardTitle>
          <CardDescription>Automatically adapts to mobile devices with collapsible navigation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted/30 rounded-lg p-4 border border-border">
            <div className="max-w-sm mx-auto">
              <div className="bg-background border border-border rounded-lg shadow-sm">
                <div className="flex items-center justify-between px-4 py-3">
                  <div className="font-bold text-lg text-primary">VybeUI</div>
                  <Button variant="ghost" size="icon">
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
                <div className="border-t border-border p-4 space-y-2">
                  {menuItems.map((item) => (
                    <Button key={item.id} variant="ghost" className="w-full justify-start">
                      {item.title}
                      <ChevronDown className="h-4 w-4 ml-auto" />
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
