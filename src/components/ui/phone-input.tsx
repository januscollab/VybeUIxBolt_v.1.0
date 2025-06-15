import * as React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

// Country codes with names and dial codes
const COUNTRY_CODES = [
  { code: "AE", name: "United Arab Emirates", dial: "+971", flag: "🇦🇪" },
  { code: "US", name: "United States", dial: "+1", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", dial: "+44", flag: "🇬🇧" },
  { code: "SA", name: "Saudi Arabia", dial: "+966", flag: "🇸🇦" },
  { code: "IN", name: "India", dial: "+91", flag: "🇮🇳" },
  { code: "PK", name: "Pakistan", dial: "+92", flag: "🇵🇰" },
  { code: "EG", name: "Egypt", dial: "+20", flag: "🇪🇬" },
  { code: "JO", name: "Jordan", dial: "+962", flag: "🇯🇴" },
  { code: "LB", name: "Lebanon", dial: "+961", flag: "🇱🇧" },
  { code: "KW", name: "Kuwait", dial: "+965", flag: "🇰🇼" },
  { code: "QA", name: "Qatar", dial: "+974", flag: "🇶🇦" },
  { code: "BH", name: "Bahrain", dial: "+973", flag: "🇧🇭" },
  { code: "OM", name: "Oman", dial: "+968", flag: "🇴🇲" },
  { code: "CA", name: "Canada", dial: "+1", flag: "🇨🇦" },
  { code: "AU", name: "Australia", dial: "+61", flag: "🇦🇺" },
  { code: "DE", name: "Germany", dial: "+49", flag: "🇩🇪" },
  { code: "FR", name: "France", dial: "+33", flag: "🇫🇷" },
  { code: "ES", name: "Spain", dial: "+34", flag: "🇪🇸" },
  { code: "IT", name: "Italy", dial: "+39", flag: "🇮🇹" },
  { code: "NL", name: "Netherlands", dial: "+31", flag: "🇳🇱" },
];

export interface PhoneInputProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  variant?: "numeric" | "flag";
  defaultCountry?: string;
}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, variant = "numeric", value = "", onChange, placeholder = "557215200", defaultCountry = "AE", ...props }, ref) => {
    const [selectedCountry, setSelectedCountry] = useState(defaultCountry);
    const [phoneNumber, setPhoneNumber] = useState("");

    React.useEffect(() => {
      if (value) {
        // Parse existing value to extract country and number
        const country = COUNTRY_CODES.find(c => value.startsWith(c.dial));
        if (country) {
          setSelectedCountry(country.code);
          setPhoneNumber(value.substring(country.dial.length));
        }
      }
    }, [value]);

    const handleCountryChange = (countryCode: string) => {
      setSelectedCountry(countryCode);
      const country = COUNTRY_CODES.find(c => c.code === countryCode);
      if (country && onChange) {
        onChange(`${country.dial}${phoneNumber}`);
      }
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newNumber = e.target.value.replace(/\D/g, ''); // Only allow digits
      setPhoneNumber(newNumber);
      const country = COUNTRY_CODES.find(c => c.code === selectedCountry);
      if (country && onChange) {
        onChange(`${country.dial}${newNumber}`);
      }
    };

    const selectedCountryData = COUNTRY_CODES.find(c => c.code === selectedCountry);

    if (variant === "flag") {
      return (
        <div className={cn("flex", className)}>
          <Select value={selectedCountry} onValueChange={handleCountryChange}>
            <SelectTrigger className="w-32 rounded-r-none border-r-0">
              <SelectValue>
                <div className="flex items-center gap-2">
                  <span className="text-lg">{selectedCountryData?.flag}</span>
                  <span className="text-sm">{selectedCountryData?.dial}</span>
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {COUNTRY_CODES.map((country) => (
                <SelectItem key={country.code} value={country.code}>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{country.flag}</span>
                    <span className="text-sm">{country.dial}</span>
                    <span className="text-sm text-muted-foreground">{country.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            ref={ref}
            type="tel"
            value={phoneNumber}
            onChange={handlePhoneChange}
            placeholder={placeholder}
            className="rounded-l-none flex-1"
            {...props}
          />
        </div>
      );
    }

    // Numeric variant (default)
    return (
      <div className={cn("flex", className)}>
        <Select value={selectedCountry} onValueChange={handleCountryChange}>
          <SelectTrigger className="w-24 rounded-r-none border-r-0">
            <SelectValue>
              <span className="text-sm">{selectedCountryData?.dial}</span>
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {COUNTRY_CODES.map((country) => (
              <SelectItem key={country.code} value={country.code}>
                <div className="flex items-center gap-2">
                  <span className="text-sm">{country.dial}</span>
                  <span className="text-sm text-muted-foreground">{country.code}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          ref={ref}
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneChange}
          placeholder={placeholder}
          className="rounded-l-none flex-1"
          {...props}
        />
      </div>
    );
  }
);

PhoneInput.displayName = "PhoneInput";

export { PhoneInput };