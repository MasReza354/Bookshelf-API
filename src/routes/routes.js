import {
  addBookHandler, //Menambahkan Buku
  getAllBooksHandler, // Mengambil Semua Buku yang ada
  getBookByIdHandler, // Mengambil Buku berdasarkan ID
  updateBookHandler, // Edit/Update Buku secara detail berdasarkan ID
  deleteBookHandler, // Menghapus Buku berdasarkan ID
} from '../controllers/handler.js'; // Make sure to use the .js extension

export const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBookByIdHandler,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: updateBookHandler,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBookHandler,
  },
  {
    method: 'GET',
    path: '/',
    handler: getAllBooksHandler,
  },
];
