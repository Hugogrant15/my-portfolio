import React, { useState } from 'react';
import { X, Send, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ContactModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // 'success' or 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // ⚠️ IMPORTANT: REPLACE WITH YOUR FORMSPREE ID ⚠️
    try {
      const response = await fetch("https://formspree.io/f/mvgnzaek", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => {
          onClose();
          setStatus(null);
        }, 3000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
    setIsSubmitting(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-0 right-0 top-0 bottom-0 m-auto w-full max-w-md h-fit z-[70] p-4"
          >
            <div className="bg-slate-900 border border-slate-700 rounded-3xl p-8 relative shadow-2xl overflow-hidden">
               {/* Close Button */}
               <button onClick={onClose} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors">
                  <X size={20} />
               </button>

               <div className="mb-6">
                 <h2 className="text-2xl font-bold text-white mb-2">Let's work together</h2>
                 <p className="text-slate-400 text-sm">Fill out the form below and I'll get back to you within 24 hours.</p>
               </div>

               {status === 'success' ? (
                 <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-teal-500/10 border border-teal-500/20 rounded-xl p-6 text-center">
                    <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Send className="text-white" size={24} />
                    </div>
                    <h3 className="text-teal-400 font-bold mb-1">Message Sent!</h3>
                    <p className="text-slate-400 text-sm">Thanks for reaching out, Ugochukwu.</p>
                 </motion.div>
               ) : (
                 <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Name</label>
                      <input 
                        type="text" 
                        required
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-teal-500 transition-colors"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Email</label>
                      <input 
                        type="email" 
                        required
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-teal-500 transition-colors"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Message</label>
                      <textarea 
                        rows="4"
                        required
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-teal-500 transition-colors resize-none"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                      />
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-white text-slate-900 font-bold py-4 rounded-xl hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <><Loader2 className="animate-spin" size={20} /> Sending...</>
                      ) : (
                        <>Send Message <Send size={18} /></>
                      )}
                    </button>
                    
                    {status === 'error' && (
                      <p className="text-red-400 text-xs text-center mt-2">Something went wrong. Please try again.</p>
                    )}
                 </form>
               )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;