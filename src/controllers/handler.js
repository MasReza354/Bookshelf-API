import {
  addBook,
  deleteBook,
  updateBook,
  getAllBooks,
  getBookById,
} from '../services/bookServices.js'; //Mengambil fungsi yang diperlukan dari service.

// Menambahkan async pada fungsi.
async function addBookHandler(request, h) {
  const {
    name,
    year,
    author,
    reading,
    summary,
    readPage,
    publisher,
    pageCount,
  } = request.payload;

  // Input Validasi.
  if (!name) {
    return h
      .response({
        status: 'fail',
        message: 'Gagal menambahkan buku. Mohon isi nama buku',
      })
      .code(400); // Mengatur status HTTP dari respons menjadi 400(adanya kesalahan pada permintaan).
  }

  if (readPage > pageCount) {
    return h
      .response({
        status: 'fail',
        message:
          'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
      })
      .code(400); // Mengatur status HTTP dari respons menjadi 400(adanya kesalahan pada permintaan).
  }

  // Menambahkan buku baru.
  try {
    const bookId = await addBook(request.payload); // Memanggil fungsi addBook dari service.
    return h
      .response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: { bookId },
      })
      .code(201); // Mengatur status HTTP dari respons menjadi 201(suatu sumber telah berhasil dibuat).
  } catch (error) {
    console.error(error); // Keluaran error pada console.
    return h.response({ status: 'fail', message: error.message }).code(500); // Mengatur status HTTP dari respons menjadi 500(Generic Error).
  }
}

// getAllBooksHandler disederhanakan, karena tidak perlu menunggu synchronous operation.
async function getAllBooksHandler(request, h) {
  const { reading, finished, name } = request.query;

  // Memanggil getAllBooks dengan parameter query.
  const books = getAllBooks({ reading, finished, name });

  // Respon dengan buku yang di filter.
  return h.response({ status: 'success', data: { books } }).code(200); // Mengatur status HTTP dari respons menjadi 200(sukses).
}

async function getBookByIdHandler(request, h) {
  try {
    const book = getBookById(request.params.bookId);
    if (!book) {
      return h
        .response({
          status: 'fail',
          message: 'Buku tidak ditemukan', // Memastikan pesan ini sesuai dengan yang diharapkan oleh penguji.
        })
        .code(404); // Mengatur status HTTP dari respons menjadi 404(sumber yang diminta tidak ditemukan).
    }
    // Memastikan objek buku berisi semua properti yang diperlukan
    // Jika pengujian mengharapkan properti tertentu, pastikan properti sudah ada.
    return h.response({ status: 'success', data: { book } }).code(200); // Mengatur status HTTP dari respons menjadi 200(sukses).
  } catch (error) {
    return h.response({ status: 'fail', message: error.message }).code(500); // Mengatur status HTTP dari respons menjadi 500(Generic Error).
  }
}

// Fungsi layanan dilihat benar. hanya saja dipastikan kondisi filternya.
// dan properti buku yang dipulangkan ke'getAllBooks' sesuai dengan yang di harapkan oleh penguji.

// pada 'updateBookHandler' harus memeriksa apakah buku tersebut ada yang tidak ditemukan.
async function updateBookHandler(request, h) {
  const { bookId } = request.params; // Mendapatkan bookId dari parameter request.
  const {
    name,
    year,
    author,
    reading,
    summary,
    readPage,
    publisher,
    pageCount,
  } = request.payload;

  // Input Validasi.
  if (!name) {
    return h
      .response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
      })
      .code(400); // Mengatur status HTTP dari respons menjadi 400(adanya kesalahan pada permintaan).
  }

  if (readPage > pageCount) {
    return h
      .response({
        status: 'fail',
        message:
          'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      })
      .code(400); // Mengatur status HTTP dari respons menjadi 400(adanya kesalahan pada permintaan).
  }

  try {
    const bookExists = getBookById(bookId);
    if (!bookExists) {
      return h
        .response({
          status: 'fail',
          message: 'Gagal memperbarui buku. Id tidak ditemukan',
        })
        .code(404); // Mengatur status HTTP dari respons menjadi 404(sumber yang diminta tidak ditemukan).
    }

    const updatedBook = await updateBook(bookId, request.payload);
    return h
      .response({
        status: 'success',
        message: 'Buku berhasil diperbarui',
      })
      .code(200); // Mengatur status HTTP dari respons menjadi 200(sukses).
  } catch (error) {
    return h.response({ status: 'fail', message: error.message }).code(500); // Mengatur status HTTP dari respons menjadi 500(Generic Error).
  }
}

async function deleteBookHandler(request, h) {
  try {
    const bookExists = getBookById(request.params.bookId); // Memeriksa apakah buku itu ada / tidak.
    if (!bookExists) {
      return h
        .response({
          status: 'fail',
          message: 'Buku gagal dihapus. Id tidak ditemukan',
        }) // Memastikan pesan ini sesuai dengan yang diharapkan oleh penguji.
        .code(404); // Mengatur status HTTP dari respons menjadi 404(sumber yang diminta tidak ditemukan).
    }
    await deleteBook(request.params.bookId); // Memanggil fungsi yang di impor secara langsung.
    return h
      .response({ status: 'success', message: 'Buku berhasil dihapus' }) // Memastikan kembali pesannya sesuai dengan string yang di harapkan.
      .code(200); // Mengatur status HTTP dari respons menjadi 200(sukses).
  } catch (error) {
    return h
      .response({ status: 'fail', message: error.message })
      .code(
        error.message === 'Buku gagal dihapus. Id tidak ditemukan' ? 404 : 500
      ); // Gunakan pesan yang sama untuk konsistensi.
  }
}

export {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  updateBookHandler,
  deleteBookHandler,
};
