import { useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { Archive, ChevronRight, LayoutDashboard, LogOut, Menu, PlusCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { OfficialBoardLogo } from './OfficialBoardLogo'

const roleLabels = {
  admin: 'Admin',
  glo: 'GLO Officer',
  pm: 'Project Manager',
}

const roleBadgeClass = {
  admin: 'bg-navy text-white',
  glo: 'bg-blue-secondary text-white',
  pm: 'bg-accent text-white',
}

interface DashboardLayoutProps {
  basePath: string
  pageTitle: string
}

export function DashboardLayout({ basePath, pageTitle }: DashboardLayoutProps) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (!user) return null

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const navItems = [
    { to: basePath, label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: `${basePath}/repository`, label: 'Orders & Mail Repository', icon: Archive, end: false },
    ...(user.role === 'pm'
      ? [{ to: `${basePath}/add-record`, label: 'Add New Record', icon: PlusCircle, end: false }]
      : []),
  ]

  const sidebar = (
    <div className="flex h-full flex-col bg-white border-r border-[#E8DFD3]">
      <div className="p-5 border-b border-[#E8DFD3] bg-[#FAFAF8]">
        <Link to="/" className="flex items-center gap-3 group">
          <OfficialBoardLogo className="h-14 w-14 object-contain shrink-0" />
          <div className="min-w-0">
            <p className="font-gujarati text-[11px] font-semibold text-[#C41E3A] leading-snug line-clamp-2">
              ગુજરાત BOCW બોર્ડ
            </p>
            <p className="text-[10px] text-secondary-text mt-0.5 leading-snug">Orders &amp; Mail Repository</p>
          </div>
        </Link>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm font-medium transition-all border-l-[3px] ${
                isActive
                  ? 'border-accent bg-[#F3EDE4] text-navy shadow-sm'
                  : 'border-transparent text-secondary-text hover:bg-[#FAF7F2] hover:text-navy'
              }`
            }
          >
            <item.icon className="h-5 w-5 shrink-0" strokeWidth={1.75} />
            <span className="leading-snug">{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="p-3 border-t border-[#E8DFD3] bg-navy">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-full px-3 py-2.5 text-sm font-medium text-white/90 hover:bg-white/10 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex">
      <aside className="hidden lg:block w-[272px] shrink-0 fixed inset-y-0 left-0 z-30 shadow-sm">{sidebar}</aside>

      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <button
            type="button"
            className="flex-1 bg-black/40"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          />
          <div className="w-[min(100%,272px)] shadow-2xl">{sidebar}</div>
        </div>
      )}

      <div className="flex-1 lg:ml-[272px] flex flex-col min-h-screen">
        <header className="sticky top-0 z-20 border-b border-[#E8DFD3] bg-white/95 backdrop-blur-sm">
          <div className="flex items-center justify-between gap-4 px-4 py-3 md:px-8">
            <div className="flex items-center gap-3 min-w-0">
              <button
                type="button"
                className="lg:hidden rounded-lg p-2 hover:bg-[#F3EDE4]"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5 text-navy" />
              </button>
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-secondary-text hidden sm:block">
                  Gujarat BOCW Welfare Board
                </p>
                <p className="font-serif-display text-base md:text-lg font-bold text-navy truncate">{pageTitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-primary-text">{user.displayName}</p>
                <span
                  className={`inline-block mt-0.5 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${roleBadgeClass[user.role]}`}
                >
                  {roleLabels[user.role]}
                </span>
              </div>
              <div
                className="h-10 w-10 rounded-full bg-navy ring-2 ring-accent/30 flex items-center justify-center text-white text-sm font-bold"
                title={user.displayName}
              >
                {user.displayName.charAt(0)}
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-[#E8DFD3] px-4 py-2 text-xs font-semibold text-navy hover:border-accent hover:text-accent transition-colors"
              >
                <LogOut className="h-3.5 w-3.5" />
                Logout
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8 max-w-[1400px] w-full mx-auto">
          <Outlet />
        </main>

        <footer className="border-t border-[#E8DFD3] bg-white py-4 px-4 md:px-8">
          <p className="text-center text-[10px] text-secondary-text tracking-wide">
            Welfare · Dignity · Progress — UI demonstration prototype
          </p>
        </footer>
      </div>
    </div>
  )
}

export function Breadcrumb({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav className="mb-4 flex flex-wrap items-center gap-1 text-sm text-secondary-text">
      {items.map((item, i) => (
        <span key={item.label} className="flex items-center gap-1">
          {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-accent" />}
          {item.to ? (
            <Link to={item.to} className="hover:text-navy transition-colors font-medium">
              {item.label}
            </Link>
          ) : (
            <span className="text-navy font-serif-display font-bold">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
