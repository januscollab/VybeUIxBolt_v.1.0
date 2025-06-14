import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Input } from './input';
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from './command';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Check, ChevronsUpDown } from 'lucide-react';

export interface AutocompleteOption {
  value: string;
  label: string;
  description?: string;
}

export interface AutocompleteProps {
  options: AutocompleteOption[];
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (query: string) => void;
  placeholder?: string;
  emptyMessage?: string;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  allowCustom?: boolean;
  filterFunction?: (option: AutocompleteOption, query: string) => boolean;
}

export const Autocomplete = React.forwardRef<HTMLInputElement, AutocompleteProps>(
  ({ 
    options,
    value = '',
    onChange,
    onSearch,
    placeholder = "Search...",
    emptyMessage = "No results found.",
    className,
    disabled = false,
    loading = false,
    allowCustom = false,
    filterFunction
  }, ref) => {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [selectedOption, setSelectedOption] = useState<AutocompleteOption | null>(
      options.find(opt => opt.value === value) || null
    );

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      const option = options.find(opt => opt.value === value);
      setSelectedOption(option || null);
      if (option) {
        setQuery(option.label);
      }
    }, [value, options]);

    const filteredOptions = React.useMemo(() => {
      if (!query) return options;
      
      return options.filter(option => {
        if (filterFunction) {
          return filterFunction(option, query);
        }
        return option.label.toLowerCase().includes(query.toLowerCase()) ||
               option.value.toLowerCase().includes(query.toLowerCase());
      });
    }, [options, query, filterFunction]);

    const handleInputChange = (inputValue: string) => {
      setQuery(inputValue);
      onSearch?.(inputValue);
      
      if (!open) {
        setOpen(true);
      }

      // Handle custom values
      if (allowCustom && inputValue && !options.find(opt => opt.label === inputValue)) {
        onChange?.(inputValue);
      }
    };

    const handleSelect = (option: AutocompleteOption) => {
      setSelectedOption(option);
      setQuery(option.label);
      onChange?.(option.value);
      setOpen(false);
      inputRef.current?.blur();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        inputRef.current?.blur();
      }
    };

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            <Input
              ref={ref || inputRef}
              value={query}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setOpen(true)}
              placeholder={placeholder}
              disabled={disabled}
              className={cn("pr-8", className)}
            />
            <ChevronsUpDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </PopoverTrigger>
        
        <PopoverContent className="p-0 w-full min-w-[200px]" align="start">
          <Command>
            <CommandList>
              {loading && (
                <div className="p-4 text-sm text-muted-foreground">
                  Loading...
                </div>
              )}
              
              {!loading && filteredOptions.length === 0 && (
                <CommandEmpty>{emptyMessage}</CommandEmpty>
              )}
              
              {!loading && filteredOptions.length > 0 && (
                <CommandGroup>
                  {filteredOptions.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      onSelect={() => handleSelect(option)}
                      className="cursor-pointer"
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex-1">
                          <div className="font-medium">{option.label}</div>
                          {option.description && (
                            <div className="text-sm text-muted-foreground">
                              {option.description}
                            </div>
                          )}
                        </div>
                        {selectedOption?.value === option.value && (
                          <Check className="h-4 w-4 text-primary" />
                        )}
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
              
              {allowCustom && query && !options.find(opt => opt.label === query) && (
                <CommandGroup>
                  <CommandItem
                    value={query}
                    onSelect={() => handleSelect({ value: query, label: query })}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center">
                      <span>Create "{query}"</span>
                    </div>
                  </CommandItem>
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);

Autocomplete.displayName = "Autocomplete";