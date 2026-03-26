import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const BackButton = () => {
  const navigate = useNavigate();
  
  return (
    <button 
      onClick={() => navigate(-1)}
      className="inline-flex items-center space-x-2 text-teal-950/40 hover:text-coral transition-all group mb-8"
    >
      <div className="w-10 h-10 rounded-2xl bg-white border border-teal-950/5 flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:border-coral/20 group-hover:bg-coral/5 transition-all">
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
      </div>
    </button>
  );
};
