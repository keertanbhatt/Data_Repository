import { Link } from 'react-router-dom'
import { ArrowRight, ChevronRight, FolderOpen, GraduationCap, Heart, Shield, Users } from 'lucide-react'
import { OfficialBoardLogo } from '../components/OfficialBoardLogo'

const schemeHighlights = [
  {
    icon: Heart,
    title: 'Health & Medical Assistance',
    description: 'Support for treatment, claims, and occupational health programmes.',
  },
  {
    icon: GraduationCap,
    title: 'Education Support',
    description: 'Scholarships and education assistance for workers’ families.',
  },
  {
    icon: Shield,
    title: 'Financial Security',
    description: 'Insurance, accident relief, and welfare bond-linked benefits.',
  },
  {
    icon: Users,
    title: 'Skill Development',
    description: 'Training, coaching, and upskilling for construction workers.',
  },
]

const announcements = [
  {
    date: '12 Apr 2025',
    title: 'Revised guidelines for welfare scheme benefits',
  },
  {
    date: '08 Apr 2025',
    title: 'Updated medical assistance claim submission process',
  },
  {
    date: '02 Apr 2025',
    title: 'Skill development training schedule announced',
  },
  {
    date: '28 Mar 2025',
    title: 'Safety awareness camp registration open',
  },
]

