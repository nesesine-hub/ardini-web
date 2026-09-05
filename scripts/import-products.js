import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const __dirname = dirname(fileURLToPath(import.meta.url));

const serviceAccount = JSON.parse(
  readFileSync(join(__dirname, "..", "serviceAccountKey.json"), "utf-8")
);

initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

const products = JSON.parse(
  readFileSync(join(__dirname, "products-import.json"), "utf-8")
);

async function run() {
  const categoryNames = [...new Set(products.map((p) => p.category))];

  console.log(`Kategoriler yazılıyor (${categoryNames.length})...`);
  for (const name of categoryNames) {
    await db.collection("categories").doc(name).set({ name }, { merge: true });
  }

  console.log(`Ürünler yazılıyor (${products.length})...`);
  let batch = db.batch();
  let count = 0;

  for (const product of products) {
    const ref = db.collection("products").doc(product.urunKodu);
    batch.set(ref, {
      name: product.name,
      description: product.description,
      imageUrl: product.imageUrl,
      redirectUrl: product.redirectUrl,
      category: product.category,
    });
    count++;

    if (count % 400 === 0) {
      await batch.commit();
      batch = db.batch();
      console.log(`  ${count}/${products.length} yazıldı...`);
    }
  }
  await batch.commit();

  console.log(`Tamamlandı: ${products.length} ürün, ${categoryNames.length} kategori.`);
}

run().catch((err) => {
  console.error("İçe aktarma hatası:", err);
  process.exit(1);
});
