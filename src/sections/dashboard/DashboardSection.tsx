import { containerVariants, itemVariants } from '@/utils/animations'
import { ThemeContextProps } from '@/interfaces/context.interface'
import { motion } from 'framer-motion'

import StatisticsSection from './StatisticsSection'
import ProductsSection from './ProductsSection'
import WelcomeSection from './WelcomeSection'

const DashboardSection = ({ theme }: ThemeContextProps) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <WelcomeSection theme={theme} variants={itemVariants} />
      <StatisticsSection theme={theme} variants={itemVariants} />
      <ProductsSection theme={theme} variants={itemVariants} />
    </motion.div>
  )
}

export default DashboardSection 