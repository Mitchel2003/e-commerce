import { motion } from 'framer-motion';

interface CompanyHeaderProps {
  imageUrl: string;
  name: string;
}

export const CompanyHeader = ({ name, imageUrl }: CompanyHeaderProps) => {
  return (
    <motion.header
      className="relative h-[60vh] flex items-center justify-center text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />
      <div className="relative z-20 text-center">
        <motion.h1
          className="text-5xl font-bold mb-4"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {name}
        </motion.h1>
      </div>
    </motion.header>
  )
}