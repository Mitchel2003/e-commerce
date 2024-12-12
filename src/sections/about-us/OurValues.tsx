import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

const values = [
  { title: 'Innovation', description: 'Pushing boundaries and embracing new ideas.' },
  { title: 'Integrity', description: 'Upholding the highest ethical standards in all we do.' },
  { title: 'Collaboration', description: 'Working together to achieve extraordinary results.' },
  { title: 'Excellence', description: 'Striving for the highest quality in every endeavor.' },
]

export default function OurValues() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-gray-50 p-6 rounded-lg shadow-md"
            >
              <h3 className="text-2xl font-semibold mb-3">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}