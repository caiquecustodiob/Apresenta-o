import React, { useState } from 'react';
import { X, Plus, Trash2, Save, Image, Type, Palette, Layers, Settings, Upload } from 'lucide-react';
import { SlideData, SlideType, PresentationTheme } from '../types';

interface SlideEditorProps {
  isOpen: boolean;
  onClose: () => void;
  slides: SlideData[];
  setSlides: (slides: SlideData[]) => void;
  currentSlideIndex: number;
  setCurrentSlideIndex: (index: number) => void;
  theme: PresentationTheme;
  setTheme: (theme: PresentationTheme) => void;
}

export const SlideEditor: React.FC<SlideEditorProps> = ({
  isOpen,
  onClose,
  slides,
  setSlides,
  currentSlideIndex,
  setCurrentSlideIndex,
  theme,
  setTheme
}) => {
  const [activeTab, setActiveTab] = useState<'slides' | 'identity'>('slides');

  if (!isOpen) return null;

  const currentSlide = slides[currentSlideIndex];

  const handleSlideChange = (field: keyof SlideData, value: any) => {
    const updatedSlides = [...slides];
    updatedSlides[currentSlideIndex] = {
      ...updatedSlides[currentSlideIndex],
      [field]: value
    };
    setSlides(updatedSlides);
  };

  const handleContentChange = (text: string) => {
    // Split by new line to create array
    const contentArray = text.split('\n').filter(line => line.trim() !== '');
    handleSlideChange('content', contentArray);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleSlideChange('backgroundImage', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addNewSlide = () => {
    const newSlide: SlideData = {
      id: Date.now(),
      type: SlideType.LIST,
      title: 'Novo Slide',
      subtitle: 'Subtítulo do slide',
      content: ['Item 1', 'Item 2'],
      icon: 'Monitor'
    };
    const updatedSlides = [...slides];
    updatedSlides.splice(currentSlideIndex + 1, 0, newSlide);
    setSlides(updatedSlides);
    setCurrentSlideIndex(currentSlideIndex + 1);
  };

  const deleteSlide = () => {
    if (slides.length <= 1) return alert("Você não pode apagar o único slide.");
    if (!confirm("Tem certeza que deseja excluir este slide?")) return;

    const updatedSlides = slides.filter((_, idx) => idx !== currentSlideIndex);
    setSlides(updatedSlides);
    setCurrentSlideIndex(Math.max(0, currentSlideIndex - 1));
  };

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-gray-900 border-l border-gray-700 shadow-2xl z-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
        <h2 className="text-white font-bold flex items-center gap-2">
          <Settings size={20} className="text-blue-400" /> Editor
        </h2>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          <X size={24} />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-700">
        <button
          onClick={() => setActiveTab('slides')}
          className={`flex-1 p-3 text-sm font-medium transition-colors ${
            activeTab === 'slides' ? 'bg-gray-800 text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:bg-gray-800'
          }`}
        >
          <Layers size={16} className="inline mr-2" /> Slides
        </button>
        <button
          onClick={() => setActiveTab('identity')}
          className={`flex-1 p-3 text-sm font-medium transition-colors ${
            activeTab === 'identity' ? 'bg-gray-800 text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:bg-gray-800'
          }`}
        >
          <Palette size={16} className="inline mr-2" /> Identidade
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        
        {activeTab === 'identity' && (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs uppercase text-gray-500 font-semibold tracking-wider">Nome da Empresa</label>
              <input 
                type="text" 
                value={theme.companyName}
                onChange={(e) => setTheme({...theme, companyName: e.target.value})}
                className="w-full bg-gray-800 border border-gray-600 rounded p-2 text-white focus:border-blue-500 outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase text-gray-500 font-semibold tracking-wider">URL do Logo</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={theme.logoUrl}
                  onChange={(e) => setTheme({...theme, logoUrl: e.target.value})}
                  className="w-full bg-gray-800 border border-gray-600 rounded p-2 text-white focus:border-blue-500 outline-none text-sm"
                  placeholder="https://..."
                />
              </div>
              {theme.logoUrl && (
                <div className="mt-2 p-2 bg-white/10 rounded flex justify-center">
                  <img src={theme.logoUrl} alt="Preview" className="h-12 object-contain" />
                </div>
              )}
            </div>

            <hr className="border-gray-700" />
            <h3 className="text-sm font-bold text-white mb-4">Paleta de Cores (4 Camadas)</h3>

            {/* Layer 1 - Primary */}
            <div className="space-y-2">
              <label className="text-xs uppercase text-gray-500 font-semibold tracking-wider">1. Cor Primária (Destaque)</label>
              <div className="flex items-center gap-3 bg-gray-800 p-2 rounded border border-gray-600">
                <input 
                  type="color" 
                  value={theme.primaryColor}
                  onChange={(e) => setTheme({...theme, primaryColor: e.target.value})}
                  className="h-8 w-8 rounded cursor-pointer border-none bg-transparent"
                />
                <span className="text-gray-300 font-mono text-xs">{theme.primaryColor}</span>
              </div>
            </div>

            {/* Layer 2 - Secondary */}
            <div className="space-y-2">
              <label className="text-xs uppercase text-gray-500 font-semibold tracking-wider">2. Cor Secundária (Gradientes)</label>
              <div className="flex items-center gap-3 bg-gray-800 p-2 rounded border border-gray-600">
                <input 
                  type="color" 
                  value={theme.secondaryColor || '#9333EA'}
                  onChange={(e) => setTheme({...theme, secondaryColor: e.target.value})}
                  className="h-8 w-8 rounded cursor-pointer border-none bg-transparent"
                />
                <span className="text-gray-300 font-mono text-xs">{theme.secondaryColor || '#9333EA'}</span>
              </div>
            </div>

            {/* Layer 3 - Tertiary */}
            <div className="space-y-2">
              <label className="text-xs uppercase text-gray-500 font-semibold tracking-wider">3. Cor Terciária (Fundo/Borda)</label>
              <div className="flex items-center gap-3 bg-gray-800 p-2 rounded border border-gray-600">
                <input 
                  type="color" 
                  value={theme.tertiaryColor || '#0F172A'}
                  onChange={(e) => setTheme({...theme, tertiaryColor: e.target.value})}
                  className="h-8 w-8 rounded cursor-pointer border-none bg-transparent"
                />
                <span className="text-gray-300 font-mono text-xs">{theme.tertiaryColor || '#0F172A'}</span>
              </div>
            </div>

            {/* Layer 4 - Quaternary */}
            <div className="space-y-2">
              <label className="text-xs uppercase text-gray-500 font-semibold tracking-wider">4. Cor Quaternária (Detalhes)</label>
              <div className="flex items-center gap-3 bg-gray-800 p-2 rounded border border-gray-600">
                <input 
                  type="color" 
                  value={theme.quaternaryColor || '#F59E0B'}
                  onChange={(e) => setTheme({...theme, quaternaryColor: e.target.value})}
                  className="h-8 w-8 rounded cursor-pointer border-none bg-transparent"
                />
                <span className="text-gray-300 font-mono text-xs">{theme.quaternaryColor || '#F59E0B'}</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'slides' && currentSlide && (
          <div className="space-y-6">
            {/* Slide Navigation/Actions */}
            <div className="flex gap-2 mb-4">
              <button 
                onClick={addNewSlide}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded flex items-center justify-center gap-2 text-sm transition-colors"
              >
                <Plus size={16} /> Adicionar Slide
              </button>
              <button 
                onClick={deleteSlide}
                className="bg-red-900/50 hover:bg-red-900 text-red-200 py-2 px-3 rounded transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <hr className="border-gray-700" />

            {/* Type Selector */}
            <div className="space-y-2">
              <label className="text-xs uppercase text-gray-500 font-semibold tracking-wider">Tipo de Slide</label>
              <select 
                value={currentSlide.type}
                onChange={(e) => handleSlideChange('type', e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded p-2 text-white focus:border-blue-500 outline-none"
              >
                {Object.values(SlideType).map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <label className="text-xs uppercase text-gray-500 font-semibold tracking-wider">Título</label>
              <input 
                type="text" 
                value={currentSlide.title}
                onChange={(e) => handleSlideChange('title', e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded p-2 text-white focus:border-blue-500 outline-none font-bold"
              />
            </div>

            {/* Subtitle */}
            <div className="space-y-2">
              <label className="text-xs uppercase text-gray-500 font-semibold tracking-wider">Subtítulo</label>
              <input 
                type="text" 
                value={currentSlide.subtitle || ''}
                onChange={(e) => handleSlideChange('subtitle', e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded p-2 text-white focus:border-blue-500 outline-none"
              />
            </div>

             {/* Highlight / Big Number */}
             {(currentSlide.type === SlideType.BIG_NUMBER || currentSlide.type === SlideType.QUOTE || currentSlide.type === SlideType.COMPARISON) && (
              <div className="space-y-2">
                <label className="text-xs uppercase text-gray-500 font-semibold tracking-wider">Destaque / Citação</label>
                <input 
                  type="text" 
                  value={currentSlide.highlight || ''}
                  onChange={(e) => handleSlideChange('highlight', e.target.value)}
                  className="w-full bg-gray-800 border border-gray-600 rounded p-2 text-white focus:border-blue-500 outline-none text-yellow-300"
                />
              </div>
            )}

            {/* Content List */}
            <div className="space-y-2">
              <label className="text-xs uppercase text-gray-500 font-semibold tracking-wider">Conteúdo (Lista)</label>
              <textarea 
                value={currentSlide.content?.join('\n') || ''}
                onChange={(e) => handleContentChange(e.target.value)}
                rows={6}
                placeholder="Item 1&#10;Item 2&#10;Item 3"
                className="w-full bg-gray-800 border border-gray-600 rounded p-2 text-white focus:border-blue-500 outline-none font-mono text-sm leading-relaxed"
              />
              <p className="text-xs text-gray-500">Separe os itens por linha.</p>
            </div>

            {/* Background Image Upload */}
            <div className="space-y-2">
              <label className="text-xs uppercase text-gray-500 font-semibold tracking-wider">Imagem de Fundo</label>
              
              <div className="flex flex-col gap-2">
                <input 
                    type="text" 
                    value={currentSlide.backgroundImage || ''}
                    onChange={(e) => handleSlideChange('backgroundImage', e.target.value)}
                    className="w-full bg-gray-800 border border-gray-600 rounded p-2 text-white focus:border-blue-500 outline-none text-xs"
                    placeholder="URL da imagem (http://...)"
                />
                
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-3 rounded flex items-center justify-center gap-2 text-sm transition-colors border border-gray-600">
                     <Upload size={16} /> Fazer Upload (Computador)
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-gray-500">Imagens muito grandes podem deixar a apresentação lenta.</p>
            </div>

            {/* Icon */}
            <div className="space-y-2">
                <label className="text-xs uppercase text-gray-500 font-semibold tracking-wider">Nome do Ícone (Lucide)</label>
                <input 
                  type="text" 
                  value={currentSlide.icon || ''}
                  onChange={(e) => handleSlideChange('icon', e.target.value)}
                  className="w-full bg-gray-800 border border-gray-600 rounded p-2 text-white focus:border-blue-500 outline-none text-sm"
                  placeholder="Ex: Monitor, Server, Rocket"
                />
                 <a href="https://lucide.dev/icons" target="_blank" rel="noopener noreferrer" className="text-blue-400 text-xs hover:underline">Ver lista de ícones</a>
            </div>

          </div>
        )}
      </div>
      
      <div className="p-4 bg-gray-800 border-t border-gray-700 text-xs text-center text-gray-500">
        Alterações salvas automaticamente.
      </div>
    </div>
  );
};