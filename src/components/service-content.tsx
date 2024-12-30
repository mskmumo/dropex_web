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
          </motion.p>

          <div className="flex justify-center space-x-4 mb-16 overflow-x-auto">
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
