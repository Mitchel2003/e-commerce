import aboutUsImage from '/assets/about-us/tecnoparque_sede.jpg'
import { motion } from 'framer-motion'

export default function AboutHero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <img
        src={aboutUsImage}
        alt="Company Office"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center text-white"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-4">Sobre Nosotros</h1>
        <p className="text-xl md:text-2xl max-w-2xl mx-auto">
          Transformando ideas en realidad, un proyecto a la vez.
        </p>
      </motion.div>
    </section>
  )
}

