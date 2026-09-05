import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./config";

const productsCol = isFirebaseConfigured ? collection(db, "products") : null;
const categoriesCol = isFirebaseConfigured ? collection(db, "categories") : null;

export function subscribeToProducts(callback) {
  if (!isFirebaseConfigured) {
    callback([]);
    return () => {};
  }
  const q = query(productsCol, orderBy("name"));
  return onSnapshot(q, (snapshot) => {
    const products = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));
    callback(products);
  });
}

export function subscribeToCategories(callback) {
  if (!isFirebaseConfigured) {
    callback([]);
    return () => {};
  }
  const q = query(categoriesCol, orderBy("name"));
  return onSnapshot(q, (snapshot) => {
    const categories = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));
    callback(categories);
  });
}

export async function createProduct(product) {
  return addDoc(productsCol, product);
}

export async function updateProduct(id, product) {
  const productRef = doc(db, "products", id);
  return updateDoc(productRef, product);
}

export async function deleteProduct(id) {
  const productRef = doc(db, "products", id);
  return deleteDoc(productRef);
}

export async function createCategory(name) {
  return addDoc(categoriesCol, { name });
}

export async function deleteCategory(id) {
  const categoryRef = doc(db, "categories", id);
  return deleteDoc(categoryRef);
}
