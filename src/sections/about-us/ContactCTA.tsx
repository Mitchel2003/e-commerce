import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function ContactCTA() {
  return (
    <section className="py-20 bg-blue-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-6">¿Listo para Transformar tu Negocio?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Trabajemos juntos para hacer realidad tu visión. Nuestro equipo de expertos está listo para ayudarte a alcanzar tus objetivos.
          </p>
          <Link 
            to="/contact" 
            className="inline-block bg-white text-blue-600 py-3 px-8 rounded-full text-lg font-semibold hover:bg-blue-100 transition duration-300"
          >
            Contáctanos
          </Link>
        </motion.div>
      </div>
    </section>
  )
}