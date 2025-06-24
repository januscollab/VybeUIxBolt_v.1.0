
import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Building2, Palette, Type, Layout, Sparkles, BarChart, Settings, Home } from 'lucide-react';
import { useLocalDesignSystem } from '@/hooks/useLocalDesignSystem';

const navigationItems = [
  { title: 'Home', icon: Home, url: '/' },
  { title: 'Foundations', icon: Layout, url: '/foundations' },
  { title: 'Components', icon: Palette, url: '/components' },
  { title: 'Typography', icon: Type, url: '/typography' },
  { title: 'Experimental', icon: Sparkles, url: '/experimental' },
  { title: 'Analytics', icon: BarChart, url: '/analytics' },
  { title: 'Settings', icon: Settings, url: '/settings' },
];

export function AppSidebar() {
  const { brandName, logoUrl } = useLocalDesignSystem();

  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 px-2 py-1">
          {logoUrl ? (
            <img src={logoUrl} alt={brandName} className="h-8 w-8 object-contain" />
          ) : (
            <Building2 className="h-8 w-8 text-primary" />
          )}
          <span className="font-semibold text-lg">{brandName}</span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t">
        <div className="p-2 text-sm text-muted-foreground">
          Design System v1.0
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
