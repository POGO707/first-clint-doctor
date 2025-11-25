import React from 'react';
import { IMAGES } from '../constants';

const Viewer360 = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-md p-4">
      <div className="relative w-full max-w-6xl h-[80vh] bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
        {/* Controls Overlay */}
        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start z-10 bg-gradient-to-b from-black/80 to-transparent">
          <div>
            <h3 className="text-white font-bold text-xl">Virtual Clinic Tour</h3>
            <p className="text-gray-300 text-sm">Emergency Department • Room 1</p>
          </div>
          <button 
            onClick={onClose}
            className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition backdrop-blur-sm text-2xl"
          >
            ✕
          </button>
        </div>
        
        {/* Main Viewport */}
        <div className="w-full h-full relative cursor-move group overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[30s] ease-linear hover:scale-110"
            style={{ backgroundImage: `url(${IMAGES.clinic})`, transformOrigin: 'center center' }}
          />
          
          {/* Interaction Hint */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur text-white px-6 py-3 rounded-full flex items-center gap-3 pointer-events-none">
            <span className="font-medium text-sm">Drag to look around</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Viewer360;
