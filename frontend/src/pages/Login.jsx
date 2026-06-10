import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login, getProfile } from '../api'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { setToken, setUser } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setError('')
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const data = await login(form)
      if (!data.access_token) {
        setError(data.detail || 'Invalid credentials')
        return
      }
      setToken(data.access_token)
      const profile = await getProfile()
      setUser(profile)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-ink-900 flex-col justify-between p-12">
        <div>
          <span className="font-mono text-amber-400 text-sm tracking-widest uppercase">Notely</span>
        </div>
        <div>
          <h1 className="text-ink-50 text-5xl font-light leading-tight mb-6">
            Your thoughts,<br />
            <em className="font-light text-ink-300">organized.</em>
          </h1>
          <p className="text-ink-400 text-base leading-relaxed max-w-xs">
            A simple place to capture, organise, and revisit everything that matters.
          </p>
        </div>
        <div className="text-ink-600 text-xs font-mono">© 2025 Notely</div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8 bg-ink-50">
        <div className="w-full max-w-sm">
          <div className="lg:hidden mb-10">
            <span className="font-mono text-amber-500 text-sm tracking-widest uppercase">Notely</span>
          </div>

          <h2 className="text-ink-900 text-2xl font-medium mb-1">Welcome back</h2>
          <p className="text-ink-400 text-sm mb-8">Sign in to your account</p>

          {error && (
            <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-ink-500 mb-1.5 uppercase tracking-wider">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full px-4 py-3 bg-white border border-ink-200 rounded-lg text-ink-900 text-sm placeholder-ink-300 focus:outline-none focus:border-ink-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-ink-500 mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-white border border-ink-200 rounded-lg text-ink-900 text-sm placeholder-ink-300 focus:outline-none focus:border-ink-500 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-ink-900 text-ink-50 rounded-lg text-sm font-medium hover:bg-ink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-ink-400">
            No account?{' '}
            <Link to="/signup" className="text-ink-700 font-medium hover:text-ink-900 underline underline-offset-2">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
