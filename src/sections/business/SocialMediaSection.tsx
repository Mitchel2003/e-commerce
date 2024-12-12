import { ThemeContextProps, Business } from '@/interfaces/context.interface';
import { Facebook, Instagram, Link, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SocialMediaSectionProps extends ThemeContextProps {
  socialMedia: Business['socialNetworks'];
  contact: Business['phone'];
}

export const SocialMediaSection = ({ socialMedia, theme, contact }: SocialMediaSectionProps) => {
  if (!socialMedia?.length) return null;

  return (
    <section className={cn(
      'py-16',
      theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'
    )}>
      <div className="container mx-auto px-4">
        <h2 className={cn(
          'text-3xl font-semibold mb-8 text-center',
          theme === 'dark' ? 'text-zinc-100' : 'text-zinc-800'
        )}>
          Síguenos en Redes Sociales
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {/** first of all add whatsapp icon */}
          <motion.a
            key='whatsapp'
            href={`https://wa.me/57${contact}?text=Hola,%20quiero%20más%20información%20sobre%20tu%20emprendimiento`}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'flex flex-col p-8 items-center justify-center rounded-lg',
              'transition-all duration-300 hover:shadow-xl',
              theme === 'dark'
                ? 'bg-green-900 hover:bg-green-800'
                : 'bg-green-600 hover:bg-green-700'
            )}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
          >
            <Phone size={40} className="text-white mb-4" />
            <span className="text-white text-xl font-semibold">
              Whatsapp
            </span>
          </motion.a>

          {/** then add another social network*/}
          {socialMedia.map((social, index) => (
            <motion.a
              key={social.type}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'flex flex-col p-8 items-center justify-center rounded-lg',
                'transition-all duration-300 hover:shadow-xl',
                theme === 'dark' ? [
                  social.type === 'Facebook' && 'bg-blue-900 hover:bg-blue-800',
                  social.type === 'Instagram' && 'bg-pink-900 hover:bg-pink-800',
                  social.type === 'Otro' && 'bg-zinc-700 hover:bg-zinc-600'
                ] : [
                  social.type === 'Facebook' && 'bg-blue-600 hover:bg-blue-700',
                  social.type === 'Instagram' && 'bg-pink-600 hover:bg-pink-700',
                  social.type === 'Otro' && 'bg-zinc-600 hover:bg-zinc-700'
                ]
              )}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {social.type === 'Facebook' ? (
                <Facebook size={40} className="text-white mb-4" />
              ) : social.type === 'Instagram' ? (
                <Instagram size={40} className="text-white mb-4" />
              ) : (
                <Link size={40} className="text-white mb-4" />
              )}
              <span className="text-white text-xl font-semibold">
                {social.type}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}