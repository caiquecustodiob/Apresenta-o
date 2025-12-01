import React from 'react';
import { SlideData, SlideType, PresentationTheme } from '../types';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer
} from 'recharts';
import * as Icons from 'lucide-react';
import { motion } from 'framer-motion';

interface SlideRendererProps {
  slide: SlideData;
  theme: PresentationTheme;
}

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumSignificantDigits: 3 }).format(value);
};

export const SlideRenderer: React.FC<SlideRendererProps> = ({ slide, theme }) => {
  // Dynamic Icon
  const IconComponent = slide.icon && (Icons as any)[slide.icon] ? (Icons as any)[slide.icon] : Icons.Monitor;

  const containerVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.3 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Helper styles for dynamic theme application
  const styles = {
    primaryText: { color: theme.primaryColor },
    primaryBg: { backgroundColor: theme.primaryColor },
    secondaryText: { color: theme.secondaryColor },
    secondaryGradientText: {
        backgroundImage: `linear-gradient(to right, ${theme.primaryColor}, ${theme.secondaryColor})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        display: 'inline-block'
    },
    tertiaryBorder: { borderColor: theme.tertiaryColor },
    tertiaryBg: { backgroundColor: `${theme.tertiaryColor}AA` }, // Transparent version
    quaternaryText: { color: theme.quaternaryColor },
    quaternaryBg: { backgroundColor: theme.quaternaryColor }
  };


  const renderContent = () => {
    switch (slide.type) {
      case SlideType.MANIFESTO:
        return (
          <div className="w-full h-full absolute inset-0 flex flex-col z-50">
            {/* Full Screen Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center z-0"
              style={{ 
                backgroundImage: `url(${slide.backgroundImage || 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop'})` 
              }}
            />
            {/* Dark Mask Overlay - Using Tertiary Color (Black/Dark Grey) with Opacity */}
            <div 
              className="absolute inset-0 z-10 backdrop-blur-[2px]"
              style={{ backgroundColor: `${theme.tertiaryColor}E6` }} // ~90% opacity
            />

            {/* Content Container */}
            <div className="relative z-20 w-full h-full flex flex-col p-8 md:p-16">
              
              {/* Top Centered Logo (Override global logo) */}
              <div className="flex justify-center mb-12 min-h-[100px] items-center">
                 {theme.logoUrl ? (
                   <motion.img 
                     initial={{ opacity: 0, y: -20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 1 }}
                     src={theme.logoUrl} 
                     alt="Logo" 
                     className="h-24 md:h-32 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                   />
                 ) : (
                   <motion.h2 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-3xl font-bold tracking-[0.5em] uppercase"
                      style={{ color: theme.secondaryColor }}
                   >
                     {theme.companyName}
                   </motion.h2>
                 )}
              </div>

              {/* Split Layout */}
              <div className="flex-1 flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16 max-w-7xl mx-auto w-full">
                
                {/* Left: Title / Criteria */}
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="w-full md:w-1/3 flex flex-col justify-center md:items-end md:text-right border-b-2 md:border-b-0 md:border-r-4 pb-6 md:pb-0 pr-0 md:pr-12"
                  style={{ borderColor: theme.primaryColor }}
                >
                  <h1 className="text-4xl md:text-6xl font-black uppercase leading-tight tracking-tight" style={{ color: theme.secondaryColor }}>
                    {slide.title}
                  </h1>
                </motion.div>

                {/* Right: Content */}
                <motion.div 
                   initial={{ opacity: 0, x: 50 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: 0.8, duration: 0.8 }}
                   className="w-full md:w-2/3 flex flex-col justify-center h-full"
                >
                   {slide.content && slide.content.length > 1 ? (
                     // Values List
                     <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       {slide.content.map((item, idx) => (
                         <li key={idx} className="flex items-center gap-4 text-xl md:text-2xl font-light" style={{ color: theme.quaternaryColor }}>
                           <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: theme.primaryColor }}></span>
                           {item}
                         </li>
                       ))}
                     </ul>
                   ) : (
                     // Mission / Vision Text - NO QUOTES as requested
                     <p className="text-3xl md:text-5xl font-semibold leading-tight" style={{ color: theme.secondaryColor }}>
                        {slide.content?.[0]}
                     </p>
                   )}
                </motion.div>

              </div>
            </div>
          </div>
        );

      case SlideType.TITLE:
        return (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-8 relative z-10">
            <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="p-8 rounded-full shadow-2xl shadow-black/50 border-2"
                style={{ 
                    backgroundColor: theme.primaryColor,
                    borderColor: theme.secondaryColor
                }}
            >
                <IconComponent size={80} className="text-white" />
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold drop-shadow-lg" style={{ color: theme.secondaryColor }}>
              {slide.title}
            </h1>
            <p className="text-xl md:text-3xl font-light max-w-3xl leading-relaxed" style={{ color: theme.quaternaryColor }}>
              {slide.subtitle}
            </p>
            <div className="mt-8 grid gap-4 text-left p-8 rounded-xl backdrop-blur-md border" style={{ backgroundColor: `${theme.tertiaryColor}80`, borderColor: `${theme.secondaryColor}20` }}>
                {slide.content?.map((line, idx) => (
                    <p key={idx} className="text-lg flex items-center gap-3" style={{ color: theme.secondaryColor }}>
                        <Icons.CheckCircle size={20} style={{ color: theme.primaryColor }} className="shrink-0" /> {line}
                    </p>
                ))}
            </div>
          </div>
        );

      case SlideType.TECH_STACK:
        return (
            <div className="flex flex-col h-full items-center justify-center">
                <div className="mb-12 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-3 flex items-center justify-center gap-4" style={{ color: theme.secondaryColor }}>
                         <IconComponent style={styles.primaryText} size={40} /> {slide.title}
                    </h2>
                    <p className="text-xl" style={styles.quaternaryText}>{slide.subtitle}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full px-4">
                    {slide.techItems?.map((item, idx) => {
                         const ItemIcon = (Icons as any)[item.icon] || Icons.Code;
                         return (
                            <motion.div
                                key={idx}
                                variants={itemVariants}
                                initial="hidden"
                                animate="visible"
                                transition={{ delay: idx * 0.1 }}
                                className="backdrop-blur border p-6 rounded-xl hover:bg-white/5 transition-all hover:scale-105 group"
                                style={{ 
                                    backgroundColor: `${theme.tertiaryColor}60`,
                                    borderColor: `${theme.primaryColor}40`
                                }}
                            >
                                <div className={`p-3 rounded-lg w-fit mb-4 bg-white/5`}>
                                     <ItemIcon size={32} style={{ color: theme.primaryColor }} />
                                </div>
                                <h3 className="text-2xl font-bold mb-2 group-hover:text-opacity-80 transition-colors" style={styles.secondaryText}>{item.name}</h3>
                                <p className="leading-relaxed" style={styles.quaternaryText}>{item.description}</p>
                            </motion.div>
                         )
                    })}
                </div>
            </div>
        );

      case SlideType.SHOWCASE:
        return (
            <div className="flex flex-col md:flex-row h-full gap-8 items-center justify-center p-4 max-w-7xl mx-auto">
                {/* Left: Text Content */}
                <div className="flex-1 space-y-8">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded bg-white/5">
                                <IconComponent size={28} style={styles.primaryText} />
                            </div>
                            <span className="text-sm font-mono tracking-widest uppercase" style={styles.quaternaryText}>Sistema Interno</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4" style={{ color: theme.secondaryColor }}>
                            {slide.title}
                        </h2>
                        <p className="text-xl leading-relaxed" style={styles.quaternaryText}>
                            {slide.subtitle}
                        </p>
                    </div>

                    <div className="space-y-4">
                        {slide.content?.[0] && (
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="p-5 rounded-lg border-l-4 backdrop-blur-sm"
                                style={{ 
                                    backgroundColor: `${theme.tertiaryColor}60`, 
                                    borderColor: theme.quaternaryColor 
                                }}
                            >
                                <h3 className="font-bold mb-2 uppercase text-xs tracking-wider flex items-center gap-2" style={{ color: theme.secondaryColor }}>
                                    <Icons.Target size={14} style={{ color: theme.primaryColor }} /> Objetivo & Desafio
                                </h3>
                                <p className="text-lg leading-snug" style={{ color: theme.secondaryColor }}>{slide.content[0]}</p>
                            </motion.div>
                        )}

                        {slide.content?.[1] && (
                            <motion.div 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                                className="p-5 rounded-lg border-l-4 backdrop-blur-sm"
                                style={{ 
                                    backgroundColor: `${theme.tertiaryColor}60`, 
                                    borderColor: theme.primaryColor 
                                }}
                            >
                                <h3 className="font-bold mb-2 uppercase text-xs tracking-wider flex items-center gap-2" style={{ color: theme.secondaryColor }}>
                                    <Icons.Zap size={14} style={{ color: theme.primaryColor }} /> Impacto Real
                                </h3>
                                <p className="text-lg leading-snug" style={{ color: theme.secondaryColor }}>{slide.content[1]}</p>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Right: Image Placeholder */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="flex-1 w-full h-[300px] md:h-[500px] rounded-2xl overflow-hidden border-2 shadow-2xl relative group"
                    style={{ 
                        borderColor: `${theme.primaryColor}40`,
                        backgroundColor: `${theme.tertiaryColor}80`
                    }}
                >
                    {slide.backgroundImage ? (
                        <img 
                            src={slide.backgroundImage} 
                            alt={`Interface do ${slide.title}`} 
                            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-4 bg-black/20">
                            <Icons.Image size={64} style={{ opacity: 0.2 }} />
                            <p className="text-sm uppercase tracking-wider font-semibold opacity-50">Imagem da Interface</p>
                            <p className="text-xs text-gray-600">Use o editor para adicionar um print</p>
                        </div>
                    )}
                    
                    {/* Glossy Overlay Effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none"></div>
                </motion.div>
            </div>
        );

      case SlideType.COMPARISON:
        return (
          <div className="flex flex-col h-full">
             <div className="mb-6">
                <h2 className="text-4xl font-bold mb-2 flex items-center gap-3" style={styles.secondaryText}>
                    <IconComponent style={styles.primaryText} /> {slide.title}
                </h2>
                <p className="text-xl" style={styles.quaternaryText}>{slide.subtitle}</p>
             </div>
             
             <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="p-6 rounded-xl border h-full overflow-y-auto" style={{ backgroundColor: `${theme.tertiaryColor}60`, borderColor: `${theme.primaryColor}30` }}>
                    <ul className="space-y-4">
                        {slide.content?.map((item, idx) => (
                            <motion.li 
                                key={idx}
                                variants={itemVariants}
                                initial="hidden"
                                animate="visible"
                                transition={{ delay: idx * 0.1 }}
                                className="flex items-start gap-3 text-lg"
                                style={{ color: theme.quaternaryColor }}
                            >
                                <span className="p-1 rounded mt-1 bg-white/10">
                                    <Icons.X size={14} style={{ color: theme.primaryColor }} />
                                </span>
                                {item}
                            </motion.li>
                        ))}
                    </ul>
                    {slide.highlight && (
                        <div className="mt-6 p-4 rounded-lg text-center border" style={{ backgroundColor: `${theme.primaryColor}20`, borderColor: theme.primaryColor }}>
                            <p className="font-bold text-xl" style={{ color: theme.secondaryColor }}>{slide.highlight}</p>
                        </div>
                    )}
                </div>

                <div className="h-[300px] md:h-[400px] w-full rounded-xl p-4 border" style={{ backgroundColor: `${theme.tertiaryColor}80`, borderColor: `${theme.primaryColor}20` }}>
                    {slide.data && (
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={slide.data}
                                layout="vertical"
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis type="number" stroke={theme.quaternaryColor} tickFormatter={(val) => `R$${val/1000}k`} />
                                <YAxis dataKey="name" type="category" stroke={theme.quaternaryColor} width={100} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: theme.tertiaryColor, border: `1px solid ${theme.primaryColor}`, color: theme.secondaryColor }}
                                    formatter={(value: number) => formatCurrency(value)}
                                />
                                <Legend />
                                <Bar dataKey="max" name="Custo Máx (Anual)" fill={theme.quaternaryColor} radius={[0, 4, 4, 0]} />
                                <Bar dataKey="value" name="Custo Estimado" fill={theme.primaryColor} radius={[0, 4, 4, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    )}
                </div>
             </div>
          </div>
        );

      case SlideType.BIG_NUMBER:
        return (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-8">
                <h2 className="text-3xl font-semibold uppercase tracking-widest border-b-2 pb-2" style={{ borderColor: theme.primaryColor, color: theme.quaternaryColor }}>{slide.title}</h2>
                
                <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 100 }}
                    className="relative"
                >
                    <div className="absolute inset-0 blur-[100px] opacity-30 rounded-full" style={styles.primaryBg}></div>
                    
                    <h3 className="text-6xl md:text-9xl font-black relative z-10 drop-shadow-2xl" style={{ color: theme.secondaryColor }}>
                        {slide.highlight}
                    </h3>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 max-w-4xl mx-auto">
                    {slide.content?.map((item, idx) => (
                        <div key={idx} className="p-6 rounded-lg border backdrop-blur-sm" style={{ backgroundColor: `${theme.tertiaryColor}60`, borderColor: `${theme.primaryColor}40` }}>
                             <p className="text-xl font-medium" style={styles.secondaryText}>{item}</p>
                        </div>
                    ))}
                </div>
            </div>
        );

      default: // LIST, PROCESS, QUOTE
        return (
          <div className="flex flex-col h-full max-w-6xl mx-auto w-full">
            <div className="mb-10 border-b pb-4" style={{ borderColor: `${theme.primaryColor}40` }}>
                 <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-white/5">
                        <IconComponent size={32} style={styles.primaryText} />
                    </div>
                    <div>
                        <h2 className="text-4xl font-bold" style={styles.secondaryText}>{slide.title}</h2>
                        {slide.subtitle && <p className="text-xl mt-1" style={styles.quaternaryText}>{slide.subtitle}</p>}
                    </div>
                 </div>
            </div>
            
            <div className="flex-1 grid grid-cols-1 items-center">
                 {slide.type === SlideType.QUOTE ? (
                      <blockquote className="text-4xl md:text-5xl font-serif italic text-center leading-snug p-12 border-l-8 bg-gradient-to-r from-white/5 to-transparent rounded-r-xl" style={{ borderColor: theme.primaryColor, color: theme.secondaryColor }}>
                        {slide.highlight}
                        <footer className="text-lg mt-8 font-sans not-italic font-normal flex items-center justify-center gap-2">
                             <span className="w-8 h-px bg-gray-500"></span>
                             <span style={styles.quaternaryText}>Caique Custodio</span>
                             <span className="w-8 h-px bg-gray-500"></span>
                        </footer>
                      </blockquote>
                 ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            {slide.content?.map((item, idx) => (
                                <motion.div 
                                    key={idx}
                                    variants={itemVariants}
                                    initial="hidden"
                                    animate="visible"
                                    transition={{ delay: idx * 0.15 }}
                                    className="flex items-start gap-4 p-4 rounded-lg hover:bg-white/5 transition-colors border border-transparent"
                                >
                                    <div className="mt-1 rounded-full p-1.5 shrink-0 shadow-lg" style={styles.primaryBg}>
                                        <Icons.Check size={12} className="text-white" />
                                    </div>
                                    <p className="text-xl leading-relaxed" style={styles.secondaryText}>{item}</p>
                                </motion.div>
                            ))}
                        </div>
                        {/* Right side visual decoration */}
                        <div className="hidden md:flex items-center justify-center">
                             <div className="relative w-full aspect-square max-w-md">
                                <div className="absolute inset-0 border-2 border-dashed rounded-full animate-spin-slow opacity-20" style={{ borderColor: theme.primaryColor }}></div>
                                <div className="absolute inset-4 border rounded-full opacity-40" style={{ borderColor: theme.primaryColor }}></div>
                                <div className="absolute inset-8 border rounded-full opacity-60" style={{ borderColor: theme.primaryColor }}></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                     <IconComponent size={120} style={{ color: theme.primaryColor, opacity: 0.8 }} />
                                </div>
                             </div>
                        </div>
                    </div>
                 )}
            </div>
          </div>
        );
    }
  };

  return (
    <motion.div
        key={slide.id}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={`w-full h-full flex flex-col box-border relative ${slide.type === SlideType.MANIFESTO ? 'p-0' : 'p-6 md:p-12'}`}
    >
        {/* Company Logo Absolute Positioned (Global for non-manifesto slides) */}
        {theme.logoUrl && slide.type !== SlideType.MANIFESTO && (
            <div className="absolute top-6 right-6 z-20 opacity-80 hover:opacity-100 transition-opacity bg-white/5 p-2 rounded backdrop-blur-sm border border-white/10">
                <img src={theme.logoUrl} alt="Logo" className="h-12 w-auto object-contain" />
            </div>
        )}

        {renderContent()}
    </motion.div>
  );
};