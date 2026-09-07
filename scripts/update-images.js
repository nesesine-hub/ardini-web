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
  readFileSync(join(__dirname, "products-full.json"), "utf-8")
);

async function run() {
  console.log(`Görsel dizileri güncelleniyor (${products.length})...`);
  let batch = db.batch();
  let count = 0;

  for (const product of products) {
    const ref = db.collection("products").doc(product.urunKodu);
    batch.set(ref, { images: product.images }, { merge: true });
    count++;

    if (count % 400 === 0) {
      await batch.commit();
      batch = db.batch();
      console.log(`  ${count}/${products.length} güncellendi...`);
    }
  }
  await batch.commit();

  console.log(`Tamamlandı: ${products.length} ürünün görsel dizisi güncellendi.`);
}

run().catch((err) => {
  console.error("Güncelleme hatası:", err);
  process.exit(1);
});
