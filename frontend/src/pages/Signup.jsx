import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signup } from '../api'

export default function Signup() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
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
      const data = await signup(form)
      if (data.message === 'Email already registered') {
        setError('This email is already registered.')
        return
      }
      navigate('/login')
    } catch (err) {
      setError(err.message || 'Signup failed')
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
            Start capturing<br />
            <em className="font-light text-ink-300">what matters.</em>
          </h1>
          <p className="text-ink-400 text-base leading-relaxed max-w-xs">
            Free. Simple. Yours. Create an account and start writing in seconds.
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

          <h2 className="text-ink-900 text-2xl font-medium mb-1">Create account</h2>
          <p className="text-ink-400 text-sm mb-8">Get started for free</p>

          {error && (
            <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-ink-500 mb-1.5 uppercase tracking-wider">
                Name
              </label>
              <input
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                required
                minLength={4}
                placeholder="John Doe"
                className="w-full px-4 py-3 bg-white border border-ink-200 rounded-lg text-ink-900 text-sm placeholder-ink-300 focus:outline-none focus:border-ink-500 transition-colors"
              />
            </div>

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
                minLength={6}
                placeholder="Min. 6 characters"
                className="w-full px-4 py-3 bg-white border border-ink-200 rounded-lg text-ink-900 text-sm placeholder-ink-300 focus:outline-none focus:border-ink-500 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-ink-900 text-ink-50 rounded-lg text-sm font-medium hover:bg-ink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-ink-400">
            Already have an account?{' '}
            <Link to="/login" className="text-ink-700 font-medium hover:text-ink-900 underline underline-offset-2">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
