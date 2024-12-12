import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

const timelineEvents = [
  { year: 2014, event: 'Fundación de la empresa' },
  { year: 2015 },
  { year: 2016, event: 'Apoyo a empresas de la región' },
  { year: 2017 },
  { year: 2018, event: 'Expandimos nuestras instalaciones' },
  { year: 2019 },
  { year: 2020, event: 'Alianza con la alcaldía para potenciar el desarrollo' },
  { year: 2021 },
  { year: 2022 },
  { year: 2023 },
  { year: 2024, event: 'Principales innovadores de la región' },
]

export default function CompanyTimeline() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center">Nuestra Historia</h2>
        <div className="relative">
          {timelineEvents.map((event, index) => (
            <motion.div
              key={event.year}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`flex items-center mb-8 ${index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}
            >
              <div className={`w-1/2 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                <h3 className="text-2xl font-semibold mb-2">{event.year}</h3>
                {event.event && <p className="text-gray-600">{event.event}</p>}
              </div>
              {index % 2 === 0 && <div className="w-4 h-4 bg-blue-500 rounded-full" />}
            </motion.div>
          ))}
          <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gray-200" />
        </div>
      </div>
    </section>
  )
}

