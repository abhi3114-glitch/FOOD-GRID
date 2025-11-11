import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2 border-green-700 text-green-700 hover:bg-green-50"
    >
      <Languages className="h-4 w-4" />
      <span className="font-medium">{language === 'en' ? 'हिंदी' : 'English'}</span>
    </Button>
  );
}