import React from 'react';
import { useForm } from 'react-hook-form';
import confetti from 'canvas-confetti';

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL || ''}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      confetti({ particleCount: 120, spread: 70, origin: { y: 0.7 } });
      reset();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section className="relative min-h-screen bg-black text-white py-20">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.08),transparent_60%)]" />
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center">Let's Build Something Extraordinary</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-white/70">Name</label>
                <input className="mt-1 w-full rounded-lg bg-black/40 border border-white/10 p-3 outline-none focus:border-cyan-400 focus:shadow-[0_0_0_3px_rgba(0,240,255,0.2)]" {...register('name', { required: true })} />
                {errors.name && <p className="text-xs text-red-400 mt-1">Required</p>}
              </div>
              <div>
                <label className="text-sm text-white/70">Email</label>
                <input type="email" className="mt-1 w-full rounded-lg bg-black/40 border border-white/10 p-3 outline-none focus:border-cyan-400 focus:shadow-[0_0_0_3px_rgba(0,240,255,0.2)]" {...register('email', { required: true })} />
                {errors.email && <p className="text-xs text-red-400 mt-1">Required</p>}
              </div>
              <div>
                <label className="text-sm text-white/70">Company</label>
                <input className="mt-1 w-full rounded-lg bg-black/40 border border-white/10 p-3 outline-none focus:border-cyan-400 focus:shadow-[0_0_0_3px_rgba(0,240,255,0.2)]" {...register('company')} />
              </div>
              <div>
                <label className="text-sm text-white/70">Project Type</label>
                <select className="mt-1 w-full rounded-lg bg-black/40 border border-white/10 p-3 outline-none focus:border-cyan-400 focus:shadow-[0_0_0_3px_rgba(0,240,255,0.2)]" {...register('projectType', { required: true })}>
                  <option value="DApp">DApp</option>
                  <option value="App">App</option>
                  <option value="Tokenization">Tokenization</option>
                  <option value="AI">AI</option>
                  <option value="Other">Other</option>
                </select>
                {errors.projectType && <p className="text-xs text-red-400 mt-1">Required</p>}
              </div>
              <div className="md:col-span-2">
                <label className="text-sm text-white/70">Message</label>
                <textarea rows={5} className="mt-1 w-full rounded-lg bg-black/40 border border-white/10 p-3 outline-none focus:border-cyan-400 focus:shadow-[0_0_0_3px_rgba(0,240,255,0.2)]" {...register('message', { required: true })} />
                {errors.message && <p className="text-xs text-red-400 mt-1">Required</p>}
              </div>
            </div>
            <div className="mt-6 flex justify-center">
              <button disabled={isSubmitting} className="relative inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-semibold shadow-[0_10px_30px_rgba(0,240,255,0.25)] hover:brightness-110 transition">
                <span className="relative z-10">Send Message</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