export function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] text-primary-text">
      {/* Hero */}
      <section id="home" className="relative min-h-[92vh] lg:min-h-[880px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=2400&q=85"
          alt="Construction workers at a building site wearing safety helmets"
          className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/75 to-white/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent" />

        {/* Top bar */}
        <div className="relative z-10 mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 pt-5 md:px-8 md:pt-8">
          <div className="flex items-center gap-3 md:gap-5 min-w-0">
            <OfficialBoardLogo className="h-[72px] w-[72px] md:h-20 md:w-20 object-contain drop-shadow-sm bg-white/80 rounded-full p-0.5" />
            <div className="min-w-0 border-l border-navy/10 pl-3 md:pl-5">
              <p className="font-gujarati text-xs md:text-sm font-semibold text-[#C41E3A] leading-snug hidden sm:block">
                ગુજરાત મકાન અને અન્ય બાંધકામ શ્રમયોગી કલ્યાણ બોર્ડ
              </p>
              <p className="font-serif-display text-[11px] md:text-sm font-bold uppercase tracking-[0.08em] text-navy leading-snug mt-0.5">
                Gujarat Building &amp; Other Construction Workers&apos; Welfare Board
              </p>
              <p className="mt-1 text-[10px] md:text-xs text-secondary-text leading-snug max-w-lg">
                Labour, Skill Development and Employment Department, Govt. of Gujarat
              </p>
            </div>
          </div>

          <Link
            to="/login"
            className="shrink-0 rounded-full border-2 border-navy/15 bg-white/90 px-4 py-2 md:px-5 md:py-2.5 text-xs md:text-sm font-semibold text-navy shadow-sm hover:border-accent hover:text-accent transition-colors backdrop-blur-sm"
          >
            Staff Login
          </Link>
        </div>

        {/* Hero copy */}
        <div className="relative z-10 mx-auto max-w-[1400px] px-4 pb-16 pt-10 md:px-8 md:pt-16 lg:pb-24">
          <div className="max-w-xl lg:max-w-2xl animate-fade-in">
            <div className="h-1 w-12 bg-accent mb-5" />
            <p className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] text-secondary-text">
              Gujarat Building &amp; Other Construction Workers&apos; Welfare Board
            </p>
            <h1 className="font-serif-display mt-4 text-4xl md:text-5xl lg:text-[3.25rem] leading-[1.12] text-navy font-bold">
              They Build Gujarat.{' '}
              <span className="text-accent italic">We Stand With Them.</span>
            </h1>
            <p className="mt-5 text-sm md:text-base text-secondary-text leading-relaxed max-w-lg">
              Committed to the welfare, safety, and betterment of construction workers across Gujarat — through
              responsive schemes, dignified support, and transparent administration.
            </p>
            <p className="mt-4 text-sm text-navy/80 leading-relaxed max-w-lg border-l-2 border-accent/40 pl-4">
              <span className="font-semibold">Orders &amp; Mail Repository</span> — a centralized digital space for
              official orders, correspondence, bills, and administrative documents.{' '}
              <span className="text-secondary-text">(UI demonstration prototype)</span>
            </p>
            <div className="mt-8 flex flex-wrap gap-3 md:gap-4">
              <a
                href="#schemes"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent/25 hover:bg-[#e07d1f] transition-all hover:shadow-xl"
              >
                Explore Welfare Schemes
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 rounded-full border-2 border-navy/20 bg-white/90 px-6 py-3 text-sm font-semibold text-navy hover:border-navy hover:bg-white transition-all shadow-sm"
              >
                <FolderOpen className="h-4 w-4 text-accent" />
                Access Repository
              </Link>
            </div>
            <p className="mt-12 text-[10px] font-bold uppercase tracking-[0.25em] text-navy/50">
              Safe Work / Secure Future
            </p>
          </div>
        </div>
      </section>

      {/* Schemes */}
      <section id="schemes" className="relative bg-white py-16 md:py-24 overflow-hidden">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-6 items-center">
            <div className="lg:col-span-4 lg:pr-6">
              <div className="h-1 w-12 bg-accent mb-4" />
              <h2 className="font-serif-display text-3xl md:text-4xl text-navy font-bold leading-tight">
                Supporting Every Stage of Their <span className="text-accent italic">Journey</span>
              </h2>
              <p className="mt-4 text-secondary-text text-sm md:text-base leading-relaxed">
                From health and education to financial security and skills — welfare schemes are designed to stand
                beside workers and their families at every step.
              </p>
              <a
                href="#services"
                className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-navy hover:text-accent transition-colors group"
              >
                Explore All Schemes
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            <div className="lg:col-span-4 relative flex justify-center">
              <div
                className="relative w-full max-w-sm aspect-[3/4] overflow-hidden shadow-2xl"
                style={{
                  clipPath: 'polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)',
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1581094796089-850806259089?auto=format&fit=crop&w=800&q=80"
                  alt="Construction professional at work"
                  className="h-full w-full object-cover"
                />
              </div>
              <div
                className="absolute -right-2 top-8 w-24 h-32 bg-accent/20 -z-10 hidden md:block"
                style={{ clipPath: 'polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%)' }}
              />
            </div>

            <div id="services" className="lg:col-span-4 space-y-3">
              {schemeHighlights.map((item) => (
                <div
                  key={item.title}
                  className="group flex gap-4 rounded-sm bg-[#F3EDE4] hover:bg-[#EDE4D6] border border-[#E8DFD3] px-5 py-4 transition-colors"
                >
                  <div className="rounded-full bg-white p-2.5 h-fit shadow-sm group-hover:shadow transition-shadow">
                    <item.icon className="h-5 w-5 text-accent" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3 className="font-serif-display text-base font-bold text-navy">{item.title}</h3>
                    <p className="mt-1 text-xs md:text-sm text-secondary-text leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About + Updates */}
      <section id="about" className="py-16 md:py-20 bg-[#FAFAF8]">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            <div className="relative">
              <div
                className="relative overflow-hidden shadow-xl aspect-[4/3] max-h-[420px]"
                style={{
                  clipPath:
                    'polygon(0% 8%, 85% 0%, 100% 35%, 92% 100%, 15% 95%, 0% 60%)',
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&w=1200&q=80"
                  alt="Construction worker at a building site during golden hour"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <div className="h-1 w-10 bg-accent mb-3" />
                  <h2 className="font-serif-display text-2xl md:text-3xl text-white font-bold">
                    Builders of A Stronger <span className="text-accent italic">Gujarat</span>
                  </h2>
                  <p className="mt-2 text-sm text-white/85 max-w-md">
                    Recognizing the people who shape our cities and infrastructure — and the board&apos;s role in
                    protecting their welfare and dignity.
                  </p>
                  <a
                    href="#updates"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-white hover:text-accent transition-colors"
                  >
                    Know More
                    <ChevronRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>

            <div id="updates" className="lg:pt-4">
              <div className="h-1 w-12 bg-accent mb-4" />
              <h2 className="font-serif-display text-2xl md:text-3xl text-navy font-bold">Announcements &amp; Updates</h2>
              <p className="mt-2 text-sm text-secondary-text mb-6">
                Sample circulars and notices for demonstration — not live government publications.
              </p>
              <div className="rounded-2xl border border-border bg-white shadow-sm divide-y divide-border overflow-hidden">
                {announcements.map((item) => (
                  <button
                    key={item.date + item.title}
                    type="button"
                    className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-page/80 transition-colors group"
                    onClick={() => {}}
                  >
                    <div className="shrink-0 text-center min-w-[72px]">
                      <p className="text-lg font-bold text-navy leading-none">{item.date.split(' ')[0]}</p>
                      <p className="text-[10px] uppercase tracking-wide text-secondary-text mt-0.5">
                        {item.date.split(' ').slice(1).join(' ')}
                      </p>
                    </div>
                    <p className="flex-1 text-sm text-primary-text group-hover:text-navy transition-colors">
                      {item.title}
                    </p>
                    <ChevronRight className="h-5 w-5 text-accent shrink-0 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
              </div>
              <button
                type="button"
                className="mt-4 text-sm font-semibold text-navy hover:text-accent inline-flex items-center gap-1 transition-colors"
              >
                View All Updates
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Repository CTA strip */}
      <section className="relative overflow-hidden">
        <div className="grid lg:grid-cols-12 min-h-[200px]">
          <div className="lg:col-span-5 bg-navy text-white px-6 py-10 md:px-10 md:py-12 flex flex-col justify-center relative z-10">
            <FolderOpen className="h-10 w-10 text-accent mb-4" strokeWidth={1.5} />
            <h2 className="font-serif-display text-2xl md:text-3xl font-bold">Access Our Repository</h2>
            <p className="mt-2 text-sm text-white/80 max-w-md">
              Browse orders, bills, letters, and meeting minutes in one organized digital space — demo login for
              Admin, GLO, and Project Manager roles.
            </p>
            <Link
              to="/login"
              className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-[#e07d1f] transition-colors shadow-lg"
            >
              Go to Repository
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="lg:col-span-7 relative min-h-[180px]">
            <img
              src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80"
              alt="Yellow hard hat on a construction site"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/40 to-transparent lg:from-navy lg:w-1/4" />
            <div
              className="absolute inset-y-0 left-0 w-16 bg-accent hidden lg:block"
              style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-white py-10 md:py-12">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="flex gap-4 items-start">
            <OfficialBoardLogo className="h-16 w-16 object-contain" />
            <div>
              <p className="font-gujarati text-sm font-semibold text-navy leading-snug">
                ગુજરાત મકાન અને અન્ય બાંધકામ શ્રમયોગી કલ્યાણ બોર્ડ
              </p>
              <p className="mt-1 text-xs text-secondary-text max-w-xs">
                Gujarat Building &amp; Other Construction Workers&apos; Welfare Board
              </p>
            </div>
          </div>
          <div className="text-center md:text-right">
            <p className="font-serif-display text-lg text-navy">
              Welfare <span className="text-accent mx-2">/</span> Dignity{' '}
              <span className="text-accent mx-2">/</span> Progress
            </p>
            <p className="mt-2 text-xs text-secondary-text">Accessible · Designed for All · UI Demo Prototype</p>
            <Link to="/login" className="mt-3 inline-block text-sm font-medium text-accent hover:underline">
              Staff Login
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
