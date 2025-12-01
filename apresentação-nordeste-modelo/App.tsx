import React, { useState, useEffect, useCallback } from 'react';
import { SLIDES } from './constants';
import { SlideRenderer } from './components/SlideRenderer';
import { ChevronLeft, ChevronRight, Maximize2, Settings } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import { SlideEditor } from './components/SlideEditor';
import { SlideData, PresentationTheme } from './types';

const App: React.FC = () => {
  // --- STATE MANAGEMENT ---
  
  // Slides State: Initialize from LocalStorage or use Constants
  const [slides, setSlides] = useState<SlideData[]>(() => {
    const saved = localStorage.getItem('presentation_slides');
    return saved ? JSON.parse(saved) : SLIDES;
  });

  // Theme State: Initialize from LocalStorage or Default
  const [theme, setTheme] = useState<PresentationTheme>(() => {
    const saved = localStorage.getItem('presentation_theme');
    return saved ? JSON.parse(saved) : {
      companyName: 'NORDESTE',
      logoUrl: '',
      primaryColor: '#DC2626',    // Red-600 (Vermelho)
      secondaryColor: '#FFFFFF',  // White (Branco)
      tertiaryColor: '#111827',   // Gray-900 (Preto/Fundo)
      quaternaryColor: '#9CA3AF'  // Gray-400 (Cinza Detalhes)
    };
  });

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  // --- PERSISTENCE ---
  useEffect(() => {
    localStorage.setItem('presentation_slides', JSON.stringify(slides));
  }, [slides]);

  useEffect(() => {
    localStorage.setItem('presentation_theme', JSON.stringify(theme));
  }, [theme]);


  // --- NAVIGATION ---
  const nextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev < slides.length - 1 ? prev + 1 : prev));
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Disable keyboard nav if user is typing in editor (checking active element)
      const tagName = document.activeElement?.tagName.toLowerCase();
      if (tagName === 'input' || tagName === 'textarea') return;

      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Mouse navigation (Only in FullScreen)
  useEffect(() => {
    if (!isFullScreen) return;

    const handleMouseUp = (e: MouseEvent) => {
      // 0 = Left Click, 2 = Right Click
      if (e.button === 0) prevSlide();
      else if (e.button === 2) nextSlide();
    };

    const handleContextMenu = (e: MouseEvent) => e.preventDefault();

    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('contextmenu', handleContextMenu);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [isFullScreen, nextSlide, prevSlide]);

  // Fullscreen detection
  useEffect(() => {
    const handleFullScreenChange = () => setIsFullScreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullScreenChange);
  }, []);

  // Safety check for index out of bounds (after deleting slides)
  useEffect(() => {
    if (currentSlideIndex >= slides.length) {
      setCurrentSlideIndex(Math.max(0, slides.length - 1));
    }
  }, [slides.length, currentSlideIndex]);

  const currentSlide = slides[currentSlideIndex] || slides[0];
  const progress = ((currentSlideIndex + 1) / slides.length) * 100;

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => console.error(err));
    } else {
        if (document.exitFullscreen) document.exitFullscreen();
    }
  };

  return (
    <div className="relative w-screen h-screen bg-gray-950 text-white overflow-hidden flex flex-col" style={{ backgroundColor: theme.tertiaryColor }}>
      {/* Background Effect */}
      <div className="absolute inset-0 z-0">
         {currentSlide.backgroundImage && (
            <div 
                className="absolute inset-0 bg-cover bg-center opacity-30 blur-sm transition-all duration-1000 transform scale-105"
                style={{ backgroundImage: `url(${currentSlide.backgroundImage})` }}
            />
         )}
         <div 
            className="absolute inset-0 bg-gradient-to-br opacity-90"
            style={{ 
              backgroundImage: `linear-gradient(to bottom right, ${theme.tertiaryColor}, #000000)` 
            }} 
         />
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      </div>

      {/* Main Content Area */}
      <main className={`relative z-10 flex-1 flex flex-col overflow-hidden transition-all duration-300 ${isEditorOpen ? 'mr-96' : ''}`}>
        <div className="flex-1 relative">
            <AnimatePresence mode="wait">
                <SlideRenderer 
                  key={currentSlide.id} 
                  slide={currentSlide} 
                  theme={theme}
                />
            </AnimatePresence>
        </div>
      </main>

      {/* Slide Editor Panel */}
      <SlideEditor 
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        slides={slides}
        setSlides={setSlides}
        currentSlideIndex={currentSlideIndex}
        setCurrentSlideIndex={setCurrentSlideIndex}
        theme={theme}
        setTheme={setTheme}
      />

      {/* Control Bar - Hidden in Fullscreen */}
      {!isFullScreen && (
        <footer className={`relative z-20 h-16 bg-gray-900/80 backdrop-blur-md border-t border-white/5 flex items-center justify-between px-6 transition-all duration-300 ${isEditorOpen ? 'mr-96' : ''}`}>
          <div className="flex items-center gap-4">
               <span 
                 className="font-bold text-lg tracking-wider"
                 style={{ color: theme.secondaryColor }}
               >
                  {theme.companyName}
               </span>
          </div>

          <div className="flex items-center gap-6">
              <button 
                  onClick={prevSlide}
                  disabled={currentSlideIndex === 0}
                  className="p-2 rounded-full hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  aria-label="Slide anterior"
              >
                  <ChevronLeft size={24} />
              </button>
              
              <span className="text-sm font-mono text-gray-400">
                  {currentSlideIndex + 1} <span className="text-gray-600">/</span> {slides.length}
              </span>

              <button 
                  onClick={nextSlide}
                  disabled={currentSlideIndex === slides.length - 1}
                  className="p-2 rounded-full hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  aria-label="Próximo slide"
              >
                  <ChevronRight size={24} />
              </button>
          </div>

          <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsEditorOpen(!isEditorOpen)} 
                className={`p-2 rounded-full transition-colors ${isEditorOpen ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                style={{ backgroundColor: isEditorOpen ? theme.primaryColor : 'transparent' }}
                title="Editor de Slides"
              >
                <Settings size={20} />
              </button>
              <div className="w-px h-6 bg-gray-700"></div>
              <button onClick={toggleFullScreen} className="text-gray-400 hover:text-white transition-colors" aria-label="Tela cheia">
                  <Maximize2 size={20} />
              </button>
          </div>

          {/* Progress Bar */}
          <div 
            className="absolute top-0 left-0 h-[2px] transition-all duration-300" 
            style={{ 
                width: `${progress}%`, 
                backgroundColor: theme.primaryColor 
            }} 
          />
        </footer>
      )}
    </div>
  );
};

export default App;