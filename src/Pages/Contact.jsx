import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // success or error

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
    if (!formData.message.trim()) newErrors.message = 'Message is required.';
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
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold text-gray-900 mb-10 text-center">
        Contact <span className="text-blue-600 font-bold">Us</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Our Office</h3>
            <p className="text-gray-600">123 Green Street, New Delhi, India</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Email</h3>
            <p className="text-gray-600">support@version.com</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Phone</h3>
            <p className="text-gray-600">+91 98765 43210</p>
          </div>
        </div>

        {/* Contact Form */}
        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
          <fieldset>
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              aria-invalid={errors.name ? 'true' : 'false'}
              aria-describedby={errors.name ? 'name-error' : undefined}
              required
            />
            {errors.name && (
              <p id="name-error" className="text-red-600 mt-1 text-sm">
                {errors.name}
              </p>
            )}
          </fieldset>

          <fieldset>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Your email"
              value={formData.email}
              onChange={handleChange}
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : undefined}
              required
            />
            {errors.email && (
              <p id="email-error" className="text-red-600 mt-1 text-sm">
                {errors.email}
              </p>
            )}
          </fieldset>

          <fieldset>
            <label
              htmlFor="message"
              className="block text-gray-700 font-medium mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.message ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Your message"
              value={formData.message}
              onChange={handleChange}
              aria-invalid={errors.message ? 'true' : 'false'}
              aria-describedby={errors.message ? 'message-error' : undefined}
              required
            ></textarea>
            {errors.message && (
              <p id="message-error" className="text-red-600 mt-1 text-sm">
                {errors.message}
              </p>
            )}
          </fieldset>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition flex justify-center items-center ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>

          {submitStatus === 'success' && (
            <p className="text-green-600 font-medium mt-2" role="alert">
              Message sent successfully!
            </p>
          )}
          {submitStatus === 'error' && (
            <p className="text-red-600 font-medium mt-2" role="alert">
              Oops! Something went wrong. Please try again.
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contact;
