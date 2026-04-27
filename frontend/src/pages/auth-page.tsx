import { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { type SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { ArrowRight, CheckCircle2, GraduationCap, ShieldCheck } from 'lucide-react'
import { api } from '../lib/api'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'

const loginSchema = z.object({
  email: z.email('Enter a valid email'),
  password: z.string().min(8, 'Use at least 8 characters'),
  remember: z.boolean(),
})

const registerSchema = z.object({
  name: z.string().min(2, 'Enter your full name'),
  collegeEmail: z
    .email('Use your college email')
    .refine(
      (value) =>
        value.endsWith('.edu') ||
        value.endsWith('.ac.in') ||
        value.endsWith('.edu.in'),
      'Use a valid college domain',
    ),
  password: z.string().min(8, 'Use at least 8 characters'),
  collegeName: z.string().min(2, 'Enter your college'),
  department: z.string().min(2, 'Enter your department'),
  year: z.number().min(1).max(5),
})

type LoginInput = z.input<typeof loginSchema>
type LoginValues = z.output<typeof loginSchema>
type RegisterInput = z.input<typeof registerSchema>
type RegisterValues = z.output<typeof registerSchema>

export function AuthPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login')

  const loginForm = useForm<LoginInput, unknown, LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'ananya.mehta@iitb.ac.in',
      password: 'CampusRent123',
      remember: true,
    },
  })

  const registerForm = useForm<RegisterInput, unknown, RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      collegeEmail: '',
      password: '',
      collegeName: '',
      department: '',
      year: 2,
    },
  })

  const onLoginSubmit: SubmitHandler<LoginValues> = async (values) => {
    await api.post('/api/auth/login', values)
    toast.success('Welcome back. Your borrower and lender flows are ready.')
  }

  const onRegisterSubmit: SubmitHandler<RegisterValues> = async (values) => {
    await api.post('/api/auth/register', values)
    toast.success('Account created. OTP verification is ready to send next.')
    registerForm.reset()
    setMode('login')
  }

  return (
    <main className="min-h-[calc(100vh-84px)]">
      <section className="grid min-h-[calc(100vh-84px)] lg:grid-cols-[1.05fr_0.95fr]">
        <div
          className="relative overflow-hidden px-4 py-10 sm:px-6 lg:px-8"
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgba(6,24,22,0.9), rgba(15,118,110,0.62)), url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1400&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="hero-grid absolute inset-0 opacity-35" />
          <div className="shell relative h-full py-6 lg:py-12">
            <div className="max-w-2xl text-white">
              <p className="eyebrow text-[rgba(216,243,236,0.8)]">Verified entry</p>
              <h1 className="mt-5 text-5xl font-extrabold leading-tight sm:text-6xl">
                Student identity is the trust layer, not an afterthought.
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-8 text-[rgba(255,255,255,0.76)]">
                CampusRent only works when listings, conversations, pickups, and
                payments all feel grounded in real college communities.
              </p>

              <div className="mt-10 grid gap-4">
                {[
                  {
                    icon: GraduationCap,
                    title: 'College email first',
                    detail:
                      'Whitelist-ready verification keeps every conversation inside a real student network.',
                  },
                  {
                    icon: ShieldCheck,
                    title: 'Protected rental handoffs',
                    detail:
                      'Deposits, reviews, and time-boxed sessions reduce friction before lab or exam crunch.',
                  },
                  {
                    icon: CheckCircle2,
                    title: 'Fast onboarding path',
                    detail:
                      'Verify email, complete profile, then choose to browse or list in minutes.',
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[24px] border border-white/10 bg-white/10 p-5 backdrop-blur-xl"
                  >
                    <div className="flex items-start gap-3">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                        <item.icon size={18} />
                      </span>
                      <div>
                        <h3 className="text-xl font-bold">{item.title}</h3>
                        <p className="mt-2 text-sm leading-7 text-[rgba(255,255,255,0.72)]">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="shell flex items-center py-10 lg:py-12">
          <div className="surface-strong w-full rounded-[34px] p-6 sm:p-8">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="eyebrow">Access campus</p>
                <h2 className="mt-2 text-3xl font-bold text-[color:var(--foreground)]">
                  {mode === 'login' ? 'Sign into CampusRent' : 'Create your account'}
                </h2>
              </div>
              <div className="rounded-full bg-[color:var(--background-strong)] p-1">
                <button
                  type="button"
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    mode === 'login'
                      ? 'bg-slate-950 text-white'
                      : 'text-[color:var(--muted)]'
                  }`}
                  onClick={() => setMode('login')}
                >
                  Login
                </button>
                <button
                  type="button"
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    mode === 'register'
                      ? 'bg-slate-950 text-white'
                      : 'text-[color:var(--muted)]'
                  }`}
                  onClick={() => setMode('register')}
                >
                  Register
                </button>
              </div>
            </div>

            {mode === 'login' ? (
              <form
                className="mt-8 grid gap-4"
                onSubmit={loginForm.handleSubmit(onLoginSubmit)}
              >
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[color:var(--foreground)]">
                    College email
                  </label>
                  <Input {...loginForm.register('email')} />
                  {loginForm.formState.errors.email ? (
                    <p className="mt-2 text-sm text-red-600">
                      {loginForm.formState.errors.email.message}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[color:var(--foreground)]">
                    Password
                  </label>
                  <Input type="password" {...loginForm.register('password')} />
                  {loginForm.formState.errors.password ? (
                    <p className="mt-2 text-sm text-red-600">
                      {loginForm.formState.errors.password.message}
                    </p>
                  ) : null}
                </div>

                <label className="flex items-center gap-3 text-sm text-[color:var(--muted)]">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-[color:var(--teal)]"
                    {...loginForm.register('remember')}
                  />
                  Remember me on this device
                </label>

                <Button className="mt-2 rounded-full" type="submit">
                  Continue to dashboard
                  <ArrowRight size={16} />
                </Button>
              </form>
            ) : (
              <form
                className="mt-8 grid gap-4"
                onSubmit={registerForm.handleSubmit(onRegisterSubmit)}
              >
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[color:var(--foreground)]">
                    Full name
                  </label>
                  <Input {...registerForm.register('name')} />
                  {registerForm.formState.errors.name ? (
                    <p className="mt-2 text-sm text-red-600">
                      {registerForm.formState.errors.name.message}
                    </p>
                  ) : null}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[color:var(--foreground)]">
                      College email
                    </label>
                    <Input {...registerForm.register('collegeEmail')} />
                    {registerForm.formState.errors.collegeEmail ? (
                      <p className="mt-2 text-sm text-red-600">
                        {registerForm.formState.errors.collegeEmail.message}
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[color:var(--foreground)]">
                      Password
                    </label>
                    <Input type="password" {...registerForm.register('password')} />
                    {registerForm.formState.errors.password ? (
                      <p className="mt-2 text-sm text-red-600">
                        {registerForm.formState.errors.password.message}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[color:var(--foreground)]">
                      College name
                    </label>
                    <Input {...registerForm.register('collegeName')} />
                    {registerForm.formState.errors.collegeName ? (
                      <p className="mt-2 text-sm text-red-600">
                        {registerForm.formState.errors.collegeName.message}
                      </p>
                    ) : null}
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-[color:var(--foreground)]">
                      Department
                    </label>
                    <Input {...registerForm.register('department')} />
                    {registerForm.formState.errors.department ? (
                      <p className="mt-2 text-sm text-red-600">
                        {registerForm.formState.errors.department.message}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[color:var(--foreground)]">
                    Year
                  </label>
                  <Input
                    type="number"
                    min={1}
                    max={5}
                    {...registerForm.register('year', { valueAsNumber: true })}
                  />
                  {registerForm.formState.errors.year ? (
                    <p className="mt-2 text-sm text-red-600">
                      {registerForm.formState.errors.year.message}
                    </p>
                  ) : null}
                </div>

                <Button className="mt-2 rounded-full" type="submit">
                  Create verified account
                  <ArrowRight size={16} />
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
