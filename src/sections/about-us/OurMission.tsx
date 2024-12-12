import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

export default function OurMission() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold mb-6">Nuestra Misión</h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Nos esforzamos por empoderar a las empresas a través de soluciones tecnológicas innovadoras,
            fomentando el crecimiento y la transformación digital en un panorama en constante evolución.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

