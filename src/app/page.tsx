"use client"

import { useEffect, useState } from 'react'
import Image from "next/image";
import { AnimatedSupportLink } from '@/components/AnimatedSupportLink'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
// import ServiceContent from './components/service-content'
// import {  AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Package, TrendingUp ,Truck, Users, ShoppingCart, BarChart, HelpCircle, Book, Headphones, Bug, CreditCard, MapPin, 
  
  Smile, 
  Shield, 
  DollarSign, 
  CheckCircle, 
  Home as HomeIcon,} from 'lucide-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHistory, faGift, faNewspaper, faBriefcase, faStar, faShoppingCart, faUser, faTruck, faRoute, faShip, faBox, faQuestionCircle, faBook, faHeadset, faBug, faTruckLoading, faCreditCard } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faTwitter, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'

interface FeatureCardProps {
  icon: React.ComponentType<{ size: number }>;
  title: string;
  description: string;
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => (
  <Card className="relative overflow-hidden">
    <CardHeader>
      <div className="absolute right-2 top-2 text-muted-foreground opacity-20">
        <Icon size={48} />
      </div>
      <CardTitle className="relative z-10">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <CardDescription className="relative z-10">{description}</CardDescription>
    </CardContent>
  </Card>
)

const AnimatedNumber = ({ value }: { value: string }) => {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    let start = 0
    const end = parseInt(value.substring(0, 3))
    if (start === end) return

    const timer = setInterval(() => {
      start += 1
      setDisplayValue(start)
      if (start === end) clearInterval(timer)
    }, 20)

    return () => clearInterval(timer)
  }, [value])

  return <span>{displayValue}{value.substring(3)}</span>
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-navy-blue shadow-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                {/* <Package className="h-8 w-auto text-primary" /> */}
                <Image
              src="/images/logo.png"
              alt="Dropex Logo"
              width={40}
              height={40}
              className="rounded-full bg-white p-1"
            />
                <span className="ml-2 text-2xl font-bold text-white">Dropex Logistics</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link href="#features" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Features
                </Link>
                <Link href="#services" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Services
                </Link>
                <Link href="#contact" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Contact
                </Link>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <Button asChild>
                <Link href="/login">Log in</Link>
              </Button>
              <Button asChild className="ml-3" variant="outline">
                <Link href="/register">Sign up</Link>
              </Button>
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        <section className="bg-gradient-to-r from-navy-blue to-primary-foreground text-white">
          <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
                Streamline Your shipping complexity
              </h1>
              <p className="mt-6 max-w-2xl mx-auto text-xl">
                Effortlessly manage your inventory, track shipments, and boost your sales with Dropex Logistics.
              </p>
              <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg" className="px-8 py-3 text-lg">Get Started</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create your account</DialogTitle>
                      <DialogDescription>
                        Start your 14-day free trial. No credit card required.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Name
                        </Label>
                        <Input id="name" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                          Email
                        </Label>
                        <Input id="email" type="email" className="col-span-3" />
                      </div>
                    </div>
                    <Button type="submit">Start your free trial</Button>
                  </DialogContent>
                </Dialog>
                <Button size="lg" variant="outline" className="mt-3 sm:mt-0 sm:ml-3 px-8 py-3 text-lg">
                  Learn More
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-gray-50" id="features">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Powerful Features for Dropshippers
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                Everything you need to scale your shipping Journey.
              </p>
            </div>

            <div className="mt-20">
              <motion.div 
                className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      delayChildren: 0.3,
                      staggerChildren: 0.2
                    }
                  }
                }}
              >
                <motion.div variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: {
                    y: 0,
                    opacity: 1
                  }
                }}>
                  <FeatureCard
                    icon={ShoppingCart}
                    title="Automated Order Processing"
                    description="Instantly sync orders from multiple platforms and automate your fulfillment process."
                  />
                </motion.div>
                <motion.div variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: {
                    y: 0,
                    opacity: 1
                  }
                }}>
                  <FeatureCard
                    icon={Package}
                    title="Real-time Inventory Tracking"
                    description="Keep your stock levels updated across all your sales channels in real-time."
                  />
                </motion.div>
                <motion.div variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: {
                    y: 0,
                    opacity: 1
                  }
                }}>
                  <FeatureCard
                    icon={Truck}
                    title="Global Shipping Integration"
                    description="Seamlessly integrate with major shipping carriers worldwide for efficient deliveries."
                  />
                </motion.div>
                <motion.div variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: {
                    y: 0,
                    opacity: 1
                  }
                }}>
                  <FeatureCard
                    icon={Users}
                    title="Supplier Management"
                    description="Manage all your suppliers in one place and automate communication for faster processing."
                  />
                </motion.div>
                <motion.div variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: {
                    y: 0,
                    opacity: 1
                  }
                }}>
                  <FeatureCard
                    icon={TrendingUp}
                    title="Sales Analytics"
                    description="Gain valuable insights into your best-selling products and top-performing channels."
                  />
                </motion.div>
                <motion.div variants={{
                  hidden: { y: 20, opacity: 0 },
                  visible: {
                    y: 0,
                    opacity: 1
                  }
                }}>
                  <FeatureCard
                    icon={BarChart}
                    title="Profit Calculation"
                    description="Automatically calculate your profits and track your business performance in real-time."
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* <section className="py-20 bg-white" id="services">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-4xl font-bold text-center mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Explore Our Various Services
          </motion.h2>
          <motion.p 
            className="text-center text-gray-600 max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Save time and money with our tailored logistics solutions for individuals and businesses. 
            Our end-to-end services, from freight transportation to inventory management, streamline 
            your operations, so you can focus on your core business and family.
          </motion.p> */}

          {/* <div className="flex justify-center space-x-4 mb-16 overflow-x-auto">
            {services.map((service, index) => (
              <motion.button
                key={service.id}
                onClick={() => setActiveService(service.id)}
                className={`px-4 py-2 rounded-full transition-all whitespace-nowrap ${
                  activeService === service.id
                    ? "bg-[#324879] text-white"
                    : "hover:bg-gray-100"
                }`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {service.name}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeService}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              <ServiceContent serviceId={activeService} />
            </motion.div>
          </AnimatePresence>
        </div>
      </section> */}
      {/* Why Partner with Us Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6">
            Why Partner with Us?
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            When it comes to logistics, trust and efficiency are paramount. At Dropex, we pride ourselves on being your go-to partner for all shipping needs. Here&apos;s why we stand out:
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Smile,
                title: "Outstanding Customer Service",
                description: "We ensure a seamless and satisfying customer journey.",
                color: "text-orange-500",
                bgColor: "bg-orange-50"
              },
              {
                icon: Shield,
                title: "Reliability and Safety",
                description: "Delivering your goods swiftly with top-tier security.",
                color: "text-blue-500",
                bgColor: "bg-blue-50"
              },
              {
                icon: DollarSign,
                title: "Competitive Pricing",
                description: "Affordable rates with no hidden fees.",
                color: "text-green-500",
                bgColor: "bg-green-50"
              },
              {
                icon: CheckCircle,
                title: "Hassle-Free Process",
                description: "We manage customs and taxes on your behalf.",
                color: "text-purple-500",
                bgColor: "bg-purple-50"
              }
            ].map((feature, index) => (
              <Card 
                key={index} 
                className="p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group cursor-pointer"
              >
                <div className={`${feature.bgColor} p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-[#324879] transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {[
              {
                icon: MapPin,
                title: "Real-Time Tracking",
                description: "Stay updated with our accurate tracking system.",
                color: "text-red-500",
                bgColor: "bg-red-50"
              },
              {
                icon: HomeIcon,
                title: "Doorstep Delivery",
                description: "We deliver directly to your home or office.",
                color: "text-indigo-500",
                bgColor: "bg-indigo-50"
              }
            ].map((feature, index) => (
              <Card 
                key={index} 
                className="p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group cursor-pointer"
              >
                <div className={`${feature.bgColor} p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-[#324879] transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>


        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Trusted by Dropshippers Worldwide
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                Join thousands of successful dropshippers who have scaled their business with LogiTrack.
              </p>
            </div>

            <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <p className="text-5xl font-extrabold text-primary">
                  <AnimatedNumber value="10k+" />
                </p>
                <p className="mt-2 text-lg font-medium text-gray-500">Active Users</p>
              </div>
              <div className="text-center">
                <p className="text-5xl font-extrabold text-primary">
                  <AnimatedNumber value="1M+" />
                </p>
                <p className="mt-2 text-lg font-medium text-gray-500">Orders Processed</p>
              </div>
              <div className="text-center">
                <p className="text-5xl font-extrabold text-primary">
                  <AnimatedNumber value="50+" />
                </p>
                <p className="mt-2 text-lg font-medium text-gray-500">Integrations</p>
              </div>
              <div className="text-center">
                <p className="text-5xl font-extrabold text-primary">
                  <AnimatedNumber value="99%" />
                </p>
                <p className="mt-2 text-lg font-medium text-gray-500">Customer Satisfaction</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-extrabold text-center text-gray-900 sm:text-4xl">
                What Our Customers Say
              </h2>
              <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    name: "Sarah Johnson",
                    role: "E-commerce Entrepreneur",
                    image: "/placeholder.svg?height=100&width=100",
                    quote: "LogiTrack has transformed my online business. Their fulfillment services are top-notch, allowing me to focus on growing my brand."
                  },
                  {
                    name: "Michael Chen",
                    role: "International Student",
                    image: "/placeholder.svg?height=100&width=100",
                    quote: "As an international student, LogiTrack's door-to-door service has been a lifesaver. It's so easy to get items from home now!"
                  },
                  {
                    name: "Emma Rodriguez",
                    role: "Small Business Owner",
                    image: "/placeholder.svg?height=100&width=100",
                    quote: "The local delivery option has helped me compete with larger businesses. My customers love the same-day delivery service!"
                  }
                ].map((testimonial, index) => (
                  <Card key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <CardHeader className="pb-0">
                      <div className="flex items-center">
                        {/* <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          width={50}
                          height={50}
                          className="rounded-full"
                        /> */}
                        <div className="ml-4">
                          <CardTitle className="text-lg font-semibold">{testimonial.name}</CardTitle>
                          <CardDescription>{testimonial.role}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          



        <section className="py-20 bg-gray-50" id="services">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Comprehensive Dropshipping Services
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                Everything you need to launch, manage, and scale your dropshipping business.
              </p>
            </div>

            <div className="mt-20">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Product Sourcing</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>Access a vast network of verified suppliers and find winning products for your store.</CardDescription>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Order Fulfillment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>Automate your order processing and fulfillment with our advanced integration system.</CardDescription>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Inventory Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>Keep track of your stock levels across multiple channels and never oversell again.</CardDescription>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Shipping & Tracking</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>Offer real-time tracking to your customers and manage all your shipments in one place.</CardDescription>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Analytics & Reporting</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>Gain valuable insights into your business performance with our comprehensive analytics tools.</CardDescription>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>24/7 Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>Get expert assistance whenever you need it with our round-the-clock customer support.</CardDescription>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Global Presence Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6">
            Our Global Presence
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Dropex Logistics is committed to serving clients worldwide. Our extensive network spans major regions including the United States, Canada, Mexico, Brazil, Argentina, Chile, the United Kingdom, Germany, France, Italy, Spain, the Netherlands, Turkey, China, India, Thailand, UAE, South Africa, Egypt, Kenya, Uganda, Rwanda, Nigeria, Zambia, DRC, and Tanzania.
          </p>
          
          <div className="relative w-full h-[600px] mb-12">
            <Image
              src="/images/world-map.png"
              alt="Global Presence Map"
              fill
              className="object-contain"
            />
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                region: "Americas",
                countries: "12+ Countries",
                description: "Strong presence across North and South America"
              },
              {
                region: "Europe",
                countries: "15+ Countries",
                description: "Extensive network throughout the European Union"
              },
              {
                region: "Asia & Middle East",
                countries: "10+ Countries",
                description: "Strategic locations across major Asian markets"
              },
              {
                region: "Africa",
                countries: "20+ Countries",
                description: "Growing network across the African continent"
              }
            ].map((region) => (
              <Card key={region.region} className="p-6">
                <h3 className="text-xl font-semibold mb-2">{region.region}</h3>
                <p className="text-[#324879] font-bold mb-2">{region.countries}</p>
                <p className="text-gray-600 text-sm">{region.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-[#2B4162]">
            What We Offer
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="p-8 hover:shadow-lg transition-all duration-300 group cursor-pointer">
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 text-[#FF8B0D]">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22 16.5H2c-.6 0-1-.4-1-1s.4-1 1-1h20c.6 0 1 .4 1 1s-.4 1-1 1zM14 20.5h-4c-.6 0-1-.4-1-1s.4-1 1-1h4c.6 0 1 .4 1 1s-.4 1-1 1zM7.3 9.3l-3.8.8c-.5.1-.9-.3-.8-.8l.8-3.8c.1-.3.3-.5.6-.6l3.8-.8c.5-.1.9.3.8.8l-.8 3.8c-.1.3-.3.5-.6.6z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-[#2B4162] group-hover:text-[#FF8B0D] transition-colors">
                  Air Freight
                </h3>
                <p className="text-gray-600">
                  Rapid and dependable air transport solutions.
                </p>
              </div>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-all duration-300 group cursor-pointer">
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 text-[#FF8B0D]">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 12.5V6.8c0-.5-.3-1-.8-1.2l-7-3.5c-.3-.1-.6-.1-.9 0l-7 3.5c-.5.2-.8.7-.8 1.2v5.7c0 4.4 3.6 8 8 8s8-3.6 8-8zm-8-2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-[#2B4162] group-hover:text-[#FF8B0D] transition-colors">
                  Sea Cargo
                </h3>
                <p className="text-gray-600">
                  Comprehensive global sea shipping services.
                </p>
              </div>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-all duration-300 group cursor-pointer">
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 text-[#FF8B0D]">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 15h-2c0-1.2-.8-2.2-1.9-2.5C14.4 11.3 13.3 11 12 11s-2.4.3-3.1 1.5C7.8 12.8 7 13.8 7 15H5c0-2.2 1.4-4 3.5-4.7C9.6 9.2 10.8 9 12 9s2.4.2 3.5 1.3C17.6 11 19 12.8 19 15z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-[#2B4162] group-hover:text-[#FF8B0D] transition-colors">
                  Land Transport
                </h3>
                <p className="text-gray-600">
                  Efficient ground transportation across all regions.
                </p>
              </div>
            </Card>
          </div>

          <div className="flex justify-center">
            <Card className="p-8 hover:shadow-lg transition-all duration-300 group cursor-pointer max-w-md">
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 text-[#FF8B0D]">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M15.9 5.5l-2.1-2.1c-.3-.3-.7-.4-1.1-.4H5c-.6 0-1 .4-1 1v16c0 .6.4 1 1 1h14c.6 0 1-.4 1-1v-13c0-.4-.2-.8-.5-1.1l-2.6-2.6zm-3.9 9.9c-.4.4-1 .4-1.4 0l-2.1-2.1c-.4-.4-.4-1 0-1.4.4-.4 1-.4 1.4 0l1.4 1.4 3.6-3.6c.4-.4 1-.4 1.4 0 .4.4.4 1 0 1.4l-4.3 4.3z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-[#2B4162] group-hover:text-[#FF8B0D] transition-colors">
                  Auction Services
                </h3>
                <p className="text-gray-600">
                  Seamless participation in global auctions.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Shipping Solutions Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Shipping Solutions for Every Need
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            With our global network, Dropex Logistics offers tailored transportation services to meet your specific needs. Whether it&apos;s air, sea, or land, we handle your shipments with precision and care, ensuring they reach their destination on time and in perfect condition.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="relative h-48">
                <Image
                  src="/images/sea-shipping.jpg"
                  alt="Sea Shipping"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-4 left-4 bg-black/50 px-4 py-2 rounded-lg backdrop-blur-sm">
                  <h3 className="text-white font-semibold">By Sea</h3>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="relative h-48">
                <Image
                  src="/images/land-shipping.jpg"
                  alt="Land Shipping"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-4 left-4 bg-black/50 px-4 py-2 rounded-lg backdrop-blur-sm">
                  <h3 className="text-white font-semibold">By Land</h3>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="relative h-48">
                <Image
                  src="/images/air-shipping.jpg"
                  alt="Air Shipping"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-4 left-4 bg-black/50 px-4 py-2 rounded-lg backdrop-blur-sm">
                  <h3 className="text-white font-semibold">By Air</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/services">
              <Button 
                size="lg" 
                className="bg-[#324879] text-white hover:bg-[#263a61]"
              >
                Explore Our Services
              </Button>
            </Link>
          </div>
        </div>
      </section>


        <section className="py-20 bg-navy-blue text-white" id="contact">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold sm:text-4xl">
                Ready to Supercharge Your Dropshipping Business?
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-xl">
                Get in touch with our team and start your journey to dropshipping success today.
              </p>
            </div>

            <div className="mt-12">
              <form className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                <div>
                  <Label htmlFor="first-name" className="block text-sm font-medium">
                    First name
                  </Label>
                  <div className="mt-1">
                    <Input
                      type="text"
                      name="first-name"
                      id="first-name"
                      autoComplete="given-name"
                      className="bg-primary-foreground text-primary"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="last-name" className="block text-sm font-medium">
                    Last name
                  </Label>
                  <div className="mt-1">
                    <Input
                      type="text"
                      name="last-name"
                      id="last-name"
                      autoComplete="family-name"
                      className="bg-primary-foreground text-primary"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="email" className="block text-sm font-medium">
                    Email
                  </Label>
                  <div className="mt-1">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="bg-primary-foreground text-primary"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="message" className="block text-sm font-medium">
                    Message
                  </Label>
                  <div className="mt-1">
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Enter your message"
                      className="block w-full rounded-md bg-primary-foreground text-primary"
                    ></textarea>
                  </div>
                </div>
                <div className="sm:col-span-5">
                  <Button type="submit" size="lg" className="w-full">
                    Let&apos;s Talk
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      

        <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">About Dropex</h3>
            <ul className="mt-4 space-y-4">
            <li><Link href="/footer/our-story" className="text-base text-gray-300 hover:text-white"><FontAwesomeIcon icon={faHistory} className="mr-2" />Our Story</Link></li>
            <li><Link href="/footer/loyalty-program" className="text-base text-gray-300 hover:text-white"><FontAwesomeIcon icon={faGift} className="mr-2" />Loyalty Program</Link></li>
            <li><Link href="/footer/newsroom" className="text-base text-gray-300 hover:text-white"><FontAwesomeIcon icon={faNewspaper} className="mr-2" />Newsroom</Link></li>
            <li><Link href="/footer/careers" className="text-base text-gray-300 hover:text-white"><FontAwesomeIcon icon={faBriefcase} className="mr-2" />Career Opportunities</Link></li>
            <li><Link href="/footer/reviews" className="text-base text-gray-300 hover:text-white"><FontAwesomeIcon icon={faStar} className="mr-2" />Customer Reviews</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Our Services</h3>
            <ul className="mt-4 space-y-4">
            <li><Link href="/footer/global-purchases" className="text-base text-gray-300 hover:text-white"><FontAwesomeIcon icon={faShoppingCart} className="mr-2" />Global Purchases</Link></li>
            <li><Link href="/footer/personal-shopper" className="text-base text-gray-300 hover:text-white"><FontAwesomeIcon icon={faUser} className="mr-2" />Personal Shopper</Link></li>
            <li><Link href="/footer/fulfillment-delivery" className="text-base text-gray-300 hover:text-white"><FontAwesomeIcon icon={faTruck} className="mr-2" />Fulfillment & Delivery</Link></li>
            <li><Link href="/footer/regional-transport" className="text-base text-gray-300 hover:text-white"><FontAwesomeIcon icon={faRoute} className="mr-2" />Regional Transport</Link></li>
            <li><Link href="/footer/sea-air-freight" className="text-base text-gray-300 hover:text-white"><FontAwesomeIcon icon={faShip} className="mr-2" />Sea & Air Freight</Link></li>
            <li><Link href="/footer/storage-solutions" className="text-base text-gray-300 hover:text-white"><FontAwesomeIcon icon={faBox} className="mr-2" />Storage Solutions</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">Support</h3>
            <ul className="mt-4 space-y-4">
            <li><AnimatedSupportLink href="/footer/support/faq" icon={HelpCircle}>Frequently Asked Questions</AnimatedSupportLink></li>
            <li><AnimatedSupportLink href="/footer/support/user-guide" icon={Book}>User Guide</AnimatedSupportLink></li>
            <li><AnimatedSupportLink href="/footer/support/contact-assistance" icon={Headphones}>Contact Assistance</AnimatedSupportLink></li>
            <li><AnimatedSupportLink href="/footer/support/report-issue" icon={Bug}>Report an Issue</AnimatedSupportLink></li>
            <li><AnimatedSupportLink href="/footer/support/track-shipment" icon={Truck}>Track My Shipment</AnimatedSupportLink></li>
            <li><AnimatedSupportLink href="/footer/support/payment-options" icon={CreditCard}>Payment Options</AnimatedSupportLink></li>
            </ul>
          </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8">
          <div className="flex justify-between items-center">
            <p className="text-base text-gray-400">&copy; 2024 Dropex Logistics. All rights reserved.</p>
            <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-gray-300">
              <span className="sr-only">Facebook</span>
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-300">
              <span className="sr-only">Twitter</span>
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-300">
              <span className="sr-only">LinkedIn</span>
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
            </div>
          </div>
          </div>
        </div>
        </footer>
      </div>
      )
    }
