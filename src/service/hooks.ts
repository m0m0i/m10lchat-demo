import { DocumentData, Query, onSnapshot } from "firebase/firestore";
import isEqual from "lodash/isEqual";
import { useEffect, useRef, useState } from "react";

export const useFirestoreQuery = (query: Query) => {
  const [docs, setDocs] = useState<DocumentData[]>([]);

  // Store current query in ref
  const queryRef = useRef(query);

  // Comapre current query with the previous one
  useEffect(() => {
    // Use Firestore built-in 'isEqual' method to compare queries
    if (!isEqual(queryRef.current, query)) {
      queryRef.current = query;
    }
  });

  // Re-run data listener only if query has changed
  useEffect(() => {
    if (!queryRef.current) {
      return undefined;
    }

    const unsubscribe = onSnapshot(queryRef.current, (querySnapshot) => {
      const data: DocumentData[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setDocs(data);
    });

    return unsubscribe;
  }, [queryRef]);

  return docs;
};
