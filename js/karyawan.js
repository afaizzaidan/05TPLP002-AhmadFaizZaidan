// Fungsi untuk menampilkan modal edit dengan data karyawan yang dipilih
function editKaryawan(index) {
    const row = document.querySelectorAll("tbody tr")[index];
    document.getElementById("editIndex").value = index;
    document.getElementById("editKode").value = row.cells[1].innerText;
    document.getElementById("editNama").value = row.cells[2].innerText;
    document.getElementById("editEmail").value = row.cells[3].innerText;
    document.getElementById("editAlamat").value = row.cells[4].innerText;
    document.getElementById("editJabatan").value = row.cells[5].innerText;

    // Tampilkan modal
    $('#editKaryawanModal').modal('show');
}

// Fungsi untuk menyimpan data hasil edit
function saveEdit() {
    const index = document.getElementById("editIndex").value;
    const row = document.querySelectorAll("tbody tr")[index];
    
    row.cells[1].innerText = document.getElementById("editKode").value;
    row.cells[2].innerText = document.getElementById("editNama").value;
    row.cells[3].innerText = document.getElementById("editEmail").value;
    row.cells[4].innerText = document.getElementById("editAlamat").value;
    row.cells[5].innerText = document.getElementById("editJabatan").value;

    // Tutup modal setelah menyimpan perubahan
    $('#editKaryawanModal').modal('hide');
}

// Tambahkan event listener untuk tabel agar kita bisa menangani klik di semua tombol hapus
document.querySelector("tbody").addEventListener("click", function(event) {
    if (event.target.classList.contains("delete")) {
        hapusKaryawan(event.target);
    }
});

// Fungsi untuk menambah data karyawan
function tambahKaryawan() {
    const kode = document.getElementById("tambahKode").value;
    const nama = document.getElementById("tambahNama").value;
    const email = document.getElementById("tambahEmail").value;
    const alamat = document.getElementById("tambahAlamat").value;
    const jabatan = document.getElementById("tambahJabatan").value;

    const tbody = document.querySelector("tbody");
    const newRow = document.createElement("tr");
    
    const index = tbody.rows.length + 1;

    newRow.innerHTML = `
        <td>${index}</td>
        <td>${kode}</td>
        <td>${nama}</td>
        <td>${email}</td>
        <td>${alamat}</td>
        <td>${jabatan}</td>
        <td class="action-icons">
            <button class="btn btn-info btn-sm edit" onclick="editKaryawan(${index - 1})"><i class="fas fa-edit"></i></button>
            <button class="btn btn-danger btn-sm delete" onclick="hapusKaryawan(${index - 1})"><i class="fas fa-times"></i></button>
        </td>
    `;

    tbody.appendChild(newRow);

    // Reset form dan tutup modal
    document.getElementById("tambahKaryawanForm").reset();
    $('#tambahKaryawanModal').modal('hide');
}

// Fungsi untuk menghapus data karyawan
function hapusKaryawan(index) {
    
    const tbody = document.querySelector("tbody");
    tbody.deleteRow(index);

    // Update nomor urut setelah menghapus
    for (let i = index; i < tbody.rows.length; i++) {
        tbody.rows[i].cells[0].innerText = i + 1;
        tbody.rows[i].querySelector(".edit").setAttribute("onclick", `editKaryawan(${i})`);
        tbody.rows[i].querySelector(".delete").setAttribute("onclick", `hapusKaryawan(${i})`);
    }
}

// Event listener untuk tombol tambah karyawan
document.querySelector(".btn-add").addEventListener("click", () => {
    $('#tambahKaryawanModal').modal('show');
});


window.hapusKaryawan = function (index) {
    if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
        dataKaryawan.splice(index, 1);
        renderTable();
    }
};

// Event listener untuk tombol tambah karyawan
document.querySelector(".btn-add").addEventListener("click", () => {
    $('#tambahKaryawanModal').modal('show');
});

// Tambahkan event listener ke tombol edit
document.addEventListener("DOMContentLoaded", () => {
    const editButtons = document.querySelectorAll(".edit");
    editButtons.forEach((button, index) => {
        button.addEventListener("click", () => editKaryawan(index));
    });
});
