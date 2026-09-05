import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/admin-dashboard");
    } catch {
      setError("E-posta veya şifre hatalı.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-6">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-charcoal">
            ARDINI
          </h1>
          <p className="mt-2 text-sm text-gray-500">Yönetici Girişi</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-black/5"
        >
          {error && (
            <div className="mb-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <label className="mb-1.5 block text-sm font-medium text-charcoal">
            E-posta
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-5 w-full rounded-lg border border-black/10 px-4 py-3 text-sm focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/20"
            placeholder="admin@ardini.com"
          />

          <label className="mb-1.5 block text-sm font-medium text-charcoal">
            Şifre
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-7 w-full rounded-lg border border-black/10 px-4 py-3 text-sm focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/20"
            placeholder="••••••••"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-navy py-3.5 text-sm font-semibold text-white transition-colors hover:bg-navy-light disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>
        </form>
      </div>
    </div>
  );
}
