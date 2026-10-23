import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Eye, EyeOff, FolderOpen, HardHat, Shield, UserCog } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { OfficialBoardLogo } from '../components/OfficialBoardLogo'
import { DEMO_CREDENTIALS, type UserRole } from '../types'

const roles: { id: UserRole; title: string; description: string; icon: typeof Shield }[] = [
  {
    id: 'admin',
    title: 'Admin',
    description: 'Full repository visibility, summary analytics, and record inspection.',
    icon: Shield,
  },
  {
    id: 'glo',
    title: 'GLO Officer',
    description: 'View all records, apply filters, and open document previews.',
    icon: UserCog,
  },
  {
    id: 'pm',
    title: 'Project Manager',
    description: 'Add new records and browse the repository in read-only mode.',
    icon: HardHat,
  },
]

const rolePaths: Record<UserRole, string> = {
  admin: '/admin',
  glo: '/glo',
  pm: '/pm',
}

function BoardHeader({ compact }: { compact?: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${compact ? '' : 'md:gap-4'}`}>
      <OfficialBoardLogo
        className={`object-contain drop-shadow-sm bg-white/90 rounded-full p-0.5 shrink-0 ${
          compact ? 'h-14 w-14' : 'h-16 w-16 md:h-[72px] md:w-[72px]'
        }`}
      />
      <div className="min-w-0 border-l border-navy/10 pl-3 md:pl-4">
        <p className="font-gujarati text-xs font-semibold text-[#C41E3A] leading-snug hidden sm:block">
          ગુજરાત મકાન અને અન્ય બાંધકામ શ્રમયોગી કલ્યાણ બોર્ડ
        </p>
        <p className="font-serif-display text-[10px] md:text-xs font-bold uppercase tracking-[0.06em] text-navy leading-snug">
          Gujarat BOCW Welfare Board
        </p>
        {!compact && (
          <p className="mt-0.5 text-[10px] text-secondary-text hidden md:block">
            Labour, Skill Development and Employment Department
          </p>
        )}
      </div>
    </div>
  )
}

export function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [selectedRole, setSelectedRole] = useState<UserRole>('admin')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const fillDemo = (role: UserRole) => {
    setSelectedRole(role)
    setUsername(DEMO_CREDENTIALS[role].username)
    setPassword(DEMO_CREDENTIALS[role].password)
    setError('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!username.trim()) {
      setError('Please enter your username.')
      return
    }
    if (!password) {
      setError('Please enter your password.')
      return
    }
    setLoading(true)
    setTimeout(() => {
      const err = login(selectedRole, username, password)
      setLoading(false)
      if (err) {
        setError(err)
        return
      }
      navigate(rolePaths[selectedRole])
    }, 400)
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex flex-col lg:flex-row">
      {/* Brand panel */}
      <aside className="relative lg:w-[42%] xl:w-[44%] min-h-[240px] lg:min-h-screen overflow-hidden shrink-0">
        <img
          src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1600&q=85"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/85 to-navy/75 lg:from-white/92 lg:via-navy/40 lg:to-navy/90" />
        <div className="relative z-10 flex flex-col h-full p-6 md:p-8 lg:p-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-navy/80 hover:text-accent transition-colors w-fit"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <div className="mt-8 lg:mt-12 hidden lg:block">
            <BoardHeader />
          </div>

          <div className="mt-auto pb-4 lg:pb-8 max-w-md">
            <div className="h-1 w-12 bg-accent mb-4" />
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-navy/60 lg:text-white/70">
              Orders &amp; Mail Repository
            </p>
            <h1 className="font-serif-display mt-3 text-2xl md:text-3xl lg:text-4xl text-navy lg:text-white font-bold leading-tight">
              Secure access for{' '}
              <span className="text-accent italic">authorized staff</span>
            </h1>
            <p className="mt-4 text-sm text-secondary-text lg:text-white/85 leading-relaxed">
              Sign in with your assigned role to manage or view official orders, correspondence, bills, and
              administrative records. This is a frontend demonstration — no live authentication.
            </p>
            <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.25em] text-navy/40 lg:text-white/50">
              Safe Work / Secure Future
            </p>
          </div>
        </div>
      </aside>

      {/* Login panel */}
      <main className="flex-1 flex flex-col min-h-0">
        <div className="lg:hidden px-4 pt-5 pb-2 border-b border-border bg-white">
          <BoardHeader compact />
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-8 md:px-8 lg:px-10 xl:px-14 flex items-start lg:items-center justify-center">
          <div className="w-full max-w-xl animate-fade-in py-4">
            <div className="mb-6 lg:mb-8">
              <div className="flex items-center gap-2 text-accent mb-2">
                <FolderOpen className="h-5 w-5" strokeWidth={1.75} />
                <span className="text-xs font-semibold uppercase tracking-wider">Staff portal</span>
              </div>
              <h2 className="font-serif-display text-2xl md:text-3xl font-bold text-navy">Sign in to Repository</h2>
              <p className="mt-2 text-sm text-secondary-text">Choose your role, then enter demo credentials below.</p>
            </div>

            <p className="text-xs font-semibold uppercase tracking-wide text-secondary-text mb-3">Select role</p>
            <div className="grid gap-3 mb-6 sm:grid-cols-3">
              {roles.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => {
                    setSelectedRole(role.id)
                    setError('')
                  }}
                  className={`rounded-sm border p-4 text-left transition-all ${
                    selectedRole === role.id
                      ? 'border-accent bg-[#F3EDE4] shadow-md ring-1 ring-accent/30'
                      : 'border-[#E8DFD3] bg-[#FAF7F2] hover:border-accent/40 hover:bg-[#F3EDE4]/60'
                  }`}
                >
                  <div
                    className={`rounded-full bg-white p-2 w-fit shadow-sm ${
                      selectedRole === role.id ? 'ring-2 ring-accent/20' : ''
                    }`}
                  >
                    <role.icon
                      className={`h-5 w-5 ${selectedRole === role.id ? 'text-accent' : 'text-navy'}`}
                      strokeWidth={1.75}
                    />
                  </div>
                  <p className="mt-3 text-sm font-serif-display font-bold text-navy">{role.title}</p>
                  <p className="mt-1 text-[11px] text-secondary-text leading-snug line-clamp-3">{role.description}</p>
                </button>
              ))}
            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-border bg-white p-6 md:p-8 shadow-sm space-y-4"
            >
              {error && (
                <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">{error}</div>
              )}
              <div>
                <label htmlFor="username" className="mb-1.5 block text-sm font-medium text-navy">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  autoComplete="username"
                  className="w-full rounded-lg border border-border bg-[#FAFAF8] px-3 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value)
                    setError('')
                  }}
                />
              </div>
              <div>
                <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-navy">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    className="w-full rounded-lg border border-border bg-[#FAFAF8] px-3 py-2.5 pr-10 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      setError('')
                    }}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary-text hover:text-navy"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-accent py-3 text-sm font-semibold text-white shadow-lg shadow-accent/20 hover:bg-[#e07d1f] transition-colors disabled:opacity-60"
              >
                {loading ? 'Signing in…' : 'Sign In'}
                {!loading && <ArrowRight className="h-4 w-4" />}
              </button>
            </form>

            <div className="mt-6 overflow-hidden rounded-xl border border-[#E8DFD3] bg-white shadow-sm">
              <div className="bg-navy px-4 py-2.5">
                <p className="text-xs font-semibold uppercase tracking-wide text-white/90">Demo credentials</p>
              </div>
              <div className="divide-y divide-border p-2">
                {(Object.keys(DEMO_CREDENTIALS) as UserRole[]).map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => fillDemo(role)}
                    className="w-full flex flex-wrap items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-left text-xs hover:bg-[#F3EDE4]/80 transition-colors"
                  >
                    <span className="font-serif-display font-bold text-navy">
                      {role === 'pm' ? 'Project Manager' : role === 'glo' ? 'GLO Officer' : 'Admin'}
                    </span>
                    <span className="text-secondary-text font-mono text-[11px]">
                      {DEMO_CREDENTIALS[role].username} / {DEMO_CREDENTIALS[role].password}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
