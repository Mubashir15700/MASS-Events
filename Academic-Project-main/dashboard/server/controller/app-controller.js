
export const bookEvent = async (req, res) => {
    try {
        const datas = await req.body;
        console.log(datas);
        res.status(201).send({ "status": "success", "message": "Booked Event" });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}