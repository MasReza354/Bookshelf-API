import { nanoid } from 'nanoid';
//File
import books from '../models/book.js';

function addBook(bookData) {
  if (!bookData.name) {
    throw new Error('Gagal menambahkan buku. Mohon isi nama buku');
  }
  if (bookData.readPage > bookData.pageCount) {
    throw new Error(
      'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
    );
  }

  const newBook = {
    id: nanoid(),
    ...bookData,
    finished: bookData.pageCount === bookData.readPage,
    insertedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // Tambah buku ke array.
  books.push(newBook);
  return newBook.id; // Kembalikan ID bukunya saja
}

function getAllBooks({ reading, finished, name } = {}) {
  let filteredBooks = books;

  // Mengkonversi parameter query ke tipe yang diharapkan(boolean).
  const isReading = reading === '1';
  const isFinished = finished === '1';

  if (reading !== undefined) {
    filteredBooks = filteredBooks.filter((book) => book.reading === isReading);
  }

  if (finished !== undefined) {
    filteredBooks = filteredBooks.filter(
      (book) => book.finished === isFinished
    );
  }

  if (name) {
    filteredBooks = filteredBooks.filter((book) =>
      book.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  // Mengkonversikan setiap buku ke format yang diharapkan.
  return filteredBooks.map(({ id, name, publisher }) => ({
    id,
    name,
    publisher,
  }));
}

function getBookById(bookId) {
  // Untuk mendapatkan buku berdasarkan ID nya dari Array books.
  return books.find((b) => b.id === bookId);
}

function updateBook(bookId, updateData) {
  const bookIndex = books.findIndex((b) => b.id === bookId); // Mencari indeks buku dengan ID yang diberikan dan memperbarui dengan data baru.
  if (bookIndex === -1) {
    throw new Error('Gagal memperbarui buku. Id tidak ditemukan'); // Jika buku dengan ID tidak ditemukan, fungsi akan melempar error.
  }
  const updatedBook = {
    ...books[bookIndex],
    ...updateData,
    updatedAt: new Date().toISOString(),
    // Memastikan hitung hingga finished/selesai berdasarkan pageCount dan readPage yang terbaru.
    finished: updateData.readPage === updateData.pageCount,
  };
  books[bookIndex] = updatedBook;
  return updatedBook;
}

function deleteBook(bookId) {
  const bookIndex = books.findIndex((b) => b.id === bookId); // Fungsi untuk menghapus buku berdasarkan ID yang diberikan.
  if (bookIndex === -1) {
    throw new Error('Buku gagal dihapus. Id tidak ditemukan'); // Memastikan pesan ini sesuai dengan yang diharapkan oleh penguji.
  }
  books.splice(bookIndex, 1); // Menghapus buku dari array.
}

export { addBook, getAllBooks, getBookById, updateBook, deleteBook };
