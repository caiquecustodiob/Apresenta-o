import React, { useState, useEffect, useCallback } from 'react';
import { SLIDES } from './constants';
import { SlideRenderer } from './components/SlideRenderer';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev < SLIDES.length - 1 ? prev + 1 : prev));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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
      if (e.button === 0) {
        // Left click -> Go Back (Volta)
        prevSlide();
      } else if (e.button === 2) {
        // Right click -> Go Next (Passa)
        nextSlide();
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      // Prevent the default right-click menu from showing
      e.preventDefault();
    };

    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('contextmenu', handleContextMenu);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [isFullScreen, nextSlide, prevSlide]);

  // Fullscreen detection
  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullScreenChange);
  }, []);

  const currentSlide = SLIDES[currentSlideIndex];
  const progress = ((currentSlideIndex + 1) / SLIDES.length) * 100;

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
  };

  return (
    <div className="relative w-screen h-screen bg-gray-950 text-white overflow-hidden flex flex-col">
      {/* Background Effect */}
      <div className="absolute inset-0 z-0">
         {currentSlide.backgroundImage && (
            <div 
                className="absolute inset-0 bg-cover bg-center opacity-30 blur-sm transition-all duration-1000 transform scale-105"
                style={{ backgroundImage: `url(${currentSlide.backgroundImage})` }}
            />
         )}
         <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-900/90" />
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      </div>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 relative">
            <AnimatePresence mode="wait">
                <SlideRenderer key={currentSlide.id} slide={currentSlide} />
            </AnimatePresence>
        </div>
      </main>

      {/* Control Bar - Hidden in Fullscreen */}
      {!isFullScreen && (
        <footer className="relative z-20 h-16 bg-gray-900/80 backdrop-blur-md border-t border-white/5 flex items-center justify-between px-6 transition-opacity duration-300">
          <div className="flex items-center gap-4">
               <span className="font-bold text-lg tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">
                  NORDESTE
               </span>
               <span className="text-xs text-gray-500 uppercase px-2 py-0.5 border border-gray-700 rounded">
                  Confidencial
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
                  {currentSlideIndex + 1} <span className="text-gray-600">/</span> {SLIDES.length}
              </span>

              <button 
                  onClick={nextSlide}
                  disabled={currentSlideIndex === SLIDES.length - 1}
                  className="p-2 rounded-full hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  aria-label="Próximo slide"
              >
                  <ChevronRight size={24} />
              </button>
          </div>

          <div className="flex items-center gap-4">
              <button onClick={toggleFullScreen} className="text-gray-400 hover:text-white transition-colors" aria-label="Tela cheia">
                  <Maximize2 size={20} />
              </button>
          </div>

          {/* Progress Bar */}
          <div className="absolute top-0 left-0 h-[2px] bg-blue-600 transition-all duration-300" style={{ width: `${progress}%` }} />
        </footer>
      )}
    </div>
  );
};

export default App;