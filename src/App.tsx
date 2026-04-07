import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Search, 
  User, 
  ShoppingCart, 
  Menu, 
  X, 
  ChevronRight, 
  Globe, 
  Instagram, 
  Twitter, 
  Facebook, 
  Youtube,
  Camera,
  Tv,
  Headphones,
  Gamepad2,
  Monitor,
  Smartphone,
  Music,
  Film,
  HelpCircle,
  Info,
  ArrowUp
} from 'lucide-react';

// --- Components ---

const Button = ({ children, variant = 'ghost', className = '' }: { children: React.ReactNode, variant?: 'ghost' | 'solid', className?: string }) => {
  const baseStyles = "px-8 py-3 text-sm font-bold uppercase tracking-widest transition-all duration-300 border-2 rounded-sm";
  const variants = {
    ghost: "bg-transparent border-sony-black text-sony-black hover:bg-sony-black hover:text-sony-yellow",
    solid: "bg-sony-black border-sony-black text-sony-yellow hover:bg-transparent hover:text-sony-black"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const Dropdown = ({ isOpen, items }: { isOpen: boolean, items: { name: string, icon: React.ReactNode }[] }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -10 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 glass-panel rounded-2xl overflow-hidden z-50 p-4"
        >
          <div className="flex flex-col space-y-1">
            {items.map((item) => (
              <motion.div 
                key={item.name} 
                whileHover={{ x: 5 }}
                className="flex items-center space-x-3 p-3 rounded-xl hover:bg-black/5 transition-colors cursor-pointer group"
              >
                <div className="text-sony-amber group-hover:text-sony-black transition-colors">
                  {item.icon}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-sony-black">{item.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { 
      name: 'Electronics', 
      items: [
        { name: 'Cameras', icon: <Camera className="w-4 h-4" /> },
        { name: 'Televisions', icon: <Tv className="w-4 h-4" /> },
        { name: 'Audio', icon: <Headphones className="w-4 h-4" /> },
        { name: 'Mobile', icon: <Smartphone className="w-4 h-4" /> }
      ]
    },
    { 
      name: 'PlayStation', 
      items: [
        { name: 'PS5 Console', icon: <Gamepad2 className="w-4 h-4" /> },
        { name: 'Games', icon: <Film className="w-4 h-4" /> },
        { name: 'Accessories', icon: <Headphones className="w-4 h-4" /> }
      ] 
    },
    { 
      name: 'Entertainment', 
      items: [
        { name: 'Movies', icon: <Film className="w-4 h-4" /> },
        { name: 'Music', icon: <Music className="w-4 h-4" /> },
        { name: 'Pictures', icon: <Camera className="w-4 h-4" /> }
      ] 
    },
    { 
      name: 'Support', 
      items: [
        { name: 'Product Help', icon: <HelpCircle className="w-4 h-4" /> },
        { name: 'Registration', icon: <Info className="w-4 h-4" /> },
        { name: 'Repair', icon: <Monitor className="w-4 h-4" /> }
      ] 
    }
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${isScrolled ? 'bg-white/40 backdrop-blur-xl py-4 border-b border-white/30' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <h1 className="text-2xl font-black tracking-tighter text-sony-black cursor-pointer select-none">SONY</h1>
        </div>

        {/* Center Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <div 
              key={item.name}
              onMouseEnter={() => setActiveMenu(item.name)}
              onMouseLeave={() => setActiveMenu(null)}
              className="relative py-2"
            >
              <a href="#" className="text-[11px] font-bold uppercase tracking-[0.2em] text-sony-black/70 hover:text-sony-black transition-colors">
                {item.name}
              </a>
              <Dropdown isOpen={activeMenu === item.name} items={item.items} />
            </div>
          ))}
        </div>

        {/* Right Icons */}
        <div className="flex items-center space-x-6">
          <Search className="w-5 h-5 text-sony-black/70 hover:text-sony-black cursor-pointer transition-colors" />
          <User className="w-5 h-5 text-sony-black/70 hover:text-sony-black cursor-pointer transition-colors hidden sm:block" />
          <ShoppingCart className="w-5 h-5 text-sony-black/70 hover:text-sony-black cursor-pointer transition-colors" />
          <button 
            className="md:hidden text-sony-black"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 200 }}
            className="fixed inset-0 bg-sony-yellow z-[200] p-8 flex flex-col overflow-y-auto"
          >
            <div className="flex justify-end">
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X className="w-8 h-8 text-sony-black" />
              </button>
            </div>
            <div className="flex flex-col space-y-6 mt-12">
              {navItems.map((item) => (
                <div key={item.name} className="flex flex-col">
                  <button 
                    onClick={() => setExpandedMobileItem(expandedMobileItem === item.name ? null : item.name)}
                    className="text-3xl font-extrabold uppercase tracking-tighter text-sony-black flex items-center justify-between"
                  >
                    {item.name}
                    <motion.div
                      animate={{ rotate: expandedMobileItem === item.name ? 90 : 0 }}
                    >
                      <ChevronRight className="w-8 h-8" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {expandedMobileItem === item.name && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden flex flex-col space-y-4 mt-4 pl-4 border-l-2 border-sony-black/10"
                      >
                        {item.items.map((sub) => (
                          <a key={sub.name} href="#" className="text-lg font-bold text-sony-amber uppercase tracking-widest flex items-center space-x-3">
                            {sub.icon}
                            <span>{sub.name}</span>
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1920" 
          alt="Hero Background"
          className="w-full h-full object-cover grayscale opacity-30"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 hero-overlay" />
      </motion.div>

      <motion.div 
        style={{ opacity }}
        initial={{ opacity: 0, scale: 0.8, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', damping: 15, stiffness: 100, delay: 0.5 }}
        className="relative z-10 text-center px-6"
      >
        <h1 className="text-5xl md:text-8xl font-black mb-8 max-w-4xl mx-auto leading-none text-sony-black">
          Immerse Yourself <br /> in the Action
        </h1>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="ghost">Watch Video</Button>
          <Button variant="solid">Buy Now</Button>
        </div>
      </motion.div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-px h-12 bg-sony-black/30" />
      </div>
    </section>
  );
};

const EcosystemGrid = () => {
  const divisions = [
    { name: 'Gaming', img: 'https://images.unsplash.com/photo-1507457379470-08b800bebc67?auto=format&fit=crop&q=80&w=800' },
    { name: 'Audio', img: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=800' },
    { name: 'Photography', img: 'https://images.unsplash.com/photo-1516724562728-afc824a36e84?auto=format&fit=crop&q=80&w=800' },
    { name: 'Cinema', img: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=800' },
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {divisions.map((div, idx) => (
            <motion.div
              key={div.name}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="relative h-[400px] md:h-[500px] overflow-hidden group cursor-pointer rounded-3xl glass-panel"
            >
              <img 
                src={div.img} 
                alt={div.name} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-yellow-400/10 group-hover:bg-transparent transition-colors duration-500" />
              <div className="absolute bottom-12 left-12">
                <h2 className="text-4xl font-black mb-4 text-sony-black">{div.name}</h2>
                <div className="flex items-center text-sony-black font-bold uppercase tracking-widest text-xs group-hover:translate-x-2 transition-transform">
                  Explore <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProductSpotlight = ({ title, desc, img, reverse = false }: { title: string, desc: string, img: string, reverse?: boolean }) => {
  return (
    <section className={`py-32 px-6 ${reverse ? 'bg-white/10' : 'bg-transparent'}`}>
      <div className={`max-w-7xl mx-auto flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-16`}>
        <motion.div 
          initial={{ opacity: 0, x: reverse ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex-1"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight text-sony-black">{title}</h2>
          <p className="text-sony-amber text-lg mb-10 max-w-lg leading-relaxed">
            {desc}
          </p>
          <Button variant="ghost">Learn More</Button>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, rotate: reverse ? 5 : -5 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: 'spring', damping: 12, stiffness: 100 }}
          className="flex-1 relative"
        >
          <div className="relative z-10 rim-light rounded-3xl glass-panel p-12">
            <img 
              src={img} 
              alt={title} 
              className="w-full h-auto drop-shadow-2xl rounded-xl"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-white/40 blur-[120px] rounded-full -z-10" />
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white/20 backdrop-blur-xl pt-24 pb-12 px-6 border-t border-white/30 relative">
      <button 
        onClick={scrollToTop}
        className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 glass-panel rounded-full flex items-center justify-center text-sony-black hover:bg-sony-black hover:text-sony-yellow transition-all duration-300 shadow-xl"
      >
        <ArrowUp className="w-6 h-6" />
      </button>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-24">
          <div>
            <h4 className="text-sony-black text-xs font-bold uppercase tracking-widest mb-8">Find a Store</h4>
            <ul className="space-y-4 text-xs text-sony-amber uppercase tracking-widest">
              <li className="hover:text-sony-black cursor-pointer transition-colors">Store Locator</li>
              <li className="hover:text-sony-black cursor-pointer transition-colors">Sony Rewards</li>
              <li className="hover:text-sony-black cursor-pointer transition-colors">Retailer Support</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sony-black text-xs font-bold uppercase tracking-widest mb-8">Support</h4>
            <ul className="space-y-4 text-xs text-sony-amber uppercase tracking-widest">
              <li className="hover:text-sony-black cursor-pointer transition-colors">Online Help</li>
              <li className="hover:text-sony-black cursor-pointer transition-colors">Warranty</li>
              <li className="hover:text-sony-black cursor-pointer transition-colors">Repair Status</li>
              <li className="hover:text-sony-black cursor-pointer transition-colors">Contact Us</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sony-black text-xs font-bold uppercase tracking-widest mb-8">Corporate</h4>
            <ul className="space-y-4 text-xs text-sony-amber uppercase tracking-widest">
              <li className="hover:text-sony-black cursor-pointer transition-colors">About Sony</li>
              <li className="hover:text-sony-black cursor-pointer transition-colors">Careers</li>
              <li className="hover:text-sony-black cursor-pointer transition-colors">Sustainability</li>
              <li className="hover:text-sony-black cursor-pointer transition-colors">Press Center</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sony-black text-xs font-bold uppercase tracking-widest mb-8">Follow Us</h4>
            <div className="flex space-x-6">
              <Instagram className="w-5 h-5 text-sony-amber hover:text-sony-black cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-sony-amber hover:text-sony-black cursor-pointer transition-colors" />
              <Facebook className="w-5 h-5 text-sony-amber hover:text-sony-black cursor-pointer transition-colors" />
              <Youtube className="w-5 h-5 text-sony-amber hover:text-sony-black cursor-pointer transition-colors" />
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/30 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center space-x-8 text-[10px] text-sony-amber uppercase tracking-widest">
            <span className="text-sony-black">© 2026 Sony Corporation</span>
            <span className="hover:text-sony-black cursor-pointer">Privacy Policy</span>
            <span className="hover:text-sony-black cursor-pointer">Terms of Service</span>
          </div>
          
          <div className="flex items-center space-x-2 text-[10px] text-sony-black uppercase tracking-widest cursor-pointer group">
            <Globe className="w-4 h-4" />
            <span className="group-hover:underline underline-offset-4">United States</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="relative">
      <Navbar />
      
      <main>
        <Hero />
        
        <EcosystemGrid />
        
        <ProductSpotlight 
          title="WH-1000XM5 Headphones"
          desc="Our best noise canceling just got better. Experience how these Sony noise canceling headphones combine our best ever noise canceling technology with superlative sound for a truly remarkable listening experience."
          img="https://images.unsplash.com/photo-1618366712277-70f398c2733d?auto=format&fit=crop&q=80&w=800"
        />
        
        <ProductSpotlight 
          title="Alpha 7R V Camera"
          desc="The next generation of resolution with AI-based autofocus. A whole new level of camera intelligence from a new AI processing unit, plus the high-resolution image quality that the R series is known for."
          img="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800"
          reverse
        />

        <section className="py-32 px-6 bg-white/20 backdrop-blur-xl text-center border-y border-white/30">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-6xl font-black mb-8 text-sony-black">Beyond the Screen</h2>
            <p className="text-sony-amber text-lg mb-12">
              Discover the stories, technology, and people behind the products that move the world.
            </p>
            <Button variant="solid">Explore Stories</Button>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
