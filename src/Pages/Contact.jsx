import React, { useState } from 'react';
import { Check, UploadCloud } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    model: 'Version V0', // Default selected
    queryType: 'Pre-Order / Purchase', // Default selected
  });

  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // success or error

  const models = ['Version V0', 'Version X1', 'Version City Pro', 'Version Speedster', 'Other / Parts'];
  const queryTypes = ['Pre-Order / Purchase', 'Book a Test Ride', 'Technical Support', 'Custom Tuning'];

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = 'Invalid email address.';
    }
    if (!formData.message.trim()) newErrors.message = 'Details are required.';
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: '',
    }));
  };

  const selectModel = (model) => {
    setFormData((prev) => ({ ...prev, model }));
  };

  const selectQueryType = (queryType) => {
    setFormData((prev) => ({ ...prev, queryType }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate async submission e.g., sending data to backend API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        message: '',
        model: 'Version V0',
        queryType: 'Pre-Order / Purchase',
      });
      setFile(null);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-white pt-32 pb-24 px-4 flex items-center justify-center relative overflow-hidden select-none">
      
      {/* Decorative ambient glowing circles - customized to gorgeous blue shades instead of green */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-900/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[150px] pointer-events-none" />

      {/* The main contact card */}
      <div
        className="w-full max-w-6xl rounded-3xl p-8 md:p-14 relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16"
        style={{
          background: 'linear-gradient(145deg, #10121a 0%, #0c0d12 100%)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          boxShadow: '0 24px 64px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.03)',
        }}
      >
        {/* Glow accent overlay inside the card (bottom-left corner) - vibrant blue shade */}
        <div className="absolute bottom-[-150px] left-[-150px] w-[350px] h-[350px] rounded-full bg-blue-500/25 blur-[90px] pointer-events-none" />

        {/* LEFT COLUMN */}
        <div className="lg:col-span-5 flex flex-col justify-between relative z-10 space-y-12">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.15]">
              Tell us about <br />
              your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 font-bold">vision</span>
            </h1>

            {/* Checklist with premium blue accent check icons */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <Check className="w-3 h-3" />
                </span>
                <span className="text-gray-300 text-sm font-medium">We will respond to you within 12 hours</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <Check className="w-3 h-3" />
                </span>
                <span className="text-gray-300 text-sm font-medium">We'll arrange a doorstep test ride</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <Check className="w-3 h-3" />
                </span>
                <span className="text-gray-300 text-sm font-medium">Access to dedicated specialists</span>
              </div>
            </div>
          </div>

          {/* Bottom Info & Contact Method */}
          <div className="space-y-6">
            <div>
              <a
                href="mailto:hello@vishionev.com"
                className="text-gray-300 hover:text-white text-lg font-medium transition-all relative group underline decoration-blue-500/40 hover:decoration-blue-500 decoration-2 underline-offset-4"
              >
                hello@vishionev.com
              </a>
            </div>

            <div className="space-y-3">
              <p className="text-gray-400 text-sm leading-relaxed max-w-[280px]">
                Always busy and want to book an exact time to call?
              </p>
              <button
                type="button"
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-xs font-semibold text-white transition-all bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 active:scale-95 cursor-pointer"
              >
                Book a free call
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-7 relative z-10">
          <form className="space-y-8" onSubmit={handleSubmit} noValidate>
            
            {/* Scooter Model selector */}
            <div className="space-y-3">
              <span className="block text-xs font-semibold uppercase tracking-wider text-gray-400">
                Scooter Model
              </span>
              <div className="flex flex-wrap gap-2">
                {models.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => selectModel(m)}
                    className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 cursor-pointer ${
                      formData.model === m
                        ? 'bg-blue-600/15 border-blue-500 text-blue-300 shadow-[0_0_12px_rgba(59,130,246,0.15)]'
                        : 'border-white/5 bg-white/[0.02] text-gray-400 hover:text-white hover:bg-white/[0.05]'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Inquiry Type selector */}
            <div className="space-y-3">
              <span className="block text-xs font-semibold uppercase tracking-wider text-gray-400">
                Inquiry Type
              </span>
              <div className="flex flex-wrap gap-2">
                {queryTypes.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => selectQueryType(q)}
                    className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 cursor-pointer ${
                      formData.queryType === q
                        ? 'bg-blue-600/15 border-blue-500 text-blue-300 shadow-[0_0_12px_rgba(59,130,246,0.15)]'
                        : 'border-white/5 bg-white/[0.02] text-gray-400 hover:text-white hover:bg-white/[0.05]'
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="relative group">
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Full name*"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full bg-transparent border-b py-2.5 text-sm transition-all focus:outline-none ${
                    errors.name
                      ? 'border-red-500 text-red-200'
                      : 'border-white/10 text-white focus:border-blue-500'
                  }`}
                />
                {errors.name && (
                  <span className="text-[10px] text-red-500 absolute bottom-[-18px] left-0">
                    {errors.name}
                  </span>
                )}
              </div>

              {/* Email */}
              <div className="relative group">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email*"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-transparent border-b py-2.5 text-sm transition-all focus:outline-none ${
                    errors.email
                      ? 'border-red-500 text-red-200'
                      : 'border-white/10 text-white focus:border-blue-500'
                  }`}
                />
                {errors.email && (
                  <span className="text-[10px] text-red-500 absolute bottom-[-16px] left-0">
                    {errors.email}
                  </span>
                )}
              </div>
            </div>

            {/* Query details / Message */}
            <div className="relative group">
              <textarea
                name="message"
                required
                rows={3}
                placeholder="Tell us more about your query (e.g. delivery timeline, customization requests, etc.)*"
                value={formData.message}
                onChange={handleChange}
                className={`w-full bg-transparent border-b py-2.5 text-sm transition-all focus:outline-none resize-none ${
                  errors.message
                    ? 'border-red-500 text-red-200'
                    : 'border-white/10 text-white focus:border-blue-500'
                }`}
              />
              {errors.message && (
                <span className="text-[10px] text-red-500 absolute bottom-[-16px] left-0">
                  {errors.message}
                </span>
              )}
            </div>

            {/* File upload box */}
            <div className="space-y-2">
              <span className="block text-xs font-semibold uppercase tracking-wider text-gray-400">
                Attach a file (optional)
              </span>
              <label
                className="flex flex-col items-center justify-center border border-dashed border-white/10 hover:border-blue-500/50 rounded-2xl p-6 transition-all duration-300 cursor-pointer bg-white/[0.01] hover:bg-blue-500/[0.01]"
              >
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <UploadCloud className="w-6 h-6 text-gray-400 mb-2" />
                <span className="text-xs text-gray-300 font-medium">
                  {file ? file.name : 'Choose a file or drag and drop here'}
                </span>
              </label>
            </div>

            {/* Submit inquiry */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-black py-3.5 rounded-full font-semibold transition-all hover:bg-gray-100 hover:scale-[1.01] active:scale-[0.99] flex justify-center items-center shadow-lg hover:shadow-white/5 text-sm disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? 'Submitting inquiry...' : 'Submit inquiry'}
              </button>
            </div>

            {/* Status alerts */}
            {submitStatus === 'success' && (
              <p className="text-center text-xs text-blue-400 font-semibold mt-2 animate-fade-in" role="alert">
                Inquiry submitted successfully! We will get back to you shortly.
              </p>
            )}
            {submitStatus === 'error' && (
              <p className="text-center text-xs text-red-400 font-semibold mt-2 animate-fade-in" role="alert">
                Oops! Something went wrong. Please try again.
              </p>
            )}

          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
