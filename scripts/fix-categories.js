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

const PECETELIK_CODES = [
  "20-18-325-70", "20-18-326-70", "20-18-326-86", "20-18-327-70",
  "20-18-328-70", "20-18-328-86", "20-18-329-70", "20-18-329-86",
  "20-18-330-70", "20-18-331-70", "20-18-331-86", "20-18-332-70",
  "20-18-332-86", "20-18-333-70", "20-18-334-70", "20-18-335-70",
  "20-18-336-70", "20-18-337-70",
];

const fixes = [
  ...PECETELIK_CODES.map((code) => ({ code, category: "Mutfak Ekipmanları" })),
  { code: "25-01-013-40", category: "Mutfak Ekipmanları" },
  { code: "25-01-013-70", category: "Mutfak Ekipmanları" },
  { code: "50-33-811-70", category: "Banyo Aksesuarları" },
];

async function run() {
  console.log(`${fixes.length} ürünün kategorisi düzeltiliyor...`);
  const batch = db.batch();
  for (const { code, category } of fixes) {
    batch.update(db.collection("products").doc(code), { category });
  }
  await batch.commit();
  console.log("Tamamlandı.");
}

run().catch((err) => {
  console.error("Hata:", err);
  process.exit(1);
});
