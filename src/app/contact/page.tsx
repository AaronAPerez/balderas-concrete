"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Container } from "@/src/components/ui/Container";
import { contactInfo, services } from "@/src/lib/constants";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { smoothEasing, FadeInSection } from "@/src/components/ui/animations";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  service: z.string().optional(),
  city: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10, "Please provide at least 10 characters"),
});

type FormValues = z.infer<typeof schema>;

/**
 * ContactPage - Contact form with premium micro-interactions
 * Features:
 * - Animated hero section
 * - Staggered contact info cards
 * - Form field focus animations
 * - Animated success/error states
 * - Button hover effects
 */
export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  // Watch select values to toggle placeholder-shown class for accessibility
  const serviceValue = watch("service");
  const budgetValue = watch("budget");

  const mutation = useMutation({
    mutationFn: async (data: FormValues) => {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to submit");
      }
      return res.json();
    },
    onSuccess: () => {
      setSubmitted(true);
      reset();
      // Show success toast notification
      toast.success("Message sent successfully!", {
        description: "We've received your request and will contact you within 24 hours.",
      });
    },
    onError: (error: Error) => {
      // Show error toast notification
      toast.error("Failed to send message", {
        description: error.message || "Please try again or call us directly.",
      });
    },
  });

  const onSubmit = (data: FormValues) => mutation.mutate(data);

  // Hero container animation
  const heroContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  // Hero text animation
  const heroTextVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.6,
        ease: smoothEasing,
      },
    },
  };

  // Contact info cards stagger container
  const contactCardsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: shouldReduceMotion ? 0 : 0.2,
      },
    },
  };

  // Individual contact card animation
  const contactCardVariants = {
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.4,
        ease: smoothEasing,
      },
    },
  };

  // Alert animation
  const alertVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : -20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.4,
        ease: smoothEasing,
      },
    },
    exit: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : -10,
      scale: 0.95,
      transition: { duration: 0.2 },
    },
  };

  const inputStyles =
    "pt-1 w-full rounded-md border border-slate-300 px-4 py-3 text-base focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand min-h-[44px] transition-all duration-200";

  // Contact info data
  const contactItems = [
    {
      type: "phone",
      href: `tel:${contactInfo.phoneRaw}`,
      label: "Phone",
      value: contactInfo.phone,
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      ),
    },
    {
      type: "email",
      href: `mailto:${contactInfo.email}`,
      label: "Email",
      value: contactInfo.email,
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      ),
    },
    {
      type: "address",
      label: "Address",
      value: contactInfo.address.full,
      icon: (
        <>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </>
      ),
    },
    {
      type: "hours",
      label: "Business Hours",
      value: contactInfo.hours,
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      ),
    },
  ];

  return (
    <>
      {/* Animated Hero Section */}
      <section className="relative py-8 lg:py-16 bg-brand overflow-hidden">
        <Container>
          <motion.div
            className="text-center max-w-3xl mx-auto"
            variants={heroContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className="text-4xl sm:text-5xl font-bold text-white pb-6"
              variants={heroTextVariants}
            >
              Contact Us
            </motion.h1>
            <motion.p
              className="text-xl text-white/90 leading-relaxed"
              variants={heroTextVariants}
            >
              Request an estimate for your concrete project. We&apos;ll get back to
              you within 24 hours.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* Contact Section */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Animated Contact Info */}
            <div className="lg:col-span-1">
              <FadeInSection direction="left">
                <h2 className="text-2xl font-bold text-brand pb-6">
                  Get in Touch
                </h2>
              </FadeInSection>

              <motion.div
                className="space-y-6"
                variants={contactCardsContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                {contactItems.map((item, index) => {
                  const content = (
                    <>
                      <motion.div
                        className="w-12 h-12 rounded-lg bg-brand/10 flex items-center justify-center shrink-0 group-hover:bg-accent/10 transition-colors"
                        whileHover={
                          shouldReduceMotion
                            ? {}
                            : {
                                scale: 1.1,
                                transition: { duration: 0.2 },
                              }
                        }
                      >
                        <svg
                          className="w-6 h-6 text-brand group-hover:text-accent transition-colors"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          {item.icon}
                        </svg>
                      </motion.div>
                      <div>
                        <p className="font-semibold">{item.label}</p>
                        <p className="text-lg">{item.value}</p>
                      </div>
                    </>
                  );

                  return (
                    <motion.div
                      key={index}
                      variants={contactCardVariants}
                      whileHover={
                        shouldReduceMotion
                          ? {}
                          : {
                              x: 5,
                              transition: { duration: 0.2 },
                            }
                      }
                    >
                      {item.href ? (
                        <a
                          href={item.href}
                          className="flex items-start gap-4 text-slate-700 hover:text-accent transition-colors group"
                        >
                          {content}
                        </a>
                      ) : (
                        <div className="flex items-start gap-4 text-slate-700">
                          {content}
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            {/* Animated Contact Form */}
            <div className="lg:col-span-2">
              <FadeInSection direction="right">
                <motion.div
                  className="bg-white rounded-lg border border-slate-200 p-6 lg:p-8 shadow-sm"
                  whileHover={
                    shouldReduceMotion
                      ? {}
                      : {
                          boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
                          transition: { duration: 0.3 },
                        }
                  }
                >
                  <h2 className="text-2xl font-bold text-brand pb-2">
                    Request an Estimate
                  </h2>
                  <p className="text-slate-600 pb-6">
                    Tell us about your project and we&apos;ll provide a detailed quote.
                  </p>

                  {/* Animated success message */}
                  <AnimatePresence>
                    {submitted && (
                      <motion.div
                        className="pb-6 rounded-md bg-green-50 border border-green-200 p-4 text-green-800"
                        role="alert"
                        variants={alertVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        <div className="flex items-center gap-2">
                          <motion.svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                              type: shouldReduceMotion ? "tween" : "spring",
                              stiffness: 300,
                              damping: 15,
                              delay: 0.2,
                            }}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </motion.svg>
                          <span className="font-medium">
                            Thank you! We&apos;ve received your message and will contact
                            you within 24 hours.
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Animated error message */}
                  <AnimatePresence>
                    {mutation.isError && (
                      <motion.div
                        className="pb-6 rounded-md bg-red-50 border border-red-200 p-4 text-red-800"
                        role="alert"
                        variants={alertVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        <span className="font-medium">
                          Something went wrong. Please try again or call us directly.
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                    aria-label="Contact form"
                  >
                    <div className="grid sm:grid-cols-2 gap-5">
                      <motion.div
                        whileFocus={{ scale: shouldReduceMotion ? 1 : 1.01 }}
                      >
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-slate-700 pb-1"
                        >
                          Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="name"
                          {...register("name")}
                          className={inputStyles}
                          aria-invalid={errors.name ? "true" : "false"}
                        />
                        <AnimatePresence>
                          {errors.name && (
                            <motion.p
                              className="pt-1 text-sm text-red-600"
                              role="alert"
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                            >
                              {errors.name.message}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </motion.div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-slate-700 pb-1"
                        >
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          {...register("email")}
                          className={inputStyles}
                          aria-invalid={errors.email ? "true" : "false"}
                        />
                        <AnimatePresence>
                          {errors.email && (
                            <motion.p
                              className="pt-1 text-sm text-red-600"
                              role="alert"
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                            >
                              {errors.email.message}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-slate-700 pb-1"
                        >
                          Phone
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          {...register("phone")}
                          className={inputStyles}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium text-slate-700 pb-1"
                        >
                          City
                        </label>
                        <input
                          id="city"
                          {...register("city")}
                          className={inputStyles}
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="service"
                          className="block text-sm font-medium text-slate-700 pb-1"
                        >
                          Service Type
                        </label>
                        <select
                          id="service"
                          {...register("service")}
                          className={`${inputStyles} ${!serviceValue ? "placeholder-shown" : ""}`}
                        >
                          <option value="">Select a service</option>
                          {services.map((service) => (
                            <option key={service.id} value={service.id}>
                              {service.title}
                            </option>
                          ))}
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="budget"
                          className="block text-sm font-medium text-slate-700 pb-1"
                        >
                          Budget Range
                        </label>
                        <select
                          id="budget"
                          {...register("budget")}
                          className={`${inputStyles} ${!budgetValue ? "placeholder-shown" : ""}`}
                        >
                          <option value="">Select budget range</option>
                          <option value="under-5k">Under $5,000</option>
                          <option value="5k-10k">$5,000 - $10,000</option>
                          <option value="10k-25k">$10,000 - $25,000</option>
                          <option value="25k-50k">$25,000 - $50,000</option>
                          <option value="over-50k">Over $50,000</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-slate-700 pb-1"
                      >
                        Project Details <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        {...register("message")}
                        rows={5}
                        className={`${inputStyles} resize-none`}
                        placeholder="Tell us about your project - size, timeline, special requirements..."
                        aria-invalid={errors.message ? "true" : "false"}
                      />
                      <AnimatePresence>
                        {errors.message && (
                          <motion.p
                            className="pt-1 text-sm text-red-600"
                            role="alert"
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                          >
                            {errors.message.message}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Animated submit button */}
                    <motion.button
                      type="submit"
                      disabled={mutation.isPending}
                      className="inline-flex w-full sm:w-auto items-center justify-center rounded-md bg-accent px-8 py-4 text-base font-semibold text-white shadow-sm transition hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed min-h-13"
                      whileHover={
                        shouldReduceMotion || mutation.isPending
                          ? {}
                          : {
                              scale: 1.02,
                              boxShadow: "0 5px 20px rgba(44, 69, 87, 0.3)",
                            }
                      }
                      whileTap={
                        shouldReduceMotion || mutation.isPending
                          ? {}
                          : { scale: 0.98 }
                      }
                    >
                      {mutation.isPending ? (
                        <>
                          <motion.svg
                            className="-ml-1 mr-2 h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </motion.svg>
                          Sending...
                        </>
                      ) : (
                        "Submit Request"
                      )}
                    </motion.button>
                  </form>
                </motion.div>
              </FadeInSection>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
