export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, description } = req.body;
        if (!name || !description) {
            return res.status(400).json({ message: 'Nama dan deskripsi harus diisi' });
        }
        res.status(201).json({ message: 'Item berhasil dibuat', item: { name, description } });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}