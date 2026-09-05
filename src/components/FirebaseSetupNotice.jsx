export default function FirebaseSetupNotice() {
  return (
    <div className="bg-amber-50 px-6 py-3 text-center text-sm text-amber-800">
      Firebase yapılandırması eksik. Kategori ve ürünlerin görünmesi için{" "}
      <code className="rounded bg-amber-100 px-1.5 py-0.5">src/firebase/config.js</code>{" "}
      dosyasındaki alanları doldurun.
    </div>
  );
}
