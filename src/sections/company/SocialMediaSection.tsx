import { Facebook, Instagram, Phone } from 'lucide-react';
import { Business } from '@/interfaces/context.interface';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SocialMediaSectionProps {
  socialMedia: Business['socialNetworks']
}

export const SocialMediaSection = ({ socialMedia }: SocialMediaSectionProps) => {

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold mb-8 text-center">Síguenos en Redes Sociales</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {socialMedia?.map((social, index) => (
            <motion.a
              key={social.type}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'flex flex-col p-8 items-center justify-center text-white rounded-lg',
                'transition-transform duration-300 ease-in-out transform hover:scale-105',
                social.type === 'Facebook' ? 'bg-blue-600' : social.type === 'Instagram' ? 'bg-pink-600' : 'bg-green-500'
              )}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {social.type === 'Facebook'
                ? <Facebook size={64} className="mb-4" />
                : social.type === 'Instagram'
                  ? <Instagram size={64} className="mb-4" />
                  : <Phone size={64} className="mb-4" />
              }
              <span className="text-xl font-semibold">{social.type}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}