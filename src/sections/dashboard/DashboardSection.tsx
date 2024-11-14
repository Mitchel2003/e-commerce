import { containerVariants, itemVariants } from '@/utils/animations'
import { ThemeContextProps } from '@/interfaces/context.interface'
import { motion } from 'framer-motion'

import StatisticsSection from './StatisticsSection'
import ProductsSection from './ProductsSection'
import InfoSection from './InfoSection'

const DashboardSection = ({ theme }: ThemeContextProps) => {
  return (
    <div className="container p-0 mx-auto">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        <InfoSection theme={theme} variants={itemVariants} />
        <StatisticsSection theme={theme} variants={itemVariants} />
        <ProductsSection theme={theme} variants={itemVariants} />
      </motion.div>
    </div>
  )
}

export default DashboardSection