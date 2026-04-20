import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send, CheckCircle2 } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    // Simulate async submission
    await new Promise((r) => setTimeout(r, 1000));
    console.log('Form submitted:', data);
    setSubmitted(true);
    reset();
  };

  return (
    <>
      <Helmet>
        <title>Contact | Make My 360 Book a Virtual Tour in Hyderabad</title>
        <meta name="description" content="Book a 360° virtual tour with Make My 360. Serving businesses across Hyderabad — Banjara Hills, Gachibowli, Kondapur, Secunderabad, Hitech City and more." />
      </Helmet>

      <main role="main" className="pt-24">
        {/* Banner */}
        <section className="py-20 bg-[#06070A] border-b border-[rgba(0,224,255,0.08)]">
          <div className="section-container text-center">
            <SectionHeading
              label="Get In Touch"
              title="Book Your Virtual Tour"
              subtitle="We'll reach out within 24 hours to schedule your consultation no commitment required."
              centered
            />
          </div>
        </section>

        {/* Main content */}
        <section className="py-20 bg-[#0E1117]">
          <div className="section-container">
            <div className="grid lg:grid-cols-[38%_62%] gap-16">
              {/* Contact Info */}
              <div>
                <h2 className="font-grotesk font-bold text-white text-xl mb-8">Reach Us Directly</h2>

                <div className="space-y-6 mb-10">
                  {[
                    { icon: Phone, label: 'WhatsApp', value: '+91 98765 43210', href: 'https://wa.me/919876543210', color: '#25D366' },
                    { icon: Mail, label: 'Email', value: 'hello@makemy360.in', href: 'mailto:hello@makemy360.in', color: '#00E0FF' },
                    { icon: MapPin, label: 'Location', value: 'Hyderabad, Telangana, India', href: 'https://maps.google.com', color: '#00E0FF' },
                  ].map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={i}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-4 bg-[#11141B] border border-[rgba(0,224,255,0.1)] rounded-xl hover:border-[rgba(0,224,255,0.3)] transition-all duration-200 group"
                        aria-label={`${item.label}: ${item.value}`}
                      >
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: `${item.color}10`, border: `1px solid ${item.color}25` }}
                        >
                          <Icon size={18} style={{ color: item.color }} aria-hidden="true" />
                        </div>
                        <div>
                          <div className="text-[#9AA4B2] font-dm text-xs mb-0.5">{item.label}</div>
                          <div className="text-white font-dm text-sm font-medium group-hover:text-[#00E0FF] transition-colors">
                            {item.value}
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>

                <div className="bg-[#11141B] border border-[rgba(0,224,255,0.1)] rounded-2xl p-6">
                  <h3 className="font-grotesk font-bold text-white text-base mb-2">Areas We Cover</h3>
                  <p className="text-[#9AA4B2] font-dm text-sm leading-relaxed">
                    Banjara Hills · Jubilee Hills · Gachibowli · Kondapur · Miyapur · Secunderabad · Kukatpally · Ameerpet · Hitech City · Madhapur · and all of Greater Hyderabad.
                  </p>
                </div>
              </div>

              {/* Form */}
              <div className="bg-[#11141B] border border-[rgba(0,224,255,0.12)] rounded-2xl p-8">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center h-full text-center py-10 gap-4"
                  >
                    <CheckCircle2 size={52} className="text-[#00D47E]" aria-hidden="true" />
                    <h3 className="font-grotesk font-bold text-white text-2xl">Message Received!</h3>
                    <p className="text-[#9AA4B2] font-dm">
                      We'll reach out within 24 hours to schedule your free demo.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="btn-secondary mt-4"
                      aria-label="Send another message"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Contact form">
                    <h3 className="font-grotesk font-bold text-white text-xl mb-6">Tell Us About Your Business</h3>

                    <div className="grid sm:grid-cols-2 gap-5 mb-5">
                      {/* Name */}
                      <div>
                        <label htmlFor="name" className="block font-dm text-sm text-[#9AA4B2] mb-2">
                          Your Name <span aria-hidden="true" className="text-[#00E0FF]">*</span>
                        </label>
                        <input
                          id="name"
                          type="text"
                          autoComplete="name"
                          aria-required="true"
                          aria-invalid={!!errors.name}
                          aria-describedby={errors.name ? 'name-error' : undefined}
                          {...register('name', { required: 'Name is required' })}
                          className="w-full px-4 py-3 bg-[#06070A] border rounded-lg font-dm text-white text-sm placeholder-[#9AA4B2] transition-colors"
                          style={{ borderColor: errors.name ? '#FF4444' : 'rgba(0,224,255,0.15)' }}
                          placeholder="Ravi Kumar"
                        />
                        {errors.name && (
                          <p id="name-error" role="alert" className="text-red-400 text-xs mt-1 font-dm">
                            {errors.name.message}
                          </p>
                        )}
                      </div>

                      {/* Phone */}
                      <div>
                        <label htmlFor="phone" className="block font-dm text-sm text-[#9AA4B2] mb-2">
                          WhatsApp / Phone <span aria-hidden="true" className="text-[#00E0FF]">*</span>
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          autoComplete="tel"
                          aria-required="true"
                          aria-invalid={!!errors.phone}
                          aria-describedby={errors.phone ? 'phone-error' : undefined}
                          {...register('phone', {
                            required: 'Phone number is required',
                            pattern: { value: /^[0-9+\s-]{10,}$/, message: 'Enter a valid phone number' },
                          })}
                          className="w-full px-4 py-3 bg-[#06070A] border rounded-lg font-dm text-white text-sm placeholder-[#9AA4B2] transition-colors"
                          style={{ borderColor: errors.phone ? '#FF4444' : 'rgba(0,224,255,0.15)' }}
                          placeholder="+91 98765 43210"
                        />
                        {errors.phone && (
                          <p id="phone-error" role="alert" className="text-red-400 text-xs mt-1 font-dm">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Business Type */}
                    <div className="mb-5">
                      <label htmlFor="business" className="block font-dm text-sm text-[#9AA4B2] mb-2">
                        Business Type
                      </label>
                      <select
                        id="business"
                        {...register('business')}
                        className="w-full px-4 py-3 bg-[#06070A] border border-[rgba(0,224,255,0.15)] rounded-lg font-dm text-white text-sm transition-colors appearance-none"
                        aria-label="Select your business type"
                      >
                        <option value="">Select your business type...</option>
                        <option value="real-estate">Real Estate</option>
                        <option value="jewellery">Jewellery Store</option>
                        <option value="hotel">Hotel / Resort</option>
                        <option value="restaurant">Restaurant</option>
                        <option value="retail">Retail Store</option>
                        <option value="showroom">Showroom</option>
                        <option value="gym">Gym / Fitness Center</option>
                        <option value="school">School / College</option>
                        <option value="hospital">Hospital / Clinic</option>
                        <option value="office">Office / Co-work</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    {/* Location */}
                    <div className="mb-5">
                      <label htmlFor="location" className="block font-dm text-sm text-[#9AA4B2] mb-2">
                        Business Location in Hyderabad
                      </label>
                      <input
                        id="location"
                        type="text"
                        autoComplete="address-level2"
                        {...register('location')}
                        className="w-full px-4 py-3 bg-[#06070A] border border-[rgba(0,224,255,0.15)] rounded-lg font-dm text-white text-sm placeholder-[#9AA4B2] transition-colors"
                        placeholder="e.g. Banjara Hills, Gachibowli"
                      />
                    </div>

                    {/* Message */}
                    <div className="mb-7">
                      <label htmlFor="message" className="block font-dm text-sm text-[#9AA4B2] mb-2">
                        Tell us more (optional)
                      </label>
                      <textarea
                        id="message"
                        rows={3}
                        {...register('message')}
                        className="w-full px-4 py-3 bg-[#06070A] border border-[rgba(0,224,255,0.15)] rounded-lg font-dm text-white text-sm placeholder-[#9AA4B2] focus:outline-none focus:ring-1 focus:ring-[rgba(0,224,255,0.3)] transition-colors resize-none"
                        placeholder="Approximate size of your space, specific goals, any questions..."
                        aria-label="Optional message"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      aria-label="Submit the contact form"
                      className="btn-primary w-full justify-center py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" aria-hidden="true" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send size={15} aria-hidden="true" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
