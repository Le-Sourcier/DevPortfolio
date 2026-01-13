import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  User,
  MessageSquare,
  Clock,
  CheckCircle,
  Github,
  Linkedin,
  Twitter,
  Calendar,
  Globe,
  Smartphone,
  Code2,
  Database,
  Cloud,
  Shield,
} from "lucide-react";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    budget: "",
    message: "",
    timeline: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        company: "",
        service: "",
        budget: "",
        message: "",
        timeline: "",
      });
    }, 3000);
  };

  const services = [
    { value: "", label: t("contact.form.selectService") },
    { value: "web-development", label: t("contact.form.services.web-development") },
    { value: "mobile-app", label: t("contact.form.services.mobile-app") },
    { value: "backend-api", label: t("contact.form.services.backend-api") },
    { value: "consulting", label: t("contact.form.services.consulting") },
    { value: "maintenance", label: t("contact.form.services.maintenance") },
    { value: "other", label: t("contact.form.services.other") },
  ];

  const budgets = [
    { value: "", label: t("contact.form.selectBudget") },
    { value: "1000-3000", label: t("contact.form.budgets.1000-3000") },
    { value: "3000-5000", label: t("contact.form.budgets.3000-5000") },
    { value: "5000-10000", label: t("contact.form.budgets.5000-10000") },
    { value: "10000+", label: t("contact.form.budgets.10000+") },
    { value: "discuss", label: t("contact.form.budgets.discuss") },
  ];

  const timelines = [
    { value: "", label: t("contact.form.selectTimeline") },
    { value: "asap", label: t("contact.form.timelines.asap") },
    { value: "1-month", label: t("contact.form.timelines.1-month") },
    { value: "2-3-months", label: t("contact.form.timelines.2-3-months") },
    { value: "3-6-months", label: t("contact.form.timelines.3-6-months") },
    { value: "flexible", label: t("contact.form.timelines.flexible") },
  ];

  const contactMethods = [
    {
      icon: Mail,
      title: t("contact.sidebar.email"),
      value: "contact@example.com",
      description: t("contact.sidebar.emailResponse"),
      color: "text-blue-600",
    },
    {
      icon: Phone,
      title: t("contact.sidebar.phone"),
      value: "+33 1 23 45 67 89",
      description: t("contact.sidebar.phoneHours"),
      color: "text-green-600",
    },
    {
      icon: MapPin,
      title: t("contact.sidebar.location"),
      value: t("contact.sidebar.locationValue"),
      description: t("contact.sidebar.locationRemote"),
      color: "text-purple-600",
    },
  ];

  const availabilitySlots = [
    { time: "09:00 - 10:00", available: true },
    { time: "10:00 - 11:00", available: false },
    { time: "11:00 - 12:00", available: true },
    { time: "14:00 - 15:00", available: true },
    { time: "15:00 - 16:00", available: false },
    { time: "16:00 - 17:00", available: true },
  ];

  const expertise = [
    {
      icon: Globe,
      title: t("contact.sidebar.frontend"),
      skills: ["React", "Vue.js", "TypeScript"],
    },
    {
      icon: Code2,
      title: t("contact.sidebar.backend"),
      skills: ["Node.js", "Python", "API Design"],
    },
    { icon: Smartphone, title: t("contact.sidebar.mobile"), skills: ["React Native", "Flutter"] },
    { icon: Database, title: t("contact.sidebar.database"), skills: ["PostgreSQL", "MongoDB"] },
    { icon: Cloud, title: t("contact.sidebar.devops"), skills: ["AWS", "Docker", "CI/CD"] },
    {
      icon: Shield,
      title: t("contact.sidebar.security"),
      skills: ["Auth", "Encryption", "Best Practices"],
    },
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center p-8 bg-white rounded-2xl shadow-lg border border-gray-100 max-w-md mx-4"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {t("contact.submitted.title")}
          </h2>
          <p className="text-gray-600 mb-6">
            {t("contact.submitted.message")}
          </p>
          <div className="animate-pulse-custom">
            <p className="text-sm text-gray-500">{t("contact.submitted.redirect")}</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              {t("contact.title")}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              {t("contact.subtitle")}
            </p>
            <div className="flex justify-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center">
                <Clock className="w-4 h-4 text-blue-500 mr-2" />
                {t("contact.response")}
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                {t("contact.freeQuote")}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
            >
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mr-4">
                  <Send className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {t("contact.sendMessage")}
                  </h2>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-gray-900 mb-2"
                    >
                      {t("contact.form.fullName")}
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                        placeholder={t("contact.form.fullNamePlaceholder")}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-900 mb-2"
                    >
                      {t("contact.form.email")}
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                        placeholder={t("contact.form.emailPlaceholder")}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-semibold text-gray-900 mb-2"
                    >
                      {t("contact.form.company")}
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                      placeholder={t("contact.form.companyPlaceholder")}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="service"
                      className="block text-sm font-semibold text-gray-900 mb-2"
                    >
                      {t("contact.form.service")}
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                    >
                      {services.map((service) => (
                        <option key={service.value} value={service.value}>
                          {service.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="budget"
                      className="block text-sm font-semibold text-gray-900 mb-2"
                    >
                      {t("contact.form.budget")}
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                    >
                      {budgets.map((budget) => (
                        <option key={budget.value} value={budget.value}>
                          {budget.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="timeline"
                      className="block text-sm font-semibold text-gray-900 mb-2"
                    >
                      {t("contact.form.timeline")}
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                    >
                      {timelines.map((timeline) => (
                        <option key={timeline.value} value={timeline.value}>
                          {timeline.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-gray-900 mb-2"
                  >
                    {t("contact.form.message")}
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-4 w-5 h-5 text-gray-400" />
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 resize-vertical"
                      placeholder={t("contact.form.messagePlaceholder")}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full btn-primary ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="spinner w-5 h-5 mr-2" />
                      {t("contact.form.submitting")}
                    </>
                  ) : (
                    <>
                      {t("contact.form.submit")}
                      <Send className="ml-2 w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Contact Methods */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                {t("contact.sidebar.contactDirectly")}
              </h3>
              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        method.color === "text-blue-600"
                          ? "bg-blue-100"
                          : method.color === "text-green-600"
                          ? "bg-green-100"
                          : "bg-purple-100"
                      }`}
                    >
                      <method.icon className={`w-5 h-5 ${method.color}`} />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {method.title}
                      </div>
                      <div className="text-gray-800">{method.value}</div>
                      <div className="text-sm text-gray-500">
                        {method.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex space-x-4">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                  >
                    <Github className="w-5 h-5 text-gray-700" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                  >
                    <Linkedin className="w-5 h-5 text-gray-700" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                  >
                    <Twitter className="w-5 h-5 text-gray-700" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Expertise */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                {t("contact.sidebar.expertise")}
              </h3>
              <div className="space-y-4">
                {expertise.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {item.title}
                      </div>
                      <div className="text-sm text-gray-600">
                        {item.skills.join(", ")}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Availability */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                {t("contact.sidebar.availability")}
              </h3>
              <div className="space-y-2">
                {availabilitySlots.map((slot, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      slot.available
                        ? "bg-green-50 text-green-800 border border-green-200"
                        : "bg-gray-50 text-gray-500 border border-gray-200"
                    }`}
                  >
                    <span className="text-sm font-medium">{slot.time}</span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        slot.available
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {slot.available ? t("contact.sidebar.available") : t("contact.sidebar.busy")}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-4">
                {t("contact.sidebar.timezone")}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t("faq.title")}
            </h2>
            <p className="text-gray-600">
              {t("faq.subtitle")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {[
              {
                question: t("faq.q1"),
                answer: t("faq.a1"),
              },
              {
                question: t("faq.q2"),
                answer: t("faq.a2"),
              },
              {
                question: t("faq.q3"),
                answer: t("faq.a3"),
              },
              {
                question: t("faq.q4"),
                answer: t("faq.a4"),
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 shadow-sm border border-gray-100"
              >
                <h3 className="font-semibold text-gray-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;