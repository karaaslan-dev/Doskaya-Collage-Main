/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { BookOpen, Award, Users, Brain, Menu, X, ArrowRight, Mail, Phone, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import FluidBackground from './components/FluidBackground';
import GradientText from './components/GlitchText';
import ArtistCard from './components/ArtistCard'; // Acts as ProgramCard
import AIChat from './components/AIChat';
import { Program } from './types';

// Döşkaya Koleji Data
const PROGRAMS: Program[] = [
  { 
    id: '1', 
    title: 'Akademik Mükemmellik', 
    category: 'Eğitim', 
    highlight: 'LGS Hazırlık & Temel Bilimler', 
    image: 'https://images.unsplash.com/photo-1427504743083-a91053013850?q=80&w=1000&auto=format&fit=crop',
    description: 'Öğrenci merkezli yaklaşımımızla, matematik ve fen bilimlerinde derinlemesine kavrayış sağlıyoruz. Deneyimli kadromuzla LGS sürecinde maksimum başarı hedefliyoruz.'
  },
  { 
    id: '2', 
    title: 'Yabancı Dil', 
    category: 'Dil', 
    highlight: 'İngilizce & Almanca', 
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000&auto=format&fit=crop',
    description: 'Avrupa Dilleri Ortak Çerçeve Programı (CEFR) standartlarında yoğun İngilizce ve ikinci yabancı dil olarak Almanca eğitimi veriyoruz. Dünya vatandaşı bireyler yetiştiriyoruz.'
  },
  { 
    id: '3', 
    title: 'Robotik & Kodlama', 
    category: 'Teknoloji', 
    highlight: 'Maker Atölyesi', 
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=1000&auto=format&fit=crop',
    description: 'Teknolojiyi tüketen değil üreten nesiller için modern robotik laboratuvarlarımızda algoritmik düşünme ve kodlama becerileri kazandırıyoruz.'
  },
  { 
    id: '4', 
    title: 'Sanat & Kültür', 
    category: 'Sanat', 
    highlight: 'Yaratıcı Atölyeler', 
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=1000&auto=format&fit=crop',
    description: 'Görsel sanatlar ve müzik atölyelerimizde öğrencilerimizin estetik bakış açılarını geliştiriyor, yeteneklerini keşfetmelerini sağlıyoruz.'
  },
  { 
    id: '5', 
    title: 'Spor Faaliyetleri', 
    category: 'Spor', 
    highlight: 'Takım Ruhu', 
    image: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?q=80&w=1000&auto=format&fit=crop',
    description: 'Kapalı spor salonumuz ve yüzme havuzumuzda fiziksel gelişimi destekliyor, takım olma bilincini ve disiplini aşılıyoruz.'
  },
  { 
    id: '6', 
    title: 'Rehberlik Servisi', 
    category: 'Destek', 
    highlight: 'Bireysel Takip', 
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop',
    description: 'Her öğrencinin biricik olduğu bilinciyle, akademik ve sosyal gelişimlerini profesyonel rehberlik servisimizle yakından takip ediyoruz.'
  },
];

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Handle Modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedProgram) return;
      if (e.key === 'Escape') setSelectedProgram(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProgram]);

  return (
    <div className="relative min-h-screen text-slate-800">
      <FluidBackground />
      <AIChat />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-12 py-4 bg-white/80 backdrop-blur-lg border-b border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 z-50 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <div className="w-10 h-10 bg-[#1e3a8a] rounded-lg flex items-center justify-center text-white font-bold font-heading text-xl">D</div>
          <div className="font-heading text-xl font-bold text-[#1e3a8a] tracking-tight leading-none">
            DÖŞKAYA<br/><span className="text-sm text-slate-500 font-sans font-normal tracking-wide">KOLEJİ</span>
          </div>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
          {[
            { label: 'Eğitim Modelimiz', id: 'program' },
            { label: 'Hakkımızda', id: 'about' },
            { label: 'İletişim', id: 'contact' }
          ].map((item) => (
            <button 
              key={item.id} 
              onClick={() => scrollToSection(item.id)}
              className="hover:text-[#1e3a8a] transition-colors cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </div>
        <button 
          onClick={() => scrollToSection('contact')}
          className="hidden md:inline-flex items-center gap-2 bg-[#1e3a8a] text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-[#1e40af] transition-all shadow-lg shadow-blue-900/20"
        >
          Randevu Al <ArrowRight className="w-4 h-4" />
        </button>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-slate-800 z-50 relative w-10 h-10 flex items-center justify-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
           {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 bg-white flex flex-col items-center justify-center gap-8 md:hidden"
          >
             {[
            { label: 'Eğitim Modelimiz', id: 'program' },
            { label: 'Hakkımızda', id: 'about' },
            { label: 'İletişim', id: 'contact' }
          ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-3xl font-heading font-bold text-slate-800 hover:text-[#1e3a8a]"
              >
                {item.label}
              </button>
            ))}
            <button 
              onClick={() => scrollToSection('contact')}
              className="mt-8 bg-[#f59e0b] text-white px-10 py-4 rounded-xl text-lg font-bold shadow-xl"
            >
              Randevu Al
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <header className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-4 pt-20">
        <motion.div 
          style={{ y, opacity }}
          className="z-10 text-center flex flex-col items-center w-full max-w-5xl"
        >
           {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-2 text-xs font-bold text-[#1e3a8a] tracking-widest uppercase mb-6 bg-blue-50 px-4 py-2 rounded-full border border-blue-100"
          >
            <span className="w-2 h-2 bg-[#f59e0b] rounded-full animate-pulse"/>
            <span>2025-2026 Kayıt Dönemi Başladı</span>
          </motion.div>

          {/* Main Title */}
          <div className="relative w-full mb-6">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-slate-900 tracking-tight leading-[1.1]">
              Geleceği <br/>
              <GradientText text="Şekillendiriyoruz" />
            </h1>
          </div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-2xl font-light max-w-2xl mx-auto text-slate-600 leading-relaxed mb-10"
          >
            Döşkaya Koleji olarak, Atatürk ilkeleri ışığında, çağdaş, sorgulayan ve yaratıcı bireyler yetiştiriyoruz.
          </motion.p>

          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.6 }}
             className="flex gap-4"
          >
            <button onClick={() => scrollToSection('program')} className="px-8 py-4 bg-[#1e3a8a] text-white rounded-xl font-bold hover:bg-[#1e40af] transition-all shadow-lg hover:shadow-blue-900/30">
              Eğitimimizi Keşfedin
            </button>
            <button onClick={() => scrollToSection('contact')} className="px-8 py-4 bg-white text-[#1e3a8a] border border-slate-200 rounded-xl font-bold hover:bg-slate-50 transition-all">
              Bize Ulaşın
            </button>
          </motion.div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f8fafc] to-transparent z-20 pointer-events-none"></div>
      </header>

      {/* ACADEMIC PROGRAM SECTION */}
      <section id="program" className="relative z-10 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
             <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-4">
               Akademik <span className="text-[#1e3a8a]">Programımız</span>
             </h2>
             <p className="text-slate-500 max-w-2xl mx-auto text-lg">
               Öğrencilerimizin potansiyelini en üst düzeye çıkaran bütünsel eğitim modeli.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROGRAMS.map((program) => (
              <ArtistCard key={program.id} artist={program} onClick={() => setSelectedProgram(program)} />
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="relative z-10 py-20 md:py-32 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-block px-3 py-1 mb-6 text-xs font-bold tracking-wider text-[#1e3a8a] bg-blue-50 rounded-full uppercase">
                Okul Kültürü
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-8 text-slate-900 leading-tight">
                Başarıya Giden Yolda <br/> <span className="text-[#f59e0b]">Güçlü Adımlar</span>
              </h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Döşkaya Koleji, sadece akademik başarıya değil, aynı zamanda karakter gelişimine de odaklanır. Deneyimli eğitim kadromuz, modern kampüsümüz ve zengin sosyal olanaklarımızla öğrencilerimize ilham veriyoruz.
              </p>
              
              <div className="space-y-6">
                {[
                  { icon: Brain, title: 'Analitik Düşünme', desc: 'Problem çözme yeteneği gelişmiş bireyler.' },
                  { icon: Award, title: 'LGS Başarısı', desc: 'Her yıl artan yerleştirme oranları.' },
                  { icon: Users, title: 'Sosyal Beceriler', desc: 'İletişimi kuvvetli, özgüvenli nesiller.' },
                ].map((feature, i) => (
                  <div key={i} className="flex items-start gap-4 group">
                    <div className="p-3 rounded-xl bg-[#1e3a8a]/5 group-hover:bg-[#1e3a8a] transition-colors duration-300">
                      <feature.icon className="w-6 h-6 text-[#1e3a8a] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-1">{feature.title}</h4>
                      <p className="text-sm text-slate-500">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative h-[500px] w-full order-1 lg:order-2 rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/20 group">
              <img 
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000&auto=format&fit=crop" 
                alt="Campus Life" 
                className="h-full w-full object-cover transition-transform duration-[2s] group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a8a] via-transparent to-transparent opacity-60" />
              
              <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg max-w-xs">
                <div className="text-4xl font-bold text-[#1e3a8a] mb-1">25+</div>
                <div className="text-sm font-medium text-slate-600">Yıllık Eğitim Tecrübesi</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT/APPLY SECTION */}
      <section id="contact" className="relative z-10 py-20 md:py-32 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col md:flex-row">
          
          <div className="bg-[#1e3a8a] p-10 md:p-12 text-white md:w-2/5 flex flex-col justify-between">
             <div>
               <h3 className="text-2xl font-heading font-bold mb-6">İletişim Bilgileri</h3>
               <p className="text-blue-200 text-sm mb-8">Sorularınız için bize ulaşın veya kampüsümüzü ziyaret edin.</p>
               
               <div className="space-y-6">
                 <div className="flex items-center gap-3">
                   <Phone className="w-5 h-5 text-[#f59e0b]" />
                   <span className="text-sm font-medium">+90 (212) 555 00 00</span>
                 </div>
                 <div className="flex items-center gap-3">
                   <Mail className="w-5 h-5 text-[#f59e0b]" />
                   <span className="text-sm font-medium">info@doskayakoleji.k12.tr</span>
                 </div>
                 <div className="flex items-start gap-3">
                   <MapPin className="w-5 h-5 text-[#f59e0b] mt-1" />
                   <span className="text-sm font-medium">Merkez Mah. Eğitim Cad. No:1<br/>Beşiktaş, İstanbul</span>
                 </div>
               </div>
             </div>
             
             <div className="mt-12 pt-8 border-t border-white/20">
               <p className="text-xs text-blue-200">Çalışma Saatleri: Pzt-Cum 09:00 - 18:00</p>
             </div>
          </div>

          <div className="p-10 md:p-12 md:w-3/5 bg-white">
            <div className="mb-8">
               <h3 className="text-2xl font-bold text-slate-900 mb-2">Erken Kayıt Fırsatı</h3>
               <p className="text-slate-500 text-sm">Bilgi almak için formu doldurun, eğitim danışmanlarımız sizi arasın.</p>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Adınız</label>
                  <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] text-sm" placeholder="Ad" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Soyadınız</label>
                  <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] text-sm" placeholder="Soyad" />
                </div>
              </div>
              
              <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Telefon</label>
                  <input type="tel" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] text-sm" placeholder="0555 000 00 00" />
              </div>
              
              <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase">Sınıf Seviyesi</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] text-sm text-slate-600">
                    <option>Seçiniz...</option>
                    <option>5. Sınıf</option>
                    <option>6. Sınıf</option>
                    <option>7. Sınıf</option>
                    <option>8. Sınıf (LGS)</option>
                  </select>
              </div>

              <button className="w-full bg-[#f59e0b] text-white font-bold py-4 rounded-xl hover:bg-[#d97706] transition-colors shadow-lg mt-4">
                Başvuruyu Gönder
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1e3a8a] text-white py-16 border-t border-blue-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start gap-10">
          <div>
             <div className="font-heading text-2xl font-bold tracking-tight mb-4">DÖŞKAYA KOLEJİ</div>
             <p className="text-blue-200 text-sm max-w-xs leading-relaxed">
               Geleceğin liderlerini, bilim insanlarını ve sanatçılarını yetiştirmek için buradayız.
             </p>
          </div>
          
          <div className="flex gap-8 text-sm font-medium text-blue-200">
             <a href="#" className="hover:text-white transition-colors">Hakkımızda</a>
             <a href="#" className="hover:text-white transition-colors">Akademik</a>
             <a href="#" className="hover:text-white transition-colors">Kayıt Koşulları</a>
             <a href="#" className="hover:text-white transition-colors">KVKK</a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-blue-800 text-xs text-blue-400 text-center md:text-left">
          © 2025 Döşkaya Koleji. Tüm hakları saklıdır.
        </div>
      </footer>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedProgram && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProgram(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl"
            >
              <button
                onClick={() => setSelectedProgram(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/10 text-white hover:bg-white hover:text-black transition-colors md:text-slate-800 md:bg-white/80"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                <img 
                  src={selectedProgram.image} 
                  alt={selectedProgram.title} 
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">
                <div className="inline-block self-start px-3 py-1 mb-4 text-xs font-bold tracking-wider text-[#1e3a8a] bg-blue-50 rounded-full uppercase">
                   {selectedProgram.category}
                </div>
                
                <h3 className="text-3xl font-heading font-bold text-slate-900 mb-2">
                  {selectedProgram.title}
                </h3>
                
                <p className="text-[#f59e0b] font-medium mb-6">
                  {selectedProgram.highlight}
                </p>
                
                <div className="h-px w-20 bg-slate-200 mb-6" />
                
                <p className="text-slate-600 leading-relaxed text-lg">
                  {selectedProgram.description}
                </p>

                <button className="mt-8 px-6 py-3 bg-[#1e3a8a] text-white rounded-xl font-bold hover:bg-[#1e40af] transition-colors self-start">
                  Program Detayları
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;