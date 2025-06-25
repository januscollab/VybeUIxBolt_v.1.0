
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/core/Breadcrumb";
import { useCategories, useComponents } from "@/hooks/useStaticDesignSystem";
import { Home } from "lucide-react";
import { useEffect, useState } from "react";

export function BreadcrumbNavigation() {
  const location = useLocation();
  const { data: categories } = useCategories();
  const { data: allComponents } = useComponents();
  const [breadcrumbItems, setBreadcrumbItems] = useState<Array<{
    label: string;
    href: string;
    icon?: React.ComponentType<any>;
    current?: boolean;
  }>>([]);

  useEffect(() => {
    const items = [];
    const pathSegments = location.pathname.split('/').filter(Boolean);
    
    if (pathSegments.length === 0) {
      setBreadcrumbItems([]);
      return;
    }

    // Always start with Home
    items.push({
      label: "Home",
      href: "/",
      icon: Home
    });

    if (pathSegments[0] === 'category' && pathSegments[1]) {
      const categorySlug = pathSegments[1];
      const category = categories?.find(cat => cat.slug === categorySlug);
      
      if (category) {
        items.push({
          label: category.name,
          href: `/category/${categorySlug}`,
          current: !location.hash // Only current if no hash
        });
      }

      // If there's a hash, it means we're viewing a specific component
      if (location.hash) {
        const componentSlug = location.hash.replace('#', '');
        const component = allComponents?.find(comp => comp.slug === componentSlug);
        
        if (component) {
          items.push({
            label: component.name,
            href: `${location.pathname}${location.hash}`,
            current: true
          });
        }
      }
    }

    if (pathSegments[0] === 'component' && pathSegments[1]) {
      const componentSlug = pathSegments[1];
      const component = allComponents?.find(comp => comp.slug === componentSlug);
      
      if (component) {
        // Find the category for this component
        const category = categories?.find(cat => cat.id === component.category_id);
        
        if (category) {
          items.push({
            label: category.name,
            href: `/category/${category.slug}`
          });
        }
        
        items.push({
          label: component.name,
          href: `/component/${componentSlug}`,
          current: true
        });
      }
    }

    setBreadcrumbItems(items);
  }, [location.pathname, location.hash, categories, allComponents]);

  if (breadcrumbItems.length <= 1) return null;

  return (
    <div className="mb-6">
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbItems.map((item, index) => (
            <React.Fragment key={item.href}>
              <BreadcrumbItem>
                {item.current ? (
                  <BreadcrumbPage className="flex items-center gap-2">
                    {item.icon && <item.icon className="h-4 w-4" />}
                    {item.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={item.href} className="flex items-center gap-2 hover:text-primary transition-colors">
                      {item.icon && <item.icon className="h-4 w-4" />}
                      {item.label}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index < breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
