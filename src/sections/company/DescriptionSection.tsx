import { FC } from 'react';
import { motion } from 'framer-motion';

interface CompanyDescriptionProps {
  description: string;
}

export const CompanyDescription: FC<CompanyDescriptionProps> = ({ description }) => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-semibold mb-6">Sobre Nosotros</h2>
          <p className="text-lg text-gray-700 leading-relaxed">{description}</p>
        </motion.div>
      </div>
    </section>
  )
}

