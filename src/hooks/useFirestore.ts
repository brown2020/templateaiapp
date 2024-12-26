"use client";

import { useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  WhereFilterOp,
  DocumentData,
  CollectionReference,
} from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";

interface QueryConfig {
  field: string;
  operator: WhereFilterOp;
  value: unknown;
}

export const useFirestore = <T extends DocumentData>(
  collectionName: string
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getDocument = async (docId: string): Promise<T | null> => {
    try {
      setLoading(true);
      setError(null);
      const docRef = doc(db, collectionName, docId);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? (docSnap.data() as T) : null;
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getDocuments = async (queryConfig?: QueryConfig): Promise<T[]> => {
    try {
      setLoading(true);
      setError(null);

      const collectionRef = collection(
        db,
        collectionName
      ) as CollectionReference<T>;
      const queryRef = queryConfig
        ? query(
            collectionRef,
            where(queryConfig.field, queryConfig.operator, queryConfig.value)
          )
        : collectionRef;

      const querySnapshot = await getDocs(queryRef);
      return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const addDocument = async (docId: string, data: T) => {
    try {
      setLoading(true);
      setError(null);
      const docRef = doc(
        collection(db, collectionName) as CollectionReference<T>,
        docId
      );
      await setDoc(docRef, data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateDocument = async (docId: string, data: Partial<T>) => {
    try {
      setLoading(true);
      setError(null);
      const docRef = doc(
        collection(db, collectionName) as CollectionReference<T>,
        docId
      );
      await updateDoc(docRef, data as DocumentData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteDocument = async (docId: string) => {
    try {
      setLoading(true);
      setError(null);
      const docRef = doc(
        collection(db, collectionName) as CollectionReference<T>,
        docId
      );
      await deleteDoc(docRef);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    getDocument,
    getDocuments,
    addDocument,
    updateDocument,
    deleteDocument,
  };
};
