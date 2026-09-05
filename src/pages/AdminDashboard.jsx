import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  createCategory,
  createProduct,
  deleteCategory,
  deleteProduct,
  subscribeToCategories,
  subscribeToProducts,
  updateProduct,
} from "../firebase/products";

const EMPTY_FORM = {
  name: "",
  description: "",
  imageUrl: "",
  redirectUrl: "",
  category: "",
};

export default function AdminDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");

  const [newCategoryName, setNewCategoryName] = useState("");

  useEffect(() => {
    const unsubProducts = subscribeToProducts(setProducts);
    const unsubCategories = subscribeToCategories(setCategories);
    return () => {
      unsubProducts();
      unsubCategories();
    };
  }, []);

  function resetForm() {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setFormError("");
  }

  function startEdit(product) {
    setEditingId(product.id);
    setForm({
      name: product.name,
      description: product.description,
      imageUrl: product.imageUrl,
      redirectUrl: product.redirectUrl,
      category: product.category,
    });
    setFormError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError("");

    if (!form.category) {
      setFormError("Lütfen bir kategori seçin.");
      return;
    }

    setSaving(true);
    try {
      if (editingId) {
        await updateProduct(editingId, form);
      } else {
        await createProduct(form);
      }

      resetForm();
    } catch (error) {
      setFormError("Ürün kaydedilirken bir hata oluştu: " + error.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(product) {
    if (!window.confirm(`"${product.name}" ürününü silmek istediğinize emin misiniz?`)) {
      return;
    }
    await deleteProduct(product.id);
    if (editingId === product.id) resetForm();
  }

  async function handleAddCategory(e) {
    e.preventDefault();
    const name = newCategoryName.trim();
    if (!name) return;
    await createCategory(name);
    setNewCategoryName("");
  }

  async function handleDeleteCategory(category) {
    const inUse = products.some((p) => p.category === category.name);
    if (inUse) {
      window.alert("Bu kategoriye bağlı ürünler var. Önce ürünleri güncelleyin veya silin.");
      return;
    }
    if (!window.confirm(`"${category.name}" kategorisini silmek istediğinize emin misiniz?`)) {
      return;
    }
    await deleteCategory(category.id);
  }

  async function handleLogout() {
    await logout();
    navigate("/admin-login");
  }

  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b border-black/5 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <h1 className="text-xl font-semibold tracking-tight text-charcoal">
            Yönetim Paneli
          </h1>
          <button
            onClick={handleLogout}
            className="rounded-full border border-black/10 px-5 py-2.5 text-sm font-medium text-charcoal transition-colors hover:bg-cream-dark"
          >
            Çıkış Yap
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-black/5">
              <h2 className="text-lg font-semibold text-charcoal">
                {editingId ? "Ürünü Düzenle" : "Yeni Ürün Ekle"}
              </h2>

              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                {formError && (
                  <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                    {formError}
                  </div>
                )}

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-charcoal">
                    Ürün Adı
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-lg border border-black/10 px-4 py-3 text-sm focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/20"
                    placeholder="Örn. Tuvalet Kağıtlığı"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-charcoal">
                    Açıklama
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full rounded-lg border border-black/10 px-4 py-3 text-sm focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/20"
                    placeholder="Ürün açıklamasını girin"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-charcoal">
                    Kategori
                  </label>
                  <select
                    required
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full rounded-lg border border-black/10 bg-white px-4 py-3 text-sm focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/20"
                  >
                    <option value="" disabled>
                      Kategori seçin
                    </option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-charcoal">
                    Yönlendirme Linki (Satış Sayfası)
                  </label>
                  <input
                    type="url"
                    required
                    value={form.redirectUrl}
                    onChange={(e) => setForm({ ...form, redirectUrl: e.target.value })}
                    className="w-full rounded-lg border border-black/10 px-4 py-3 text-sm focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/20"
                    placeholder="https://www.pazaryeri.com/urun/..."
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-charcoal">
                    Ürün Görseli (Link)
                  </label>
                  <input
                    type="url"
                    required
                    value={form.imageUrl}
                    onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                    className="w-full rounded-lg border border-black/10 px-4 py-3 text-sm focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/20"
                    placeholder="https://ornek.com/gorsel.jpg"
                  />
                  {form.imageUrl && (
                    <img
                      src={form.imageUrl}
                      alt="Önizleme"
                      className="mt-4 h-40 w-40 rounded-xl object-cover ring-1 ring-black/5"
                      onError={(e) => (e.currentTarget.style.visibility = "hidden")}
                      onLoad={(e) => (e.currentTarget.style.visibility = "visible")}
                    />
                  )}
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="rounded-full bg-navy px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-light disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {saving ? "Kaydediliyor..." : editingId ? "Değişiklikleri Kaydet" : "Ürünü Ekle"}
                  </button>
                  {editingId && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="rounded-full border border-black/10 px-7 py-3 text-sm font-medium text-charcoal transition-colors hover:bg-cream-dark"
                    >
                      İptal
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="mt-10 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-black/5">
              <h2 className="text-lg font-semibold text-charcoal">
                Ürünler ({products.length})
              </h2>
              <div className="mt-6 divide-y divide-black/5">
                {products.map((product) => (
                  <div key={product.id} className="flex items-center gap-4 py-4">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="h-16 w-16 flex-shrink-0 rounded-lg object-cover ring-1 ring-black/5"
                      />
                    ) : (
                      <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-cream-dark text-[10px] text-gray-400 ring-1 ring-black/5">
                        Görsel Yok
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-charcoal">
                        {product.name}
                      </p>
                      <p className="text-xs text-gray-400">{product.category}</p>
                    </div>
                    <button
                      onClick={() => startEdit(product)}
                      className="rounded-full border border-black/10 px-4 py-2 text-xs font-medium text-charcoal transition-colors hover:bg-cream-dark"
                    >
                      Düzenle
                    </button>
                    <button
                      onClick={() => handleDelete(product)}
                      className="rounded-full border border-red-200 px-4 py-2 text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
                    >
                      Sil
                    </button>
                  </div>
                ))}
                {products.length === 0 && (
                  <p className="py-6 text-center text-sm text-gray-400">
                    Henüz ürün eklenmedi.
                  </p>
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-black/5">
              <h2 className="text-lg font-semibold text-charcoal">Kategoriler</h2>

              <form onSubmit={handleAddCategory} className="mt-5 flex gap-2">
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="Yeni kategori adı"
                  className="min-w-0 flex-1 rounded-lg border border-black/10 px-4 py-2.5 text-sm focus:border-emerald focus:outline-none focus:ring-2 focus:ring-emerald/20"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-navy px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-light"
                >
                  Ekle
                </button>
              </form>

              <div className="mt-6 space-y-2">
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    className="flex items-center justify-between rounded-lg bg-cream-dark px-4 py-3"
                  >
                    <span className="text-sm font-medium text-charcoal">
                      {cat.name}
                    </span>
                    <button
                      onClick={() => handleDeleteCategory(cat)}
                      className="text-xs font-medium text-red-600 hover:text-red-700"
                    >
                      Sil
                    </button>
                  </div>
                ))}
                {categories.length === 0 && (
                  <p className="py-4 text-center text-sm text-gray-400">
                    Henüz kategori eklenmedi.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
