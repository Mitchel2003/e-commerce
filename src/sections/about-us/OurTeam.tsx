import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

const teamMembers = [
  { name: 'John Doe', role: 'CEO', image: '/placeholder.svg' },
  { name: 'Jane Smith', role: 'CTO', image: '/placeholder.svg' },
  { name: 'Mike Johnson', role: 'COO', image: '/placeholder.svg' },
  { name: 'Sarah Brown', role: 'CFO', image: '/placeholder.svg' },
]

export default function OurTeam() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center">Nuestro Equipo</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="text-center"
            >
              <div className="mb-4 relative w-48 h-48 mx-auto rounded-full overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-semibold mb-1">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}