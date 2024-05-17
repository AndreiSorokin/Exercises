import React, { useEffect } from 'react';
import { useSubscription } from '@apollo/client';
import { BOOK_ADDED } from '../queries';

const BookAddedAlert = () => {
  const { data, loading } = useSubscription(BOOK_ADDED);

  useEffect(() => {
    if (!loading && data) {
      const book = data.bookAdded;
      window.alert(`New book added: ${book.title} by ${book.author.name}`);
    }
  }, [data, loading]);

  return null;
};

export default BookAddedAlert;