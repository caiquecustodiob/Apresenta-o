import React from 'react';
import { SlideData, SlideType } from '../types';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import * as Icons from 'lucide-react';
import { motion } from 'framer-motion';

interface SlideRendererProps {
  slide: SlideData;
}

const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumSignificantDigits: 3 }).format(value);
};

export const SlideRenderer: React.FC<SlideRendererProps> = ({ slide }) => {
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

  const renderContent = () => {
    switch (slide.type) {
      case SlideType.TITLE:
        return (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-8 relative z-10">
            <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="bg-blue-600 p-6 rounded-full shadow-2xl shadow-blue-500/30"
            >
                <IconComponent size={64} className="text-white" />
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
              {slide.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl leading-relaxed">
              {slide.subtitle}
            </p>
            <div className="mt-8 grid gap-4 text-left bg-black/40 p-8 rounded-xl backdrop-blur-sm border border-white/10">
                {slide.content?.map((line, idx) => (
                    <p key={idx} className="text-lg text-gray-300 flex items-center gap-3">
                        <Icons.CheckCircle size={16} className="text-green-400 shrink-0" /> {line}
                    </p>
                ))}
            </div>
          </div>
        );

      case SlideType.TECH_STACK:
        return (
            <div className="flex flex-col h-full items-center justify-center">
                <div className="mb-12 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-3 flex items-center justify-center gap-4">
                         <IconComponent className="text-blue-400" size={40} /> {slide.title}
                    </h2>
                    <p className="text-xl text-gray-400">{slide.subtitle}</p>
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
                                className="bg-gray-800/40 backdrop-blur border border-gray-700 p-6 rounded-xl hover:bg-gray-800 transition-all hover:scale-105 group"
                            >
                                <div className={`p-3 rounded-lg w-fit mb-4 ${item.color.replace('text-', 'bg-').replace('500', '500/10').replace('400', '400/10')}`}>
                                     <ItemIcon size={32} className={item.color} />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">{item.name}</h3>
                                <p className="text-gray-400 leading-relaxed">{item.description}</p>
                            </motion.div>
                         )
                    })}
                </div>
            </div>
        );

      case SlideType.COMPARISON:
        return (
          <div className="flex flex-col h-full">
             <div className="mb-6">
                <h2 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
                    <IconComponent className="text-blue-400" /> {slide.title}
                </h2>
                <p className="text-xl text-gray-400">{slide.subtitle}</p>
             </div>
             
             <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 h-full overflow-y-auto">
                    <ul className="space-y-4">
                        {slide.content?.map((item, idx) => (
                            <motion.li 
                                key={idx}
                                variants={itemVariants}
                                initial="hidden"
                                animate="visible"
                                transition={{ delay: idx * 0.1 }}
                                className="flex items-start gap-3 text-lg text-gray-300"
                            >
                                <span className="bg-red-500/20 text-red-400 p-1 rounded mt-1">
                                    <Icons.X size={14} />
                                </span>
                                {item}
                            </motion.li>
                        ))}
                    </ul>
                    {slide.highlight && (
                        <div className="mt-6 p-4 bg-red-900/30 border border-red-500/30 rounded-lg text-center">
                            <p className="text-red-300 font-bold text-xl">{slide.highlight}</p>
                        </div>
                    )}
                </div>

                <div className="h-[300px] md:h-[400px] w-full bg-gray-900/50 rounded-xl p-4">
                    {slide.data && (
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={slide.data}
                                layout="vertical"
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis type="number" stroke="#9CA3AF" tickFormatter={(val) => `R$${val/1000}k`} />
                                <YAxis dataKey="name" type="category" stroke="#9CA3AF" width={100} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#1F2937', border: 'none', color: '#fff' }}
                                    formatter={(value: number) => formatCurrency(value)}
                                />
                                <Legend />
                                <Bar dataKey="max" name="Custo Máx (Anual)" fill="#EF4444" radius={[0, 4, 4, 0]} />
                                <Bar dataKey="value" name="Custo Estimado" fill="#EF4444" radius={[0, 4, 4, 0]} />
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
                <h2 className="text-3xl font-semibold text-gray-300 uppercase tracking-widest">{slide.title}</h2>
                
                <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 100 }}
                    className="relative"
                >
                    <div className="absolute inset-0 bg-green-500 blur-[80px] opacity-20 rounded-full"></div>
                    <h3 className="text-6xl md:text-9xl font-black text-white relative z-10 drop-shadow-2xl">
                        {slide.highlight}
                    </h3>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 max-w-4xl mx-auto">
                    {slide.content?.map((item, idx) => (
                        <div key={idx} className="bg-gray-800/40 p-4 rounded-lg border border-gray-700">
                             <p className="text-xl text-green-300 font-medium">{item}</p>
                        </div>
                    ))}
                </div>
            </div>
        );

      default: // LIST, PROCESS, QUOTE
        return (
          <div className="flex flex-col h-full max-w-6xl mx-auto w-full">
            <div className="mb-10 border-b border-gray-700 pb-4">
                 <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-900/30 rounded-lg">
                        <IconComponent size={32} className="text-blue-400" />
                    </div>
                    <div>
                        <h2 className="text-4xl font-bold text-white">{slide.title}</h2>
                        {slide.subtitle && <p className="text-xl text-blue-200/80 mt-1">{slide.subtitle}</p>}
                    </div>
                 </div>
            </div>
            
            <div className="flex-1 grid grid-cols-1 items-center">
                 {slide.type === SlideType.QUOTE ? (
                      <blockquote className="text-4xl md:text-5xl font-serif italic text-center text-gray-200 leading-snug p-8 border-l-4 border-blue-500 bg-gradient-to-r from-gray-800/30 to-transparent">
                        {slide.highlight}
                        <footer className="text-lg text-gray-400 mt-8 font-sans not-italic font-normal">
                             — Caique Custodio
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
                                    className="flex items-start gap-4 p-4 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
                                >
                                    <div className="mt-1 bg-blue-500 rounded-full p-1.5 shrink-0">
                                        <Icons.Check size={12} className="text-white" />
                                    </div>
                                    <p className="text-xl text-gray-200 leading-relaxed">{item}</p>
                                </motion.div>
                            ))}
                        </div>
                        {/* Right side visual decoration */}
                        <div className="hidden md:flex items-center justify-center">
                             <div className="relative w-full aspect-square max-w-md">
                                <div className="absolute inset-0 border-2 border-dashed border-gray-700 rounded-full animate-spin-slow"></div>
                                <div className="absolute inset-4 border border-blue-500/20 rounded-full"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                     <IconComponent size={120} className="text-gray-700 opacity-50" />
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
        className="w-full h-full flex flex-col p-6 md:p-12 box-border"
    >
        {renderContent()}
    </motion.div>
  );
};